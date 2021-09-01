import React from 'react';
import cl from 'classnames';
import { TextMessage } from '../../../../assets/types';
import MessageContent from '../../../../components/MessageContent';
import { MessageTypeRendererProps } from '../types';
import s from './index.module.css';

function TextMessageRenderer({
  message: { content },
  mine,
  top,
  bot,
}: MessageTypeRendererProps<TextMessage>) {
  return (
    <div className={cl(s.root)}>
      <MessageContent
        content={content}
        mine={mine}
        rounded={{
          topleft: mine || (!mine && top),
          topright: (mine && top) || !mine,
          bottomleft: mine || (!mine && bot),
          bottomright: (mine && bot) || !mine,
        }}
      />
    </div>
  );
}

export default TextMessageRenderer;
