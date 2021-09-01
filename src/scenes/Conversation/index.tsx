import React, { useCallback, useEffect, useState } from 'react';
import cl from 'classnames';
import { store } from '../../assets/store';
import { Message as MessageType, Nullable } from '../../assets/types';
import Message from './components/MessageRenderer';
import s from './index.module.css';

interface ConversationProps {
  messages: MessageType[];
  onChange: (msg: MessageType[]) => void;
}

// Time after which a message is considered as a new conversation after the last one
const NEW_CONVERSATION_THRESHOLD_MS = 120 * 1000;

function Conversation({ messages, onChange }: ConversationProps) {
  const [textInput, setTextInput] = useState('');
  const [fileInput, setFileInput] = useState<Nullable<File>>(null);

  const sendMessage = useCallback(
    async (ev) => {
      ev.preventDefault();
      if (textInput.trim().length === 0) return;

      let newMessage: MessageType;
      const createdAt = new Date().getTime();
      const id = `message-${messages.length}`;
      if (fileInput != null) {
        const buf = Buffer.from(await fileInput.arrayBuffer());
        newMessage = {
          type: 'image',
          caption: textInput,
          createdAt,
          id,
          senderId: store.currentUserId,
          url: `data:image/jpeg;base64,${buf.toString('base64')}`,
        };
      } else {
        newMessage = {
          type: 'text',
          content: textInput,
          createdAt,
          id,
          senderId: store.currentUserId,
        };
      }
      setTextInput('');
      setFileInput(null);
      onChange([...messages, newMessage]);
    },
    [messages, onChange, textInput, fileInput],
  );

  // const scrollbot = useCallback(() => {
  //   window.scrollTo(0, window.document.body.scrollHeight);
  // }, []);

  // useEffect(() => {
  //   const unlisten = window.addEventListener('load', scrollbot);
  //   scrollbot();
  //   return unlisten;
  // }, [messages, scrollbot]);

  return (
    <div className={s.root}>
      <div className={s.messages}>
        {messages.map((msg, k, a) => {
          const top = k === 0 || a[k - 1].senderId !== msg.senderId;
          const bot = k === a.length - 1 || a[k + 1].senderId !== msg.senderId;

          const standalone =
            k === 0 ||
            k === a.length - 1 ||
            a[k + 1].createdAt - msg.createdAt > NEW_CONVERSATION_THRESHOLD_MS;
          const mine = store.currentUserId === msg.senderId;

          return (
            <div
              key={msg.id}
              className={cl(
                s.message,
                mine && s.mine,
                bot && s.bot,
                standalone && s.standalone,
              )}>
              <Message
                message={msg}
                showName={top}
                showDate={standalone}
                mine={mine}
                top={top}
                bot={bot}
              />
            </div>
          );
        })}
      </div>
      <form className={s.typing} onSubmit={sendMessage}>
        <input
          value={textInput}
          onChange={(ev) => setTextInput(ev.currentTarget.value)}
          placeholder="Write a message..."
        />
        <label htmlFor="upload">
          <span className={s.file}>File</span>
          <input
            style={{ display: 'none' }}
            id="upload"
            type="file"
            onChange={(e) => setFileInput(e?.currentTarget?.files?.[0] || null)}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Conversation;
