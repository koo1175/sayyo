import React, { useState } from 'react';
import '../Board/Board.css';

const Board = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);

    const handleTitleChange = (e) => {
        if(e.target.value.length <= 100) {
            setTitle(e.target.value);
        }
    }

    const handleContentChange = (e) => {
        if(e.target.value.length <= 400) {
            setContent(e.target.value);
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}> 
            <div style={{backgroundColor:"#ECECEC",width:'800px',height:'100px',borderTop:'3px solid gray', marginTop:'100px'}}>
                <h2 style={{marginLeft:'30px',marginTop:'35px',color:'#6A6A6A'}}>게시글 작성</h2>
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
            {/* <label style={{display:'block',margin:20}}>파일</label>
            <input type="file" onChange={handleFileChange} style={{marginLeft:20}} /> */}
            <div style={{display: 'flex', justifyContent: 'space-between', width: '200px', margin: '20px'}}>
                <button style={{backgroundColor: '#7FBDF6', color: 'white', fontWeight: 'bold', borderRadius: '5px', padding: '10px 20px'}}>취소</button>
                <button style={{backgroundColor: '#7FBDF6', color: 'white', fontWeight: 'bold', borderRadius: '5px', padding: '10px 20px'}}>작성</button>
            </div>

            <div style={{ marginTop: '100px', color: 'gray' }}>
                <p style={{marginLeft:400}}>충남 천안시</p>
                <p style={{marginLeft:150}}>Copyright ⓒ 2023 Dike Engineering & Construction Corporation, All rights Reserved</p>
                <p style={{marginLeft:300}}>Dike 정책 | 개인정보처리 방침 | 고객센터</p>
            </div>
        </div>
    )
}

export default Board;