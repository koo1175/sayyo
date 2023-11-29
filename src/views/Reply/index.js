import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import ReplyList from "./ReplyList";
import { fetchComments } from "./ReplyList";

export default function Reply({ text }) {
    const location = useLocation();
    const region = text;
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
    };

    // MemBoardDto 객체를 생성
    const replyDto = {
        nickname: "koo",
        content: comment,
        region: region
    };

    const registReply = () => {
        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/reply/regist', replyDto, config)
        .then(async response => {
          console.log("댓글 등록 완료 여부:", response.data);
          const res = await fetchComments(region);
          setComments(res.data.list);
          alert("댓글이 등록되었습니다.");
          setComment('');
        })
        .catch(error => {
          console.error("댓글 등록 실패:", error);
          alert("댓글 등록에 실패하였습니다.");
          setComment('');
      })
    }
    const handleChange = (e) => {
        setComment(e.target.value);
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        setComment('');
    };

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
            <div style={{ marginTop: '20px', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '5px', width: "60rem", height: "40%" }}>
              <form onSubmit={handleSubmit}>
                <textarea
                  style={{ flexGrow: 1, width: '100%', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none', resize: 'none' }}
                  value={comment}
                  onChange={handleChange}
                  placeholder="댓글을 입력하세요..."
                />
                <div className="button" onClick={registReply} style={{ marginTop: '10px', marginLeft: '10px', padding: '10px', backgroundColor: '#007BFF', color: '#fff', borderRadius: '5px', textAlign: 'center', cursor: 'pointer' }}>
                  작성
                </div>
              </form>
            </div>
            <ReplyList text={text} />
        </div>
        );
}