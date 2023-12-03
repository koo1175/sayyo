import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(false);  // 채팅창 상태 추가. 채팅창 보이게 안보이게 ㅎㅎ

  return (
    <ChatContext.Provider value={{ messages, setMessages, isChatVisible, setIsChatVisible }}>
      {children}
    </ChatContext.Provider>
  );
};