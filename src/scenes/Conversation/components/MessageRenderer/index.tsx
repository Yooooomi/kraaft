import React, { useState } from 'react';
import cl from 'classnames';
import { store } from '../../../../assets/store';
import { dateToMessageTime } from '../../../../assets/date';
import s from './index.module.css';
import { Message } from '../../../../assets/types';
import TextMessageRenderer from '../TextMessageRenderer';
import ImageMessageRenderer from '../ImageMessageRenderer';

function GetMessageComponent(
  message: Message,
  mine: boolean,
  top: boolean,
  bot: boolean,
) {
  if (message.type === 'text')
    return (
      <TextMessageRenderer message={message} mine={mine} top={top} bot={bot} />
    );
  if (message.type === 'image')
    return (
      <ImageMessageRenderer message={message} mine={mine} top={top} bot={bot} />
    );
}

interface MessageRendererProps {
  showDate: boolean;
  showName: boolean;
  message: Message;
  mine: boolean;
  top: boolean;
  bot: boolean;
}

function MessageRenderer({
  showDate,
  showName,
  message,
  top,
  bot,
  mine,
}: MessageRendererProps) {
  // Did not succeed to remove the cast here
  // The type of the Class variable should be determined by the props.type variable
  // Then the message prop is always the same type as the prop required by the Class component
  const [open, setOpen] = useState(false);

  return (
    <button type="button" onClick={() => setOpen(!open)} className={s.root}>
      <div className={cl(s.name, (showName || open) && s.open)}>
        {/* Would be better here to access the user through a hashmap, but the store is fake anyways */}
        {store.users.find((e) => e.id === message.senderId)?.username}
      </div>
      <div>{GetMessageComponent(message, mine, top, bot)}</div>
      <div className={cl(s.date, (showDate || open) && s.open)}>
        {dateToMessageTime(new Date(message.createdAt))}
      </div>
    </button>
  );
}

export default MessageRenderer;
