export interface User {
  id: string;
  username: string;
}

export type MessageType = 'text' | 'image';

interface BaseMessage {
  id: string;
  senderId: string;
  createdAt: number;
  type: MessageType;
}

export type MessageFromTypeString<T extends MessageType> = T extends 'text'
  ? TextMessage
  : T extends 'image'
  ? ImageMessage
  : TextMessage;

export interface TextMessage extends BaseMessage {
  type: 'text';
  content: string;
}

export interface ImageMessage extends BaseMessage {
  type: 'image';
  url: string;
  caption: string;
}

export type Message = TextMessage | ImageMessage;

export type Nullable<T> = T | null;
