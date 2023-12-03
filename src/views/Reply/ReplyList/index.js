import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

export const fetchComments = (region) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const replyDto = {
        region: region
    };

    return axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/reply/findAll', replyDto, config);
}

const formatDate = (nowDate) => {
    const date = new Date(nowDate);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export default function ReplyList({ text }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchAndSetComments = async () => {
            try {
                const response = await fetchComments(text);
                setComments(response.data.list);
            } catch (error) {
                console.error("댓글 불러오기 실패:", error);
            }
        }

        fetchAndSetComments();
    }, [text]);

    return (
        <div>
            {comments.slice().reverse().map((comment, index) => (
                <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }} key={index}>
                    <h4 style={{ margin: 0, textAlign: 'left' }}>{comment.nickname}</h4>
                    <p style={{ margin: 0, textAlign: 'left' }}>{comment.content}</p>
                    <p style={{ margin: 0, fontSize: '0.8em', color: '#888' }}>{formatDate(comment.nowDate)}</p>
                </div>
            ))}
        </div>
    );
}