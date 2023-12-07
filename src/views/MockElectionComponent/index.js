import React, { useState } from "react";
import axios from 'axios';
import SiblingFade from "../SiblingFade";
import PopUpMok from "../PopUpMok";
import ResultOfMok from "../ResultOfMok";
import Graph from '../Graph';
import Chat from "../Chat";

export default function MockElectionComponent() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isResultPopupOpen, setResultPopupOpen] = useState(false);
  const [candidatePercentages, setCandidatePercentages] = useState([0, 0, 0, 0]); //각 후보의 득표율 저장

  const [isButtonClicked, setIsButtonClicked] = useState(false); //투표현황보기 상태 저장

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const openPopup = () => {
    const memberId = "koo1175@naver.com"; // TODO: 실제 사용자 아이디로 변경
    const votedDto = {
      title: "제 02대 몰입형 선거", // TODO: 투표 항목 제목으로 변경
      memberId: memberId,
    };

    // 서버에 투표 여부 전송
    axios.post("https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/findVoted", votedDto, config)
      .then(response => {
        const serverCount = response.data;

        // 이미 투표한 경우
        if (serverCount > 0) {
          console.log("공정한 평가를 위해 재투표는 불가합니다");
          alert('공정한 평가를 위해 재투표는 불가합니다');
        } else {
          // 투표하지 않은 경우에만 팝업을 엽니다.
          setPopupOpen(true);
        }
      })
      .catch(error => {
        console.error("에러:", error);
      });
  };


  const closePopup = () => {
    setPopupOpen(false);
  };



  const openResultPopup = () => {
    setPopupOpen(false);
    const votingData = {
      title: '제 02대 몰입형 선거',
      memberId: 'koo1175@naver.com',
      num: selectedButton
    };
    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/voted', votingData, config)
      .then(response => {
        if (response.data === 1) {
          alert('투표가 성공적으로 완료되었습니다.');
          updatePercentage(votingData.title);
        } else {
          alert('투표에 실패하였습니다. 다시 시도해주세요.');
        }

      })
      .catch(error => {
        console.error('투표 중 에러가 발생했습니다', error);
      });



    // 결과 팝업 열기
    setResultPopupOpen(true);
  };

  const updatePercentage = (title) => {
    const updatePercentageData = {
      title
    };
    console.log('updatePercentageData 의 title 값', updatePercentageData.title);
    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/candidates', updatePercentageData)
      .then(response => {
        if (response.status === 200) {
          console.log('퍼센트 업데이트 성공!');
          fetchCandidates();
        } else {
          console.log('퍼센트 업데이트 실패!');
        }
      })
      .catch(error => {
        console.error('퍼센트 업데이트 에러!', error);
      });
  }

  const fetchCandidates = () => {
    axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/findAll')
      .then(response => {
        const candidates = response.data.list;
        const percentages = candidates.map(candidate => candidate.percentage);
        // 후보의 득표율을 콘솔에서 확인
        console.log('후보들의 득표율123123:', percentages);
        // 후보의 득표율을 상태로 저장
        setCandidatePercentages(percentages);
      })
      .catch(error => {
        console.error('후보 목록을 가져오는데 실패했습니다', error);
      });
  }
  const closeResultPopup = () => {
    setResultPopupOpen(false);
  };

  const handleButtonClick = (buttonId) => {
    let color;
    switch (buttonId) {
      case 1:
        color = "red";
        console.log("red : ", buttonId, color); // color를 사용
        break;
      case 2:
        color = "yellow";
        console.log("yellow : ", buttonId, color); // color를 사용
        break;
      case 3:
        color = "purple";
        console.log("purple : ", buttonId, color); // color를 사용
        break;
      case 4:
        color = "orange";
        console.log("orange : ", buttonId, color); // color를 사용
        break;
      default:
        color = null;
    }
    setSelectedButton(buttonId === selectedButton ? null : buttonId);
  };

  const renderButtons = () => {
    const buttons = [
      { id: 1, top: "12%" },
      { id: 2, top: "27%" },
      { id: 3, top: "41%" },
      { id: 4, top: "54%" },
    ];

    return buttons.map((button) => (
      <div key={button.id}>
        <button
          style={{
            position: "absolute",
            top: button.top,
            left: "78.5%",
            transform: "translate(-50%, 50%)",
            backgroundColor: "#F6E486",
            cursor: "pointer",
          }}
          onClick={() => handleButtonClick(button.id)}
        >
          {selectedButton === button.id ? (
            <img alt="clickSpace" src="/img/image0.png" width="29px" />
          ) : (
            <img alt="clickSpace" src="/img/clickSpace.png" width="29px" />
          )}
        </button>
      </div>
    ));
  };

  const popupContent = (
    <div>
      <container
        style={{ position: "absolute", top: "0%", left: "0%", width: "100%", height: "100%" }}
      >
        <div style={{ position: 'relative' }}>
          <div>
            <img alt="ballotPaper" src="/img/ballotPaper.png" width="100%" />
          </div>
          <div>
            <button style={{ position: 'absolute', top: "0%", left: "90%", transform: "translate(-50%, 50%)", backgroundColor: "#F6E486", cursor: 'pointer' }} onClick={closePopup}>
              닫기
            </button>
          </div>
          <div>
            <button style={{ position: 'absolute', top: "69%", left: "36%", transform: "translate(-50%, 50%)", backgroundColor: "#F6E486", cursor: 'pointer' }} onClick={closePopup}>
              <img alt="cancle" src="/img/cancle.png" height="48px" />
            </button>
          </div>
          <div>
            <button style={{ position: 'absolute', top: "69%", left: "66%", transform: "translate(-50%, 50%)", backgroundColor: "#F6E486", cursor: 'pointer' }} onClick={openResultPopup}>
              <img alt="vote" src="/img/vote.png" height="48px" />
            </button>
          </div>

          {renderButtons()}
        </div>
      </container>
    </div>
  );

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div style={{ marginTop: '3%' }}>
        <img
          alt="titlemok"
          src="/img/titlemok.png"
          style={{ width: '50%' }}
        />
      </div>

      <div>
        <button onClick={openPopup}>
          <img
            alt="btnMok"
            src="/img/btnMok.png"
            style={{ width: '200px', cursor: 'pointer' }}
          />
        </button>
        <button onClick={() => setIsButtonClicked(prevState => !prevState)}>
          <img
            alt="btnMok"
            src={isButtonClicked ? "/img/btn_result_after.png" : "/img/btn_result_before.png"}
            style={{ width: '200px', cursor: 'pointer' }}
          />
        </button>

        <PopUpMok isOpen={isPopupOpen} onClose={closePopup} content={popupContent} />
      </div>

      {!isButtonClicked && (
        <div>
          <ResultOfMok
            isOpen={isResultPopupOpen}
            onClose={closeResultPopup}
            percentages={candidatePercentages}

            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
            }}
          />
        </div>
      )}

      {isButtonClicked && <Graph />} {/* 버튼이 클릭되었을 때 Graph 컴포넌트를 렌더링합니다. */}

      {!isButtonClicked && <SiblingFade />}
      <div>
        <Chat/>
      </div>
    </div>
  );
}