import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';

export default function BoardEdit() {
    const { num } = useParams(); // useParams로 URL 파라미터 추출

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const gotoListPage = () => {
        navigate('/BoardList');
    };

    useEffect(() => {
        const fetchBoardDetail = () => {
            axios.get(`https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/memBoard/findAll`)
                .then(response => {
                    const board = response.data.list.find(item => item.num === Number(num));

                    console.log(board); // 콘솔에 데이터 출력

                    if (board) {
                        setTitle(board.title);
                        setContent(board.content);
                    } else {
                        console.error(`Board with num ${num} not found.`);
                    }
                })
                .catch(error => {
                    console.error('게시글을 가져오는 중 오류 발생: ', error);
                });
        };

        fetchBoardDetail();
    }, [num]);

    const handleTitleChange = (e) => {
        if (e.target.value.length <= 100) {
            setTitle(e.target.value);
        }
    }

    const handleContentChange = (e) => {
        if (e.target.value.length <= 400) {
            setContent(e.target.value);
        }
    }

    const handleModify = () => {
        // 수정된 내용을 서버로 전송
        axios.post("https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/memBoard/modify", {
            num: Number(num),
            title,
            content,
        })
        .then(response => {
            console.log("수정 완료 여부: ", response.data);
        })
        .catch(error => {
            console.error("수정 중 오류 발생: ", error);
        });
    }

    return (
        <div style={{marginLeft:'150px',marginTop:'100px', textAlign:'left'}}> 
            <div style={{backgroundColor:"#ECECEC",width:'800px',height:'100px',borderTop:'3px solid gray'}}>
                <h2 style={{marginLeft:'30px',marginTop:'35px',color:'#6A6A6A'}}>게시글 수정</h2>
                <h5 style={{marginLeft:'600px',marginTop:'-45px',color:'#6A6A6A'}}>
                <span style={{color: 'red'}}>*</span> 표는 필수입력사항 입니다</h5>
            </div>
            <div style={{color:'gray',margin:'20px'}}>
            • 제목과 내용은 작성 후 수정, 삭제가 불가능하므로 다시 확인하시고 작성해 주시기 바랍니다.<br/>
            • 허위작성 등은 명예훼손, 무고죄 등으로 처벌될 수 있습니다.<br/>
            • 폭언, 욕설 등은 관련 법령(형법, 경범죄처벌법)에 따라 법적조치를 받을 수 있습니다.
            </div>
            <label style={{display:'block',margin:20}}>제목<span style={{color: 'red'}}> *</span></label>
            <input type="text" value={title} onChange={handleTitleChange} style={{marginLeft:10,width: '780px', height: '30px',fontSize:20}} />
            <div style={{marginLeft:'720px',fontSize:20}}>({title.length}/100)</div>
            <label style={{display:'block',margin:20}}>내용<span style={{color: 'red'}}> *</span></label>
            <textarea value={content} onChange={handleContentChange} style={{marginLeft:10,width: '780px', height: '330px',fontSize:20}}/>
            <div style={{marginLeft:'720px',fontSize:20}}>({content.length}/400)</div>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '200px', margin: '20px'}}>
                <button style={{backgroundColor: '#7FBDF6', color: 'white', fontWeight: 'bold', borderRadius: '5px', padding: '10px 20px'}}>취소</button>
                <button onClick={() => { handleModify(); gotoListPage(); }} style={{backgroundColor: '#7FBDF6', color: 'white', fontWeight: 'bold', borderRadius: '5px', padding: '10px 20px'}}>게시글 수정</button>
            </div>
            <div style={{height:'150px'}}/>
            {/* <div style={{ marginTop: '100px', color: 'gray' }}>
                <p style={{marginLeft:400}}>충남 천안시</p>
                <p style={{marginLeft:150}}>Copyright ⓒ 2023 Dike Engineering & Construction Corporation, All rights Reserved</p>
                <p style={{marginLeft:300}}>Dike 정책 | 개인정보처리 방침 | 고객센터</p>
            </div> */}
        </div>
    )
}