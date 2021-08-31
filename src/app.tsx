import { useMemo, useState } from 'react';
import './app.css';

import { store } from './assets/store';
import Layout from './components/Layout';

import Conversation from './scenes/Conversation';

const App = () => {
  const { messages: storeMessages } = store;
  const [messages, setMessages] = useState(storeMessages);

  const sorted = useMemo(
    () => messages.sort((a, b) => a.createdAt - b.createdAt),
    [messages],
  );

  return (
    <Layout>
      <Conversation messages={sorted} onChange={setMessages} />
    </Layout>
  );
};

export default App;
