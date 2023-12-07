import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style.css";

const InquiryList = () => {
    const [inquiries, setInquiries] = useState([]);
    const [sessionId, setSessionId] = useState("zxc");

    const navigate = useNavigate();
    const gotoWritePage = () => {
        navigate('/InquiryWrite');
    };
  
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const customDateFormat = (dateString) => {
        const nowDate = new Date();
        const currentDate = nowDate.toISOString().split('T')[0];
        const inputDate = dateString.split('T')[0];
        const inputTime = dateString.split('T')[1].split('.')[0];
      
        if(inputDate === currentDate){
          return inputTime;
        } else {
          return inputDate;
        }
    };

    const isComplete = (complete) => {
        if(complete === "0"){
          return "x";
        } else {
          return "답변 완료";
        }
    };

    const checkAccess = async (num) =>{
        try {
            const response = await axios.post(`https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/inquiry/isWriter`,
            {
                memberId:sessionId,
                num: num,
            }, config);
            console.log(response.data)
            if (response.data) {
                navigate(`/InquiryDetail/${num}`);
            } else {
                alert('접근 권한이 없습니다.');
            }
        } catch (error) {
            console.error('Check Access Error:', error);
        }
    };

    useEffect(() => {
        axios.get(`https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/inquiry/findAll`)
            .then((response) => {
                console.log("요청 [", response.status, "]")
                console.log(response.data.list);
                setInquiries(response.data.list)
            })
            .catch((error) => {
                console.error('Google Error:', error);
            });
    }, []);

    return (
        <div style={{ marginTop:'100px', display:'flex' }}>
        <div className='inquiry-list' style={{ width: '100%' }}>

            <div style={{ marginTop : '10%', marginBottom : '5%'}}>
                <hr />
                <h2 style={{ height:'10%', alignItems:'center', textAlign: 'center'}}>문의내역 목록</h2>
                <hr />
            </div>

            <table style={{ width: '100%', borderTop:'1px solid #444444', borderBottom:'1px solid #444444'}}>
                <thead style={{ width:'100%', marginBottom:'10px', borderBottom:'1px solid #444444' }}>
                    <tr>
                        <th>문의 번호</th>
                        <th>ID</th>
                        <th>문의 제목</th>
                        <th>작성 시간</th>
                        <th>카테고리</th>
                        <th>답변 상태</th>
                    </tr>
                </thead>
                {/* <!-- 각 문의 내역은 이곳에 추가 --> */}
                <tbody className='tb-list' style={{ textAlign:'center'}}>
                    <td colSpan={6} style={{ height: '10px', borderBottom:'1px solid #444444' }}></td>
                    {inquiries.map((inquiry, index) => (
                        <>
                        <tr style={{ height: '10px', borderBottom:'1px solid #444444'}}>
                        </tr>
                        <tr key={index} style={{ marginTop: '5%', borderBottom: '1px solid #000'}}>
                            <td style={{ fontWeight:'bold'}}>{inquiry.num}</td>
                            <td>{inquiry.memberId}</td>
                            <td onClick={() => checkAccess(inquiry.num)}>
                                {inquiry.title}
                            </td>
                            <td className="td-blank">{customDateFormat(inquiry.nowDate)}</td>
                            <td>{inquiry.category}</td>
                            <td style={{ fontWeight:'bold', color: isComplete(inquiry.complete) === 'x' ? 'red' : '#2ab037' }}>{isComplete(inquiry.complete)}</td>
                        </tr>
                        
                        <tr  style={{ height: '10px', borderBottom:'1px solid #444444'}}></tr>
                        </>
                    ))}
                </tbody>
            </table>
             {/* 글쓰기 버튼 */}
             <div style={{ marginTop: '5%', display: 'flex',  justifyContent: 'flex-end', alignItems: 'center' }}>
                <button onClick={gotoWritePage} style={{ cursor: 'pointer', width:'100px' }}>
                    <img src='../img/writeBtn.png' alt='writeBtn' style={{ width : '70%'}} />
                </button>
            </div>
        </div>
        </div>
    );
}
export default InquiryList;