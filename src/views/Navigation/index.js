import * as React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Member from '../AdminPage/Member'
import AdminPage from '../AdminPage';
import Fullfillment from '../AdminPage/Fullfillment';

import './Search.css';
import AuthForm from "../AuthForm";

import Main from "../Main";
import OrganizationChart from "../OrganizationChart";
import Board from "../Board";
import Community from "../Community";
import AboutUs from "../AboutUs";
import Gyeonggi from '../Gyeonggi';
import MockElectionComponent from '../MockElectionComponent';

import MyPage from '../MyPage';

import InfoSu from '../SiblingFade/Info/suchan';
import PromiseSu from '../SiblingFade/Promise/suchan';
import NewsSu from '../SiblingFade/News/suchan';

import InfoHee from '../SiblingFade/Info/heeyeon';
import PromiseHee from '../SiblingFade/Promise/heeyeon';
import NewsHee from '../SiblingFade/News/heeyeon';

import InfoYoung from '../SiblingFade/Info/youngsil';
import PromiseYoung from '../SiblingFade/Promise/youngsil';
import NewsYoung from '../SiblingFade/News/youngsil';

import InfoSeung from '../SiblingFade/Info/seungju';
import PromiseSeung from '../SiblingFade/Promise/seungju';
import NewsSeung from '../SiblingFade/News/seungju';

import BoardWrite from '../Board/board/BoardWrite';
import BoardDetail from '../Board/board/BoardDetail';
import BoardEdit from '../Board/board/BoardEdit';
import BoardList from '../Board/board/BoardList';

import Test from '../Test';
import Search from '../Search';


// 공통 헤더 렌더링 함수
const renderCommonHeader = (currentDateTime) => (
    <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '55px', marginBottom: '10px' }}>
            <Link to="/Main">
                <img alt="sayoLogo" src="/img/sayoLogo.png" height={80} />
            </Link>
        </div>
        <div style={{ marginTop: '-75px', marginRight: '-200px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', fontSize: '20px' }}>
                <Link to="/AdminPage" style={{ textDecoration: 'none', marginTop: '-25px', marginLeft: '-200px', padding: '35px', color: '#444444', fontWeight: 'bolder' }}>
                    관리자 모드
                </Link>
            </div>
            <div style={{ marginTop: '-65px', fontSize: '20px', marginLeft: '380px' }}>
                <Link to="/OrganizationChart" style={{ textDecoration: 'none', marginRight: '150px', marginLeft: '-200px', color: '#444444', fontWeight: 'bolder' }}>
                    조직도
                </Link>
                <Link to="/Board" style={{ textDecoration: 'none', color: '#444444', fontWeight: 'bolder' }}>게시판</Link>
                <Link to="/Community" style={{ textDecoration: 'none', marginLeft: '250px', marginRight: '-150px', color: '#444444', fontWeight: 'bolder' }}>커뮤니티</Link>
                <Link to="/AboutUs" style={{ textDecoration: 'none', marginLeft: '250px', color: '#444444', fontWeight: 'bolder' }}>AboutUs</Link>
                <span className='admin-clock' style={{ marginLeft: '100px' }}>{currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</span>
            </div>
        </div>
    </div>
);

// 페이지 설정 객체 배열
const pageConfigs = [
    { path: '/AdminPage', element: <AdminPage /> },
    { path: '/Fullfillment', element: <Fullfillment /> },
    { path: '/Member', element: <Member /> },
];


const localizer = momentLocalizer(moment);

export default function Navigation() {

    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const [searches, setSearches] = useState({});
    const [searchText, setSearchText] = useState('');
    const [popularKeywords, setPopularKeywords] = useState([]);
    // 캘린더
    const [events, setEvents] = useState([]);
    // 인기 검색어 하나씩
    const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
    // 인기 검색어 전체
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Replace the URL with your actual API URL
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/api/events')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    const events = response.data
                        .filter(e => e != null)
                        .map((e) => ({
                            ...e,
                            start: new Date(e.start),
                            end: new Date(e.end),
                            allDay: true, // 'allDay' 속성을 추가하세요.
                        }));

                    setEvents(events);
                }
            });
    }, []);

    function CustomToolbar({ label, onNavigate }) {
        return (
            <div>
                <button onClick={() => onNavigate('PREV')}>◀</button>
                <span>{label}</span>
                <button onClick={() => onNavigate('NEXT')}>▶</button>
            </div>
        );
    }

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

    const getPopularSearches = () => {
        return Object.entries(searches)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([keyword]) => keyword);
    };

    const isAuth = window.location.pathname === '/';
    // If it's the home page, return null to render nothing
    if (isAuth) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthForm />} />
                </Routes>
            </BrowserRouter>
        );
    }

    // 현재 페이지에 대한 설정 찾기
    const currentPageConfig = pageConfigs.find(config => window.location.pathname === config.path);

    // 만약 설정이 존재한다면 해당 페이지 렌더링
    if (currentPageConfig) {
        return (
            <BrowserRouter>
                <div style={{ marginTop: '-30px', marginBottom: '-30px' }}>
                    {renderCommonHeader(currentDateTime)}
                    <Routes>
                        <Route {...currentPageConfig} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }


    return (
        <div>
            <BrowserRouter>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
                        <Link to="/Main">
                            <img
                                alt="sayoLogo"
                                src="/img/sayoLogo.png"
                                height={80}
                            />
                        </Link>
                    </div>
                    <div style={{ marginTop: '-65px', fontSize: '20px', marginLeft: '230px' }}>
                        <Link to="/OrganizationChart" style={{ textDecoration: 'none', marginRight: '150px', marginLeft: '-200px', color: '#444444', fontWeight: 'bolder' }}>
                            조직도
                        </Link>
                        <Link to="/Board" style={{ textDecoration: 'none', margin: '0px 100px 0px 0px', color: '#444444', fontWeight: 'bolder' }}>게시판</Link>
                        <Link to="/Community" style={{ textDecoration: 'none', marginLeft: '150px', color: '#444444', fontWeight: 'bolder' }}>커뮤니티</Link>
                        <Link to="/AboutUs" style={{ textDecoration: 'none', marginLeft: '150px', color: '#444444', fontWeight: 'bolder' }}>AboutUs</Link>
                    </div>
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
                <div>
                    <Calendar
                        style={{ height: 100, width: 350 }}
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        defaultView='day'
                        timeslots={1}
                        min={new Date(2023, 10, 10, 0, 0)} // 0시
                        max={new Date(2023, 10, 10, 0, 1)} // 0시 1분
                        date={new Date()}
                        components={{
                            toolbar: () => null, // 툴바를 비활성화 합니다.
                        }}
                    />
                </div>
                <Routes>

                    <Route path='/MyPage' element={<MyPage />} />

                    <Route path="/Main" element={<Main />} />
                    <Route path="/OrganizationChart" element={<OrganizationChart />} />
                    <Route path="/Board" element={<Board />} />
                    <Route path="/Community" element={<Community />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/Gyeonggi" element={<Gyeonggi />} />
                    <Route path="/MockElectionComponent" element={<MockElectionComponent />} />

                    <Route path="/InfoSu" component={InfoSu} />
                    <Route path="/PromiseSu" component={PromiseSu} />
                    <Route path="/NewsSu" component={NewsSu} />

                    <Route path="/InfoHee" component={InfoHee} />
                    <Route path="/PromiseHee" component={PromiseHee} />
                    <Route path="/NewsHee" component={NewsHee} />

                    <Route path="/InfoYoung" component={InfoYoung} />
                    <Route path="/PromiseYoung" component={PromiseYoung} />
                    <Route path="/NewsYoung" component={NewsYoung} />

                    <Route path="/InfoSeung" component={InfoSeung} />
                    <Route path="/PromiseSeung" component={PromiseSeung} />
                    <Route path="/NewsSeung" component={NewsSeung} />

                    <Route path='/BoardList' element={<BoardList />} />
                    <Route path='/BoardDetail/:num' element={<BoardDetail />} />
                    <Route path='/BoardWrite' element={<BoardWrite />} />
                    <Route path='/BoardEdit/:num' element={<BoardEdit />} />

                    <Route path="/Test" element={<Test />} />
                    <Route path="/Search" element={<Search />} />

                </Routes>
            </BrowserRouter>
        </div>
    );
}