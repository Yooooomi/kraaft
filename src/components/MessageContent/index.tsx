import React, { useMemo } from 'react';
import cl from 'classnames';
import { store } from '../../assets/store';
import s from './index.module.css';
import RoundContent from '../RoundContent';

interface MessageContentProps {
  content: string;
  mine: boolean;
  className?: string;
  rounded?: {
    topleft?: boolean;
    topright?: boolean;
    bottomleft?: boolean;
    bottomright?: boolean;
  };
}

function indexesOf(str: string, search: string) {
  let index = 0;
  const result = [];
  while (index !== -1) {
    index = str.indexOf(search, index);
    if (index !== -1) {
      result.push(index);
      index += 1;
    }
  }
  return result;
}

function formatContent(content: string) {
  const ats = indexesOf(content, '@');
  const sortedUsers = store.users.sort(
    (a, b) => b.username.length - a.username.length,
  );
  const finalString: React.ReactNode[] = [];
  let lastIndex = 0;
  ats.forEach((at) => {
    // Find the first user that matches the string directly after the @
    const user = sortedUsers.find((us) =>
      content.slice(at + 1).startsWith(us.username),
    );
    if (!user) return;
    finalString.push(content.slice(lastIndex, at));
    finalString.push(<span className={s.tag}>@{user.username}</span>);
    lastIndex = at + user.username.length + 1;
  });
  finalString.push(content.slice(lastIndex));
  return finalString;
}

function MessageContent({
  content,
  mine,
  className,
  rounded,
}: MessageContentProps) {
  const renderedContent = useMemo(() => formatContent(content), [content]);

  return (
    <RoundContent
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rounded}
      className={cl(s.root, mine ? s.mine : s.notmine, className)}>
      {renderedContent}
    </RoundContent>
  );
}

export default MessageContent;
