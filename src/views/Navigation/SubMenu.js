import { useNavigate } from "react-router-dom";

const SubMenu = ({ isVisible }) => {
    const navigate = useNavigate();

  const gotoBoardList = () => {
    navigate(`/Board`);
  };

  const gotoAboutUs = () => {
    navigate(`/AboutUs`);
  };

  const gotoMyPage = () => {
    navigate(`/MyPage`);
  };


    return (

        <div
            style={{
                display: isVisible ? 'block' : 'none',
                position: 'absolute',
                marginLeft: '200px',
                top: 'calc(10px)', // 조정된 top 값
                left: 0,
                zIndex: 999, // 다른 요소들보다 높은 zIndex
            }}
        >
            {/* 로고 영역 투명 처리 */}
            <div
                style={{
                    backgroundColor: 'rgba(240, 240, 240, 0)', // 알파 채널을 조절하여 투명도 설정
                    border: 'none',
                    width: '900px',
                    height: '40px',
                }}
            >

            </div>
            <div
                style={{
                    backgroundColor: '#fff',
                    border: '0px solid #ccc',
                    borderTop: 'none',
                    width: '900px',
                    height: '70px',
                }}
            >
                {/* 서브메뉴 내용 */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* 공지사항 자리 */}
                    <div style={{ flexBasis: '16%' }}>
                        <button onClick={gotoBoardList} style={{backgroundColor:'none'}}>게시판</button>
                    </div>
                    {/* 세요소개 자리 */}
                    <div style={{ flexBasis: '16%' }}>
                        <button onClick={gotoAboutUs}>About Us</button>
                    </div>

                    {/* 로고 자리 */}
                    <div style={{ flexBasis: '14%' }} />

                    {/* 세상의 소리 자리 */}
                    <div style={{ flexBasis: '16%' }}>
                        <button>국회의원</button>
                    </div>
                    {/* My Page 자리 */}
                    <div style={{ flexBasis: '18%' }}>
                        <button onClick={gotoMyPage}>내 정보</button>
                        <br/>
                        <button>1:1문의</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubMenu;
