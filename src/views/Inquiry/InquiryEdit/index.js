import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './style.css';

const InquiryEdit = () => {
    const { num } = useParams(); // useParams로 URL 파라미터 추출

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const gotoListPage = () => {
        navigate('/Inquiry');
    };

    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

    // inquiryDto 객체를 생성
    const inquiryDto = {
        num: num
    };


    useEffect(() => {
        const fetchBoardDetail = () => {
            axios.post(`https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/inquiry/findSearch`,
            inquiryDto, config)
                .then(response => {
                    const inquiry = response.data.list.find(item => item.num === Number(num));

                    console.log(inquiry); // 콘솔에 데이터 출력

                    if (inquiry) {
                        setTitle(inquiry.title);
                        setContent(inquiry.content);
                    } else {
                        console.error(`Inquiry with num ${num} not found.`);
                    }
                })
                .catch(error => {
                    console.error('문의 내역을 가져오는 중 오류 발생: ', error);
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
        axios.post("https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/inquiry/modify", {
            num: Number(num),
            title: title,
            content: content,
            memberId:'zxc'
        }, config)
        .then(response => {
            console.log("수정 완료 여부: ", response.data);
        })
        .catch(error => {
            console.error("수정 중 오류 발생: ", error);
        });
    }

    return (
        <div style={{marginLeft:'150px',marginTop:'100px', textAlign:'left'}}> 
            <div style={{backgroundColor:"#ECECEC",width:'800px',height:'100px',borderTop:'3px solid #4dccb0',borderBottom:'3px solid #4dccb0'}}>
                <h2 style={{marginLeft:'30px',marginTop:'35px',color:'#000000'}}>문의내역 수정</h2>
                
            </div>
            <div style={{color:'gray',margin:'20px'}}>
            • 제목과 내용은 작성 후 수정, 삭제가 불가능하므로 다시 확인하시고 작성해 주시기 바랍니다.<br/>
            • 허위작성 등은 명예훼손, 무고죄 등으로 처벌될 수 있습니다.<br/>
            • 폭언, 욕설 등은 관련 법령(형법, 경범죄처벌법)에 따라 법적조치를 받을 수 있습니다.
            </div>
            <div className='form-wrapper'>
                
                <input className="title-input" style={{ margin: '0' , width:'99%' }} type='text' onChange={handleTitleChange} value={title} placeholder='제목' />
                
                <CKEditor value={content}
                style={{marginTop:'10px'}}
                editor={ClassicEditor}
                data={content}
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

            {/* <label style={{display:'block',margin:20}}>제목<span style={{color: 'red'}}> *</span></label>
            <input type="text" value={title} onChange={handleTitleChange} style={{marginLeft:10,width: '780px', height: '30px',fontSize:20}} />
            <div style={{marginLeft:'720px',fontSize:20}}>({title.length}/100)</div>
            <label style={{display:'block',margin:20}}>내용<span style={{color: 'red'}}> *</span></label>
            <textarea value={content} onChange={handleContentChange} style={{marginLeft:10,width: '780px', height: '330px',fontSize:20}}/>
            <div style={{marginLeft:'720px',fontSize:20}}>({content.length}/400)</div> */}
            <div style={{display: 'flex', justifyContent: 'space-between', width: '200px', marginTop: '10px'}}>
                <button style={{ marginRight: '10px'}} className='custom-btn btn-4'>취소</button>
                <button className='custom-btn btn-4' onClick={() => { handleModify(); gotoListPage(); }} >확인</button>
            </div>
            <div style={{height:'150px'}}/>
        </div>
    )
}

export default InquiryEdit;