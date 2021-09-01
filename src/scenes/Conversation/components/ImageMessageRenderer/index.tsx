import React from 'react';
import { ImageMessage } from '../../../../assets/types';
import MessageContent from '../../../../components/MessageContent';
import RoundContent from '../../../../components/RoundContent';
import { MessageTypeRendererProps } from '../types';
import s from './index.module.css';

function ImageMessageRenderer({
  message: { caption, url },
  mine,
  top,
}: MessageTypeRendererProps<ImageMessage>) {
  return (
    <div className={s.root}>
      <RoundContent
        topleft={mine || (!mine && top)}
        topright={(mine && top) || !mine}>
        <img className={s.image} src={url} alt="message" />
      </RoundContent>
      <MessageContent
        content={caption}
        mine={mine}
        className={s.text}
        rounded={{ bottomleft: true, bottomright: true }}
      />
    </div>
  );
}

export default ImageMessageRenderer;
