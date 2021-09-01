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

const FormatMessage = (text: string) => {
  let usersTagged = store.users
    .map((us) => {
      const occurences = [];
      let index = 0;
      while (index !== -1) {
        index = text.indexOf(us.username, index);
        if (index !== -1) {
          occurences.push(index);
          index += 1;
        }
      }
      return { user: us, occurences };
    })
    .filter((e) => e.occurences.length > 0);
  usersTagged = usersTagged
    .filter((user) => {
      // eslint-disable-next-line no-param-reassign
      user.occurences = user.occurences.filter(
        (oc) => oc !== 0 && text[oc - 1] === '@',
      );
      return user.occurences.length > 0;
    })
    .flat();
  const allTags = usersTagged
    .map((user) => {
      return user.occurences.map((oc) => ({ occurence: oc, user: user.user }));
    })
    .flat()
    .sort((a, b) => a.occurence - b.occurence);
  let lastIndex = 0;
  const elements = [];
  allTags.forEach((tag) => {
    const element = text.slice(lastIndex, tag.occurence - 1);
    elements.push(element);
    elements.push(<span className={s.tag}>@{tag.user.username}</span>);
    lastIndex = tag.occurence + tag.user.username.length;
  });
  elements.push(text.slice(lastIndex, text.length));
  return elements;
};

function MessageContent({
  content,
  mine,
  className,
  rounded,
}: MessageContentProps) {
  const renderedContent = useMemo(() => FormatMessage(content), [content]);

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
