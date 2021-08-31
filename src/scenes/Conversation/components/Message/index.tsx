import React, { useMemo, useState } from 'react';
import cl from 'classnames';
import { store } from '../../../../assets/store';
import { ImageMessage, Message as MessageT, MessageFromTypeString, MessageType, TextMessage } from '../../../../assets/types';
import { dateToMessageTime } from '../../../../services/date';
import s from './index.module.css';

const FormatMessage = (text: string) => {
  let usersTagged = store.users
    .map(us => {
      const occurences = [];
      let index = 0;
      while (index !== -1) {
        index = text.indexOf(us.username, index);
        console.log(index);
        if (index !== -1) {
          occurences.push(index);
          index += 1;
        }
      }
      return { user: us, occurences };
    })
    .filter(e => e.occurences.length > 0);
  usersTagged = usersTagged
    .filter(user => {
      user.occurences = user.occurences.filter(oc => oc !== 0 && text[oc - 1] === '@');
      return user.occurences.length > 0;
    })
    .flat();
  const allTags = usersTagged.map(user => {
    return user.occurences.map(oc => ({ occurence: oc, user: user.user }));
  })
    .flat()
    .sort((a, b) => a.occurence - b.occurence);
  let lastIndex = 0;
  const elements = [];
  allTags.map(tag => {
    const element = text.slice(lastIndex, tag.occurence - 1);
    elements.push(element);
    elements.push(<span className={s.tag}>@{tag.user.username}</span>);
    lastIndex = tag.occurence + tag.user.username.length;
  });
  elements.push(text.slice(lastIndex, text.length));
  return elements;
};

interface MessageDisplayProps<T extends MessageT> {
  mine: boolean;
  message: T;
}

const MessageText: React.FunctionComponent<MessageDisplayProps<TextMessage>> = ({ mine, message: { createdAt, content } }) => {
  return <div className={cl(s.text, mine ? s.textmine : s.textnotmine)}>{FormatMessage(content)}</div>;
}

const MessageImage: React.FunctionComponent<MessageDisplayProps<ImageMessage>> = ({ mine, message: { createdAt, caption, url } }) => {
  return (
    <div className={s.image}>
      <img src={url} alt="message" />
      <span className={mine ? s.textmine : s.textnotmine}>
        {FormatMessage(caption)}
      </span>
    </div>
  );
}

type TypeToComponentDict = {
  [key in MessageType]: React.FunctionComponent<MessageDisplayProps<MessageFromTypeString<key>>>
}

const TypeToComponent: TypeToComponentDict = {
  text: MessageText,
  image: MessageImage,
}

interface MessageProps<T extends MessageT> {
  standalone: boolean;
  message: T;
  mine: boolean;
  top: boolean;
  bot: boolean;
}

function Message<T extends MessageT>({ standalone, message, top, bot, mine }: MessageProps<T>) {
  // Did not succeed to remove the cast here
  // The type of the Class variable should be determined by the props.type variable
  // Then the message prop is always the same type as the prop required by the Class component
  const Class = TypeToComponent[message.type] as React.FunctionComponent<MessageDisplayProps<MessageT>>;

  const [open, setOpen] = useState(false);

  return (
    <button type="button" onClick={ev => setOpen(!open)} className={s.root}>
      <div className={cl(s.name, (top || open) && s.open)}>
        {/* Would be better here to access the user through a hashmap, but the store is fake anyways */}
        {store.users.find(e => e.id === message.senderId)?.username}
      </div>
      <div className={cl(s.class, mine ? s.mine : s.notmine, top && s.top, bot && s.bot)}>
        <Class message={message} mine={mine} />
      </div>
      <div className={cl(s.date, (standalone || open) && s.open)}>
        {dateToMessageTime(new Date(message.createdAt))}
      </div>
    </button>
  );
}

export default Message;
