import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const InquiryWrite = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const gotoListPage = () => {
        navigate('/Inquiry');
    };

    const Register = () => {

        const InquiryDto = {
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
        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/inquiry/regist', InquiryDto, config)
            .then(response => {
                console.log("글 등록 성공:", response.data);
                gotoListPage();
                // TODO: 등록 성공 시 어떤 처리를 할지 추가
            })
            .catch(error => {
                console.error("글 등록 실패:", error);
                console.error("inquiry",InquiryDto);
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
    <div className="App" style={{marginLeft:'150px',marginTop:'100px', textAlign:'left'}}>
      <h1>1:1 문의</h1>
      <div style={{backgroundColor:"#ECECEC",width:'800px',height:'100px',borderTop:'3px solid #4dccb0',borderBottom:'3px solid #4dccb0'}}>
        <h2 style={{marginLeft:'30px',marginTop:'35px',color:'#000000'}}>문의내역 수정</h2>  
      </div>
      <div style={{color:'gray',margin:'20px'}}>
      • 제목과 내용은 작성 후 수정, 삭제가 불가능하므로 다시 확인하시고 작성해 주시기 바랍니다.<br/>
      • 허위작성 등은 명예훼손, 무고죄 등으로 처벌될 수 있습니다.<br/>
      • 폭언, 욕설 등은 관련 법령(형법, 경범죄처벌법)에 따라 법적조치를 받을 수 있습니다.
      </div>
      <div className='form-wrapper'>
        <input className="title-input" type='text' style={{ margin: '0' , width:'99%' }} onChange={handleTitleChange} value={title} placeholder='제목' />
        
        <CKEditor value={content}
          editor={ClassicEditor}
          data="<p>• 문의 내용을 상세히 입력해주세요.</p>
          <p>• 허위작성 등은 명예훼손, 무고죄 등으로 처벌될 수 있습니다.</p>
          <p>• 폭언, 욕설 등은 관련 법령(형법, 경범죄처벌법)에 따라 법적조치를 받을 수 있습니다.</p>"
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const htmlData = editor.getData();
            const parser = new DOMParser();
            const parsedHtml = parser.parseFromString(htmlData, 'text/html');
            const plainText = parsedHtml.body.textContent;
            setContent(plainText);
            console.log({ event, editor, plainText });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div>
      <div style={{ marginTop:'10px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        
        <button className='custom-btn btn-4' onClick={gotoListPage}>
          목록
        </button>
        <button className="custom-btn btn-4" style={{ marginBottom:'15%'}} onClick={Register} disabled={!title.trim() || !content.trim()}>
          완료
        </button>
      </div>
    </div>
    )
}

export default InquiryWrite;