import { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from './firebase';

export default function App() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [topic, setTopic] = useState('Daily Life');

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages, topic }),
    });
    const data = await res.json();
    
    const updatedMessages = [...newMessages, { role: 'assistant', content: data.message }];
    setMessages(updatedMessages);

    if (auth.currentUser) {
        await addDoc(collection(db, `users/${auth.currentUser.uid}/chats`), {
            messages: updatedMessages,
            topic,
            timestamp: serverTimestamp()
        });
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bulgarian Tutor</h1>
      <div className="space-y-4 mb-4 h-96 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className="bg-slate-100 p-2 rounded">{m.content}</span>
          </div>
        ))}
      </div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full border p-2 mb-2"
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 w-full">Send</button>
    </div>
  );
}
