import React from "react";

const MyPageModify = () => {

    return (
        <div style={{ width: 1400, marginTop: '120px', marginLeft: '-75px' }}>
            <div className="member-info-container">
                <div className="page-title">
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: -150 }}>
                        <h2>회원정보 수정</h2>
                    </div>
                    <hr style={{ width: 950, marginLeft: -150 }} />
                </div>
                <div className="section">
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: -150, marginTop: -70 }}>
                        <h3>회원정보 수정</h3>
                    </div>
                    <div style={{ marginLeft: -150 }}>
                        <table className='mypage-detail-table' style={{ textAlign: 'left', width: 950, borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>
                            <tr style={{ borderBottom: '0.5px solid #d9d9d9' }}>
                                <td style={{ backgroundColor: '#F5F5F5', width: 200, fontWeight: 'bold' }}>이름</td>
                                <td className='mypage-detail-td' style={{ backgroundColor: '#fff' }}>한승주</td>
                            </tr>
                            <tr style={{ borderBottom: '0.5px solid #d9d9d9' }}>
                                <td style={{ backgroundColor: '#F5F5F5', width: 200, fontWeight: 'bold' }}>아이디</td>
                                <td className='mypage-detail-td' style={{ backgroundColor: '#fff' }}>1x1x17@naver.com</td>
                            </tr>
                            <tr style={{ borderBottom: '0.5px solid #d9d9d9', width: 100 }}>
                                <td style={{ backgroundColor: '#F5F5F5', width: 200, fontWeight: 'bold' }}>닉네임</td>
                                <td className='mypage-detail-td' style={{ backgroundColor: '#fff' }}>전설의 반지</td>
                            </tr>
                            <tr style={{ borderBottom: '0.5px solid #d9d9d9', width: 100 }}>
                                <td style={{ backgroundColor: '#F5F5F5', width: 200, fontWeight: 'bold' }}>휴대전화번호</td>
                                <td className='mypage-detail-td' style={{ backgroundColor: '#fff' }}>010-9212-3615</td>
                            </tr>
                            <tr style={{ borderBottom: '0.5px solid #d9d9d9', width: 100 }}>
                                <td style={{ backgroundColor: '#F5F5F5', width: 200, fontWeight: 'bold' }}>비밀번호</td>
                                <td className='mypage-detail-td' style={{ backgroundColor: '#fff' }}>
                                    <button className="cancel-button2" style={{ height: 30, width: 110, fontSize: 15 }}>비밀번호 수정</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ backgroundColor: '#F5F5F5', width: 200, fontWeight: 'bold' }}>비밀번호 확인</td>
                                <td className='mypage-detail-td' style={{ backgroundColor: '#fff' }}>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: -150 }}>
                        <h3>선택정보</h3>
                    </div>

                    <div style={{ marginLeft: -150, marginTop: -10 }}>
                        <table className='mypage-detail-table' style={{ textAlign: 'left', width: 950, borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>
                            <tr style={{ borderBottom: '0.5px solid #d9d9d9' }}>
                                <td style={{ backgroundColor: '#F5F5F5', width: 200, fontWeight: 'bold' }}>주소</td>
                                <td className='mypage-detail-td' style={{ backgroundColor: '#fff' }}>
                                    <input style={{ width: 300, height: 25, borderRadius: 'none', border: '0.5px solid #000' }}></input>
                                    <button className="cancel-button2" style={{ height: 30, width: 85, fontSize: 15, marginLeft: 10 }}>주소검색</button>
                                </td>
                            </tr>
                            <tr style={{ borderBottom: '0.5px solid #d9d9d9' }}>
                                <td style={{ backgroundColor: '#F5F5F5', width: 200, fontWeight: 'bold' }}>상세주소</td>
                                <td className='mypage-detail-td' style={{ backgroundColor: '#fff' }}>
                                    <input style={{ width: 300, height: 25, borderRadius: 'none', border: '0.5px solid #000' }}></input>
                                    <br />
                                    <div style={{ fontSize: 12, marginTop: 5 }}>도로명 상세주소 예시)8동 302호 (여의도동,00아파트) *단독주택의 경우 건물번호만 입력하십시오</div>
                                </td>
                            </tr>
                            <tr style={{ borderBottom: '0.5px solid #d9d9d9', width: 100 }}>
                                <td style={{ backgroundColor: '#F5F5F5', width: 200, fontWeight: 'bold' }}>이메일 주소</td>
                                <td className='mypage-detail-td' style={{ backgroundColor: '#fff' }}>
                                    <input style={{ width: 150, height: 25, borderRadius: 'none', border: '0.5px solid #000', marginRight: 3 }}></input>
                                    @
                                    <input style={{ width: 150, height: 25, borderRadius: 'none', border: '0.5px solid #000', marginLeft: 3 }}></input>
                                    <select id="email-dropdown"style={{ width: 150, height: 30, borderRadius: 'none', border: '0.5px solid #000', marginLeft: 3 }} >
                                        <option value="none">naver.com</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </select>
                                </td>
                            </tr>
                            <tr style={{ borderBottom: '0.5px solid #d9d9d9', width: 100 }}>
                                <td style={{ backgroundColor: '#F5F5F5', width: 200, fontWeight: 'bold' }}>휴대전화번호</td>
                                <td className='mypage-detail-td' style={{ backgroundColor: '#fff' }}>
                                <button className="cancel-button2" style={{ height: 30, width: 85, fontSize: 15, marginLeft: 10 }}>간편인증</button>
                                <input style={{ width: 70, height: 25, borderRadius: 'none', border: '0.5px solid #000', marginLeft: 5, marginRight: 5 }}></input>
                                -
                                <input style={{ width: 70, height: 25, borderRadius: 'none', border: '0.5px solid #000', marginLeft: 5 , marginRight: 5}}></input>
                                -
                                <input style={{ width: 70, height: 25, borderRadius: 'none', border: '0.5px solid #000', marginLeft: 5 }}></input>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="button-box">
                        <button className="confirm-button" style={{ marginLeft: 180 }}>수정</button>
                        <button className="cancel-button" style={{ marginLeft: 10 }}>취소</button>
                        <button className="cancel-button" style={{ marginLeft: 10, marginRight: 90 }}>탈퇴</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPageModify;