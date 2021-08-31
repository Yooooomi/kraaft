import { useState } from 'react';
import './app.css';

import { store } from './assets/store';
import { TextMessage } from './assets/types';
import Layout from './components/Layout';

import Conversation from './scenes/Conversation';

const App = () => {
  const { messages: storeMessages, users, currentUserId } = store;
  const [messages, setMessages] = useState(storeMessages);

  return (
    <Layout>
      <Conversation messages={messages} onChange={setMessages} />
    </Layout>
  );
};

export default App;
