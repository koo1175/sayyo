import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import './Navigation.css'
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll'; // 수정된 부분

const SubMenu = ({ isVisible }) => {
    const navigate = useNavigate();

    const gotoMyPage = () => {
        navigate(`/MyPage`);
    };

    const gotoAboutUs = () => {
        navigate('/AboutUs');
    }

    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsSubMenuVisible(true);
    };

    const handleMouseLeave = () => {
        setIsSubMenuVisible(false);
    };

    const gotoBoardList = () => {
        navigate(`/`);
        scroller.scrollTo('section3', { smooth: true, duration: 100, offset: -200 }); // 이 부분이 추가되었습니다.
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: 'calc(90px)',
                left: 0,
                zIndex: 999,
                backgroundColor: '#fff', // 배경색 변경
                width: '1980px',
                opacity: isVisible ? 1 : 0, // 보이는 상태에 따라 투명도 조절
                transition: 'opacity 0.5s', // 투명도 변화에 0.5초 동안의 transition 효과 적용
            }}
            >
            <div
                style={{
                    backgroundColor: '#fff',
                    borderTop: 'none',
                    width: '1200px',
                    height: '150px',
                }}
            >
                {/* 서브메뉴 내용 */}
                <div className='subMenu' style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', marginTop:'2%', marginLeft:'50%', width:'760px'}}>
                    <div className='subNav' style={{ flexBasis: '16%' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    · 국회의원
                    <Link to="/">
                            <div className='subNav' rel="noopener noreferrer" target="_blank" style={{ flexBasis: '16%', marginTop:'15%' }} onMouseEnter={(e) => e.target.style.color = 'blue'} onMouseLeave={(e) => e.target.style.color = 'black'} onClick={gotoBoardList}>· 지역시장</div>
                    </Link>
                </div>
                    <div className='subNav' style={{ flexBasis: '16%', marginRight:'2%' }} onMouseEnter={(e) => e.target.style.color = 'blue'} onMouseLeave={(e) => e.target.style.color = 'black'} onClick={gotoMyPage}>
                        · 고객센터
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SubMenu;