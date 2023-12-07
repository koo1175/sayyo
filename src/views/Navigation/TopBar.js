import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import * as React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import SubMenu from './SubMenu';

import './Search.css';

const TopBar = () => {

    
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const [searches, setSearches] = useState({});
    const [searchText, setSearchText] = useState('');
    const [popularKeywords, setPopularKeywords] = useState([]);
    // 인기 검색어 하나씩
    const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
    // 인기 검색어 전체
    const [isHovered, setIsHovered] = useState(false);
    //캘린더
    const [eventTitle, setEventTitle] = useState('');
    const [events, setEvents] = useState([]);
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

    // 마우스가 공지사항 링크에 올라갔을 때 서브메뉴를 보이도록 하는 함수
    const handleMouseEnter = () => {
        setIsSubMenuVisible(true);
    };

    // 마우스가 공지사항 링크 또는 서브메뉴 영역에서 벗어났을 때 서브메뉴를 숨기도록 하는 함수
    const handleMouseLeave = () => {
        setIsSubMenuVisible(false);
    };

    useEffect(() => {
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/api/events')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    const events = response.data
                        .filter(e => e != null)
                        .map((e) => ({
                            ...e,
                            start: new Date(e.start),
                            end: new Date(e.end),
                        }));

                    setEvents(events);

                    const todayEvents = events.filter(e =>
                        moment(e.start).isSame(moment(), 'day')
                    );

                    if (todayEvents.length > 0) {
                        const titles = todayEvents.map(event => event.title).join(', ');
                        setEventTitle(`오늘의 일정: ${titles}`);
                    } else {
                        setEventTitle('오늘의 일정이 없습니다.');
                    }
                }
            });
    }, []);



    //인기검색어 get
    useEffect(() => {
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/search/popular') // 실시간 인기 검색어를 가져오는 API endpoint
            .then(response => {
                setPopularKeywords(response.data.list.map(item => item.keyword)); // 객체 내부의 keyword를 사용
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    //인기검색어 애니메이션
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentKeywordIndex((currentKeywordIndex + 1) % 5);
        }, 4000);
        return () => clearInterval(interval);
    }, [currentKeywordIndex]);


    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every 1000 milliseconds (1 second)

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs once when the component mounts


    const handleSearch = (event) => {
        event.preventDefault();

        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/search/regist', {
            keyword: searchText
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        setSearches({
            ...searches,
            [searchText]: (searches[searchText] || 0) + 1
        });
        setSearchText('');
    };

    const navigate = useNavigate();

    const gotoMain = () => {
        navigate(`/Main`);
    };

    const gotoBoard = () => {
        navigate(`/Board`);
    };

    const gotoAboutUs = () => {
        navigate(`/AboutUs`);
    };

    const gotoMyPage = () => {
        navigate(`/MyPage`);
    };

    const gotoCommunity = () => {
        navigate(`/Community`);
    };

    const gotoMyCalinder = () => {
        navigate(`/Calendar`);
    };

    return (
        <div>
            {/* 여기부터 수정 */}
            <div style={{ position: 'absolute', left: '600px', top: '-30px' }}>
                <button onClick={gotoMain}>
                    <img alt="sayoLogo" src="/img/sayoLogo.png" height={80} />
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
                <div style={{ flexBasis: '17%' }}>
                    <button onClick={gotoMyCalinder}>
                        <div>{eventTitle}</div>
                    </button>
                </div>
                <div
                    style={{ flexBasis: '16%' }}
                    onMouseEnter={() => {
                        handleMouseEnter();
                        setIsSubMenuVisible(true); // SubMenu를 보이도록 추가
                    }}
                    onMouseLeave={handleMouseLeave}
                >
                    <button onClick={gotoBoard}
                        style={{
                            textDecoration: 'none',
                            color: '#444444',
                            fontWeight: 'bolder',
                            backgroundColor: 'none',
                        }}
                    >
                        공지사항
                    </button>
                    {/* SubMenu 컴포넌트 추가 */}
                    <SubMenu isVisible={isSubMenuVisible} />

                </div>
                <div style={{ flexBasis: '16%' }}
                    onMouseEnter={() => {
                        handleMouseEnter();
                        setIsSubMenuVisible(true);
                    }}
                    onMouseLeave={handleMouseLeave}>
                    <button onClick={gotoAboutUs}
                        style={{
                            textDecoration: 'none',
                            color: '#444444',
                            fontWeight: 'bolder',
                            backgroundColor: 'none',
                        }}
                    >세요 소개</button>
                    {/* SubMenu 컴포넌트 추가 */}
                    <SubMenu isVisible={isSubMenuVisible} />
                </div>
                {/* 로고 자리 */}
                <div style={{ flexBasis: '16%' }} />
                <div style={{ flexBasis: '16%' }}
                    onMouseEnter={() => {
                        handleMouseEnter();
                        setIsSubMenuVisible(true);
                    }}
                    onMouseLeave={handleMouseLeave}>
                    <button onClick={gotoCommunity}
                        style={{
                            textDecoration: 'none',
                            color: '#444444',
                            fontWeight: 'bolder',
                            backgroundColor: 'none',
                        }}>세상의 소리</button>

                    <SubMenu isVisible={isSubMenuVisible} />
                </div>
                <div style={{ flexBasis: '16%' }}
                    onMouseEnter={() => {
                        handleMouseEnter();
                        setIsSubMenuVisible(true);
                    }}
                    onMouseLeave={handleMouseLeave}>
                    <button onClick={gotoMyPage}
                        style={{
                            textDecoration: 'none',
                            color: '#444444',
                            fontWeight: 'bolder',
                            backgroundColor: 'none',
                        }}>MyPage</button>

                    <SubMenu isVisible={isSubMenuVisible} />
                </div>

                {/* 인기 검색어 자리 */}
                <div style={{ flexBasis: '16%' }} />
            </div>

            <div style={{ marginTop: '-40px' }}>
                <div style={{ position: 'absolute', right: 0 }}>
                    <span onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}>🔍</span>
                    {isSearchBarVisible && (
                        <form onSubmit={handleSearch}>
                            <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
                            <button type="submit">검색</button>
                        </form>
                    )}
                    <div
                        onMouseOver={() => setIsHovered(true)}
                        onMouseOut={() => setIsHovered(false)}
                        style={{ fontWeight: 'bold', color: '#444' }}
                    >
                        인기 검색어:
                        <div style={{ height: '25px', overflow: 'hidden' }}>
                            <TransitionGroup>
                                {!isHovered &&
                                    <CSSTransition
                                        key={currentKeywordIndex}
                                        timeout={1000}
                                        classNames="fade"
                                        unmountOnExit
                                    >
                                        <div>{currentKeywordIndex + 1}. {popularKeywords[currentKeywordIndex]}</div>
                                    </CSSTransition>
                                }
                            </TransitionGroup>
                        </div>
                        {isHovered && <ul style={{ listStyleType: 'none' }}>
                            {popularKeywords.slice(0, 5).map((keyword, index) => (
                                <li key={index}>{index + 1}. {keyword}</li>
                            ))}
                        </ul>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBar;