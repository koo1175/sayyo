import React, { useState } from "react";
import SiblingFade from "../SiblingFade";
import PopUpMok from "../PopUpMok";
import ResultOfMok from "../ResultOfMok";

export default function MockElectionComponent({ onClose }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isResultPopupOpen, setResultPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const openResultPopup = () => {
    setPopupOpen(false);
    setResultPopupOpen(true);
  };

  const closeResultPopup = () => {
    setResultPopupOpen(false);
  };

  const handleButtonClick = (buttonId) => {
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
            position: 'absolute',
            top: button.top,
            left: "78.5%",
            transform: "translate(-50%, 50%)",
            backgroundColor: "#F6E486",
            cursor: 'pointer',
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
      <container style={{ position: 'absolute', top: "0%", left: "0%", width: "100%", height: "100%" }}>
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
        <ResultOfMok isOpen={isResultPopupOpen} onClose={closeResultPopup} style={{ position: 'absolute', top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 3 }} />
      </div>

      <SiblingFade />
    </div>
  );
}
