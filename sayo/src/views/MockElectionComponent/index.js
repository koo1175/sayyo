import React from "react";
// import WorldPlaces from "../WorldPlaces";
import SiblingFade from "../SiblingFade";

export default function MockElectionComponent() {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <div style={{ marginTop: '3%' }}>
                <img
                    alt="titlemok"
                    src="/img/titlemok.png"
                    style={{ width: '50%' }}
                />
            </div>
                <div style={{                }}>
                    {/* <div style={centerImageStyle}>
        <button
          onClick={goSecretPage} // 버튼 클릭 시 이 이벤트를 처리
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer'
          }}
        > */}
                    <img
                        alt="btnMok"
                        src="/img/btnMok.png"
                        style={{ width: '200px' }}
                    />
                    {/* </button> */}
                    {/* </div> */}
                </div>
                <SiblingFade />
        </div>
    );
}
