import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AuthBtnSpace() {
  const [selectedTab, setSelectedTab] = useState("로그인");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const containerStyle = {
    width: '100%',
    height: '30%',
    border: '0px solid #000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '30px',
    padding: '0 5px',
  };

  const MyStyle = {
    marginLeft: '10px',
    marginRight: '10px',
  };

  const buttonStyle = {
    textDecoration: 'none',
    margin: '0px 150px 0px 0px',
    cursor: 'pointer', // Set cursor to pointer
  };

  return (
    <div style={containerStyle}>
      <Link to="/Auth"> {/* Link to the /Auth route */}
        <button
          onClick={() => handleTabClick(selectedTab === "로그인" ? "로그아웃" : "로그인")}
          style={buttonStyle}
        >
          {selectedTab === "로그인" ? "로그인" : "로그아웃"}
        </button>
      </Link>
      <span style={MyStyle}>MY</span>
    </div>
  );
}