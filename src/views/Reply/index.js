import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import './style.css';
import Modal from 'react-modal';

const fetchComment = (region) => {
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
Modal.setAppElement('#root'); // replace with your app id

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

export default function Reply({ text }) {
    const location = useLocation();
    const region = text;
    const [comment, setComment] = useState('');

    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedNickname, setSelectedNickname] = useState('');

    // 스크롤 바 너비 계산
    function getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
    }


    function openModal(nickname) {
      setSelectedNickname(nickname);
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${getScrollbarWidth()}px`;
      setIsOpen(true);
    }

    function closeModal(){    
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
      setIsOpen(false);
    }
    async function reportUser(selectedNickname){
      try{
        const response = await axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/member/report', {
          nickname: selectedNickname
        }, config);
        if(response.data === 1){
          alert("신고가 완료되었습니다.");
          console.log("신고가 완료되었습니다.");
          closeModal();
        }else{
          alert("잠시 후 다시 시도해주세요.");
          console.log("잠시 후 다시 시도해주세요.");
          closeModal();
        }
      }catch(error){
        console.error("오류(error)")
        closeModal();
      }
    }

    //1. reFresh 상태값을 셋팅
    const [refresh, setRefresh] = useState(1);

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
          const res = await fetchComment(region);
          setRefresh(refresh => refresh * -1);
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

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchAndSetComments = async () => {
            try {
                const response = await fetchComment(text);
                setComments(response.data.list);
            } catch (error) {
                console.error("댓글 불러오기 실패:", error);
            }
        }

        fetchAndSetComments();
    }, [text]);

    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <div style={{ position: 'sticky', marginTop: '10px', padding: '10px', border: '1px solid #ccc', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '5px', width: "60rem", height: "50%" }}>
              <form onSubmit={handleSubmit}>
                <textarea
                  style={{ margin: '0', flexGrow: 1, width: '100%', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none', resize: 'none', fontSize:'15px' }}
                  value={comment}
                  onChange={handleChange}
                  placeholder="시장님께 한마디를 작성해보세요"
                />
                <div title="Button push blue" className="button btnPush btnBlue" onClick={registReply} style={{ marginTop: '10px', marginLeft: '10px', padding: '10px', color: '#fff', borderRadius: '5px', textAlign: 'center', cursor: 'pointer' }}>
                  작성
                </div>
              </form>
            <div className="chat-list" style={{ overflow: 'auto', maxHeight: '500px' }}>
            {comments.slice().reverse().map((comment, index) => (
                <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', marginTop:'10px', borderRadius: '5px', fontSize:'15px' }} key={index}>
                    <div style={{ display:'flex', marginBottom:'3%'}}>
                      <h4 style={{ margin: 0, textAlign: 'left', width:'25%' }} onClick={() => openModal(comment.nickname)}>작성자  |  {comment.nickname}</h4>
                      <p style={{ margin: 0, textAlign: 'left', marginLeft:'10%', color: '#888' }}>{customDateFormat(comment.nowDate)}</p>
                    </div>
                    <p style={{ margin: 0, textAlign: 'left' }}>{comment.content}</p>
                </div>
            ))}
            <Modal
              className={"modal"}
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Report Modal"
            >
              <p>{selectedNickname}님 신고하기</p>
              {/* Add your report form here */}
              <div>
                <button id="modal-btn-1" onClick={closeModal}>닫기</button>
                <button id="modal-btn-2" onClick={()=>reportUser(selectedNickname)}>확인</button>
              </div>
            </Modal>
            </div>
            </div>
            
        </div>
        </>
        );
}