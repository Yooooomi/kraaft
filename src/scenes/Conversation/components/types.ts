import { Message } from '../../../assets/types';

export interface MessageTypeRendererProps<T extends Message> {
  mine: boolean;
  message: T;
  top?: boolean;
  bot?: boolean;
}
