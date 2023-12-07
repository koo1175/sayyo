import React, { useEffect, useState, useRef, useContext } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './Chat.css';
import paperPlaneIcon from '../../../src/img/btn_send_before.png'; // 기본 이미지 경로
import paperPlaneHoverIcon from '../../../src/img/btn_send_after.png';
import { ChatContext } from '../ChatContext';

export default function Chat() {
    const [stompClient, setStompClient] = useState(null);
    const { messages, setMessages, isChatVisible, setIsChatVisible } = useContext(ChatContext);
    const [inputValue, setInputValue] = useState('');
    const [imgSrc, setImgSrc] = useState(paperPlaneIcon);

    // 위젯의 클릭 상태 저장
    const [isClicked, setIsClicked] = useState(false);

    const [isSending, setIsSending] = useState(false); // 메시지 전송 중인지를 나타내는 상태
    const [sessionId, setSessionId] = useState("전설의 엉덩이");
    const toggleChat = () => {
        setIsClicked(!isClicked);
        setIsChatVisible(prevVisible => !prevVisible);
    };
    const imageStyle = {
        opacity: isChatVisible ? 1 : 1,
    };
    // 텍스트 유효성 검사 리스트
    const badWords = ['시발', '씨발', 'ㅅㅂ', 'ㅂㅅ', '병신', '이승만', '윤보선', '박정희', '최규하', '전두환', '노태우', '김영삼', '김대중', '노무현', '이명박',
        '박근혜', '문재인', '윤석열', '존나', '좆', '조까', '바보', '니미', '꺼져'];

    const inputRef = useRef(null); // 채팅 입력창에 대한 ref

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
                const messageBody = JSON.parse(chatMessage.body);
                console.log(messageBody.content, messageBody.nickname);
                const newMessage = {
                    content: messageBody.content,
                    nickname: messageBody.nickname
                };
                setMessages(prevMessages => [...prevMessages, newMessage]);

            });
        };
        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, []);

    // 입력값에 욕설 단어가 포함되어 있는지 확인하는 함수
    const containsBadWords = (text) => {
        for (let word of badWords) {
            if (text.includes(word)) {
                return true;
            }
        }
        return false;
    };

    // 메세지 전송
    const sendMessage = () => {
        if (inputValue.trim() === "") {
            return; // 입력값이 없는 경우 함수를 빠져나감
        }
        if (!isSending) { // 메시지 전송 중이 아닐 때만 메시지를 전송

            if (!containsBadWords(inputValue)) {
                // Send a message if the WebSocket connection is active
                if (stompClient?.connected) {
                    stompClient.publish({
                        destination: '/app/chat.sendMessage',
                        body: JSON.stringify({ 
                            content: inputValue,
                            nickname: sessionId // 'yourNickname'을 실제 사용자의 닉네임으로 변경하세요.
                        })
                    });
                    setInputValue('');
                    setIsSending(true); // 메시지 전송 중으로 상태를 변경
                    inputRef.current.focus();
                }
            } else {
                alert('욕설이 포함된 메시지는 전송할 수 없습니다.')
                setInputValue('');
            }
        } else {
            alert('잠시 후에 다시 입력해주세요.')
        }
    };

    useEffect(() => {
        if (isSending) { // 메시지 전송 중일 때
            const timer = setTimeout(() => setIsSending(false), 3000); // 3초 후에 메시지 전송 중인 상태를 해제
            return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 해제
        }
    }, [isSending]);

    // 채팅 텍스트 작성 후 Enter 눌렀을 때
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage(); // sendMessage 함수를 실행
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value.length <= 30) { // 입력된 글자 수가 30자 이하일 때만 상태를 업데이트
            setInputValue(value);
        }
    };

    return (
        <div>
            <div className='widget' style={{ position: 'fixed', bottom: '100px', left: '100px' }}>
            <img
                src={isClicked ? '/img/ChatIcon-after.png' : '/img/ChatIcon.png' }
                alt="chat-icon"
                onClick={toggleChat}
                width="50"
                height="50"
                style={imageStyle}
            />
            </div>
            {isChatVisible && (
                <div className="chat-container" style={{ position: 'fixed', bottom: '170px', left: '50px' }}>
                    <div className="chat-messages" ref={chatBoxRef}>
                        <div style={{ textAlign: 'left'}}>
                            {messages.map((message, index) => (
                                <div className='message'
                                    key={index}
                                    style={{
                                        
                                        display: 'flex',
                                        justifyContent: message.nickname === sessionId ? 'flex-end' : 'flex-start',
                                        marginTop: '-5px', // 각 메세지 사이의 간격
                                    }}
                                >
                                    <p
                                        style={{
                                            border: message.nickname === sessionId ? '1px solid rgba(212, 212, 212, 0.7)' : '1px solid #cadba4' ,
                                            fontFamily: 'SKYBORI',
                                            backgroundColor: message.nickname === sessionId ? 'white' : '#E4F7BA',
                                            borderRadius: '10px',
                                            padding: '5px',
                                            paddingLeft: '10px',
                                            paddingRight: '10px',
                                        }}
                                    >
                                        {message.nickname}: {message.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="chat-input">
                        <input ref={inputRef} type="text" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
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
            )}
        </div>
    );

}