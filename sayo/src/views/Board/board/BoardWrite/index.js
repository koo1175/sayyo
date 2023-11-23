import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function BoardWrite() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const gotoListPage = () => {
        navigate('/BoardList');
    };

    const Register = () => {

        const memberDto = {
            memberId:"zxc",
            title:title,
            content:content,
            category:"공지"
        };
      

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // 이미지 업로드 및 게시글 등록
        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/memBoard/regist', memberDto, config)
            .then(response => {
                console.log("글 등록 성공:", response.data);
                gotoListPage();
                // TODO: 등록 성공 시 어떤 처리를 할지 추가
            })
            .catch(error => {
                console.error("글 등록 실패:", error);
                console.error("mem",memberDto);
                alert("글 등록에 실패했습니다. 다시 시도해 주세요.");
                // TODO: 등록 실패 시 어떤 처리를 할지 추가
            });
    };

    const handleTitleChange = (e) => {
        if (e.target.value.length <= 100) {
            setTitle(e.target.value);
        }
    };

    const handleContentChange = (e) => {
        const value = e.target.value;
        const replacedValue = value.replace(/\n/g, '<br>');
    
        if (replacedValue.length <= 400) {
            setContent(replacedValue);
        }
    };
    

   

    return (
        <div style={{ marginLeft: '150px', marginTop: '100px', textAlign: 'left' }}>
            <div style={{ backgroundColor: "#ECECEC", width: '800px', height: '100px', borderTop: '3px solid gray' }}>
                <h2 style={{ marginLeft: '30px', marginTop: '35px', color: '#6A6A6A' }}>게시글 작성</h2>
                <h5 style={{ marginLeft: '600px', marginTop: '-45px', color: '#6A6A6A' }}>
                    <span style={{ color: 'red' }}>*</span> 표는 필수입력사항 입니다
                </h5>
            </div>
            <div style={{ color: 'gray', margin: '20px' }}>
                • 제목과 내용은 작성 후 수정, 삭제가 불가능하므로 다시 확인하시고 작성해 주시기 바랍니다.<br />
                • 허위작성 등은 명예훼손, 무고죄 등으로 처벌될 수 있습니다.<br />
                • 폭언, 욕설 등은 관련 법령(형법, 경범죄처벌법)에 따라 법적조치를 받을 수 있습니다.
            </div>
            <label style={{ display: 'block', margin: 20 }}>제목<span style={{ color: 'red' }}> *</span></label>
            <input type="text" value={title} onChange={handleTitleChange} style={{ marginLeft: 10, width: '780px', height: '30px', fontSize: 20 }} />
            <div style={{ marginLeft: '720px', fontSize: 20 }}>({title.length}/100)</div>
            <label style={{ display: 'block', margin: 20 }}>내용<span style={{ color: 'red' }}> *</span></label>
            <textarea value={content} onChange={handleContentChange} style={{ marginLeft: 10, width: '780px', height: '330px', fontSize: 20 }} />
            <div style={{ marginLeft: '720px', fontSize: 20 }}>({content.length}/400)</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', margin: '20px' }}>
                <button style={{ backgroundColor: '#7FBDF6', color: 'white', fontWeight: 'bold', borderRadius: '5px', padding: '10px 20px' }}>취소</button>
                <button onClick={Register} style={{ backgroundColor: '#7FBDF6', color: 'white', fontWeight: 'bold', borderRadius: '5px', padding: '10px 20px' }}>작성</button>
            </div>
            <div style={{ height: '150px' }} />
        </div>
    )
}
