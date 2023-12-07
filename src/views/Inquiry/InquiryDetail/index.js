import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./style.css";

const InquiryDetail = () => {
  const navigate = useNavigate();
  const { num } = useParams(); // useParams로 URL 파라미터 추출

  const [comment, setComment] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const [sessionId, setSessionId] = useState("sayyo");

  const gotoInquiryEdit = () => {
    navigate(`/InquiryEdit/${num}`);
  };
  

  const gotoInquiryList = () => {
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

  const handleChange = (e) => {
    setComment(e.target.value);
  };


  // 답변은 관리자만 달 수 있도록
  useEffect(() => {
    const checkReplyPermission = async () => {
        try {
        const response = await axios.post(`https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/member/isAdmin`,
            { id:sessionId},
            config
        );
        console.log("댓글 작성 가능?"+response.data)
        setIsAdmin(response.data);
        } catch (error) {
        console.error('Reply permission check error:', error);
        }
    };
    checkReplyPermission();
    }, []);

    // 글 수정 삭제는 문의글 작성자만 할 수 있도록
    useEffect(() => {
      const checkEditPermission = async () => {
          try {
          const response = await axios.post(`https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/inquiry/isWriter`,
              { memberId:sessionId,
                num: num
              },
              config
          );
          console.log("글 수정 삭제 가능?"+response.data)
          setIsWriter(response.data);
          } catch (error) {
          console.error('Edit permission check error:', error);
          }
      };
      checkEditPermission();
      }, []);
  

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

  
  const customDateComment = (dateString) => {
    const inputDate = dateString.split('T')[0];
    const inputTime = dateString.split('T')[1].split('.')[0];
  
    return inputDate + " "+ inputTime;
   
  };

  const handleDelete = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/inquiry/delete', inquiryDto, config)
      .then(response => {
        console.log("삭제 완료 여부:", response.data);
        gotoInquiryList();
        alert("삭제가 정상적으로 완료되었습니다.");
        // TODO: 삭제가 성공적으로 이루어졌을 때 어떤 동작을 할지 추가
        // 예를 들어, 삭제 후 특정 페이지로 이동 등
      })
      .catch(error => {
        console.error("게시글 삭제 실패:", error);
        console.log("서버에서 전송된 에러 메시지:", error.response.data);
        // TODO: 삭제 실패 시 어떤 동작을 할지 추가
      });
  };

  const handleReply = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/inquiry/registRe', {
      num : num,
      title: "re:"+inquiryData.content,
      content: comment
    }, config)
      .then(response => {
        console.log("답변 작성 완료 여부:", response.data);
        gotoInquiryList();
        alert("답변 작성이 정상적으로 완료되었습니다.");
        // TODO: 삭제가 성공적으로 이루어졌을 때 어떤 동작을 할지 추가
        // 예를 들어, 삭제 후 특정 페이지로 이동 등
      })
      .catch(error => {
        console.error("게시글 삭제 실패:", error);
        console.log("서버에서 전송된 에러 메시지:", error.response.data);
        // TODO: 삭제 실패 시 어떤 동작을 할지 추가
      });
  };

  const [inquiryData, setInquiryData] = useState([]);


  // 상세 내역 불러오는 메소드
  useEffect(() => {
    const fetchInquiryDetail = async () => {
      try {
        const response = await axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/inquiry/findSearch',
          inquiryDto, config
        );

        // Find the inquiry with the matching num
        const inquiry = response.data.list.find(item => item.num === Number(num));

        console.log(inquiry); // 콘솔에 데이터 출력

        // 데이터를 배열로 변환하지 않고 바로 객체로 설정
        if (inquiry) {
          setInquiryData(inquiry);
        } else {
          console.error(`Inquiry with num ${num} not found.`);
        }
      } catch (error) {
        console.error('상세보기를 불러오는 중 오류 발생: ', error);
      }
    };

    fetchInquiryDetail();
  }, [num]); // num이 변경될 때마다 다시 호출

  
  const [inquiryReData, setInquiryReData] = useState([]);


  // 내역에 달린 답변 불러오는 메소드
  useEffect(() => {
    const fetchInquiryDetailRe = async () => {
      try {
        const response = await axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/inquiry/findSearchRe',
          {
            num:num
          }, config
        );

        // Find the inquiry with the matching num
        const inquiryRe = response.data.list.find(item => item.num === Number(num));;
        
        console.log("inquiryRe", inquiryRe); // 콘솔에 데이터 출력

        // 데이터를 배열로 변환하지 않고 바로 객체로 설정
        if (inquiryRe) {
          setInquiryReData(inquiryRe);
        } else {
          console.error(`Inquiry with num ${num} not found.`);
        }
      } catch (error) {
        console.error('상세보기를 불러오는 중 오류 발생: ', error);
      }
    };

    fetchInquiryDetailRe();
  }, [num]); // num이 변경될 때마다 다시 호출

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px' }}>
      <table className='tb-1'>
        <tbody>
          <tr>
            <td colSpan={4} style={{ fontWeight: 'bold', fontSize:'20px', padding: '10px' }}>{inquiryData.category}</td>
          </tr>
          <tr>
            <td  colSpan={4} style={{ borderTop:'1px solid #444444'}}> </td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', padding: '10px'}}>제목</td>
            <td style={{ padding: '10px'}}>{inquiryData.title}</td>
            <td style={{ fontWeight: 'bold', padding: '10px' }}>등록일</td>
            <td style={{ padding: '10px' }}>{inquiryData.nowDate && customDateFormat(inquiryData.nowDate)}</td>
          </tr>
          <tr>
            <td  colSpan={4} style={{ borderTop:'1px solid #444444'}}> </td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', padding: '10px' }}>작성자 아이디</td>
            <td style={{ padding: '10px' }} colSpan={3}>{inquiryData.memberId}</td>
          </tr>
          
          <tr>
            <td  colSpan={4} style={{ borderTop:'1px solid #444444'}}> </td>
          </tr>
          <tr className="contentRow">
            <td style={{ fontWeight: 'bold', padding: '10px' }}>내용</td>
            <td style={{ padding: '10px', whiteSpace: 'pre-wrap' }} colSpan={3}>{inquiryData.content}</td>
          </tr>
          <tr>
            <td  colSpan={4} style={{ borderTop:'1px solid #444444'}}> </td>
          </tr>
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        
        <button className='custom-btn btn-4' onClick={gotoInquiryList}>
          목록
        </button>
        <button className='custom-btn btn-4' onClick={gotoInquiryEdit}>
        수정
        </button>
        <button className='custom-btn btn-4' onClick={handleDelete}>
          삭제
        </button>
        
      </div>
      <div className='inquiry-detail-wrapper' style={{  width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        {inquiryReData.length!==0 ? (
          <div className='inquiry-detail'  style={{  width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h2>
              답변
            </h2>
            <table style={{width:'100%', maxWidth:'80vh', minHeight:'30vh', textAlign:'left'}}>
              <tr>
                <td  colSpan={4} style={{ borderTop:'1px solid #444444'}}> </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold'}}>제목</td>
                <td style={{ width:'10px' }}></td>
                <td>{inquiryReData.title}</td>
              </tr>
              <tr>
                <td colSpan={4} style={{ borderTop:'1px solid #444444'}}> </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold'}}>작성 시간</td>
                <td>   </td>
                <td>{customDateComment(inquiryReData.nowDate)}</td>
              </tr>
              <tr>
                <td colSpan={4} style={{ borderTop:'1px solid #444444'}}> </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold'}}>답변 내용</td>
                <td>   </td>
                <td colSpan={3}>{inquiryReData.content}</td>
              </tr>
              <tr>
                <td  colSpan={4} style={{ borderTop:'1px solid #444444'}}> </td>
              </tr>
            </table>
            {/* 여기에 추가적인 inquiryReData 정보를 표시할 수 있습니다. */}
          </div>
        ) : (
          <p className='inquiry-no-detail'>답변이 아직 등록되지 않았습니다.</p>
        )}
      </div>
      {isAdmin && (
        <div style={{  width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
          <textarea
            style={{ 
              fontSize: '20px', 
              width: '100%', 
              borderRadius: '5px', 
              border: '1px solid #ccc', 
              outline: 'none', 
              resize: 'none', 
              margin: '10px auto',
              boxSizing: 'border-box'
            }}
            value={comment}
            onChange={handleChange}
            placeholder="답변을 입력하세요."
          />
          <button className='custom-btn btn-4' style={{marginBottom:'15%'}} onClick={handleReply} disabled={!comment.trim()}>
            작성
          </button>
        </div>
      )}
    </div>
  );
}
export default InquiryDetail;