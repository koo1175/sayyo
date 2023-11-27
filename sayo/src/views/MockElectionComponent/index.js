import React, { useState } from "react";
import axios from 'axios';
import SiblingFade from "../SiblingFade";
import PopUpMok from "../PopUpMok";
import ResultOfMok from "../ResultOfMok";

export default function MockElectionComponent() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isResultPopupOpen, setResultPopupOpen] = useState(false);

  const [candidate1Percentage, setCandidate1Percentage] = useState(0);
  const [candidate2Percentage, setCandidate2Percentage] = useState(0);
  const [candidate3Percentage, setCandidate3Percentage] = useState(0);
  const [candidate4Percentage, setCandidate4Percentage] = useState(0);


  // 투표 팝업 열기
  const openPopup = () => {
    const memberId = "koo"; // TODO: 실제 사용자 아이디로 변경
    const votedDto = {
      title: "제 02대 몰입형 선거 모의투표", // TODO: 투표 항목 제목으로 변경
      memberId: memberId,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // 서버에 투표 여부 전송
    axios.post("https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/findVoted", votedDto, config)
      .then(response => {
        const serverCount = response.data;

        // 이미 투표한 경우
        if (serverCount > 0) {
          // 이미 투표한 경우에는 알림창을 띄우지 않음
          openResultPopup();
        } else {
          // 투표하지 않은 경우에만 팝업을 엽니다.
          setPopupOpen(true);
        }
      })
      .catch(error => {
        console.error("에러:", error);
      });
  };

  // 투표 팝업 닫기
  const closePopup = () => {
    setPopupOpen(false);
  };

  // 결과 팝업 열기 및 투표 처리
  const openResultPopup = () => {
    setPopupOpen(false);
  
    const votingData = {
      title: '제 02대 몰입형 선거 모의투표',
      memberId: 'koo',
      num: selectedButton
    };
  
    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/voted', votingData)
      .then(response => {
        if (response.data === 1) {
          // 투표가 성공적으로 완료되었을 때 알림
          // alert('투표가 성공적으로 완료되었습니다.'); 일단 보류
          updatePercentage(votingData.title);
        } 
      })
      .catch(error => {
        console.error('투표 중 에러가 발생했습니다', error);
      });
  
    // 중복 투표여도 결과 팝업 열기
    setResultPopupOpen(true);
  };
  

  // 투표 결과 팝업 닫기
  const closeResultPopup = () => {
    setResultPopupOpen(false);
  };

  // 후보 득표율 업데이트
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

  // 후보 목록 가져오기
  const fetchCandidates = () => {
    axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/findAll')
      .then(response => {
        const candidates = response.data.list;
        let [candidate1Percentage, candidate2Percentage, candidate3Percentage, candidate4Percentage] = candidates.map(candidate => candidate.percentage);
        console.log('후보1의 득표율:', candidate1Percentage);
        console.log('후보2의 득표율:', candidate2Percentage);
        console.log('후보3의 득표율:', candidate3Percentage);
        console.log('후보4의 득표율:', candidate4Percentage);

        setCandidate1Percentage(candidates[0].percentage);
        setCandidate2Percentage(candidates[1].percentage);
        setCandidate3Percentage(candidates[2].percentage);
        setCandidate4Percentage(candidates[3].percentage)
      })
      .catch(error => {
        console.error('후보 목록을 가져오는데 실패했습니다', error);
      });
  }

  // 후보 선택 버튼 핸들링
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

  // 후보 선택 버튼 렌더링
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

  // 팝업 컨텐츠
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
        <PopUpMok isOpen={isPopupOpen} onClose={closePopup} content={popupContent} />
      </div>
      <div>
        <ResultOfMok
          isOpen={isResultPopupOpen}
          onClose={closeResultPopup}
          percentages={{
            candidate1: candidate1Percentage,
            candidate2: candidate2Percentage,
            candidate3: candidate3Percentage,
            candidate4: candidate4Percentage,
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
          }}
        />
      </div>

      <SiblingFade />
    </div>
  );
}
