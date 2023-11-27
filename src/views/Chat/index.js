import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './Chat.css';
import paperPlaneIcon from '../../../src/img/btn_send_before.png'; // 기본 이미지 경로
import paperPlaneHoverIcon from '../../../src/img/btn_send_after.png';
export default  function Chat() {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [imgSrc, setImgSrc] = useState(paperPlaneIcon);

    const chatBoxRef = useRef(null);
    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // 스크롤바를 맨 아래로 내림
        }
    };

    useEffect(scrollToBottom, [messages]);
    useEffect(() => {
        const socket = new SockJS('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/ws');
        const client = new Client({
            webSocketFactory: () => socket,
        });

        client.onConnect = function (frame) {
            client.subscribe('/topic/public', function (chatMessage) {
                console.log(JSON.parse(chatMessage.body).content);
                const newMessage = JSON.parse(chatMessage.body).content;

                setMessages(prevMessages => [...prevMessages, newMessage]);

            });
        };
        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, []);

    // Send a message
    const sendMessage = () => {
        // Send a message if the WebSocket connection is active
        if (stompClient?.connected) {
            stompClient.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify({ content: inputValue })
            });
            setInputValue('');
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
    <div className="chat-container">
        <div className="chat-messages" ref={chatBoxRef}>
            <div className="message-wrapper">
                {messages.map((message, index) => <p key={index}>{message}</p>)}
            </div>
        </div>
        <div className="chat-input">
            <input type="text" value={inputValue} onChange={handleInputChange} />
            <img 
                    src={imgSrc} 
                    alt="send" 
                    onClick={sendMessage} 
                    onMouseOver={() => setImgSrc(paperPlaneHoverIcon)}
                    onMouseOut={() => setImgSrc(paperPlaneIcon)}
                    width="30" 
                    height="30"
                />
        </div>
    </div>
);
    
}