import * as React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import AdminPage from '../AdminPage';

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

const localizer = momentLocalizer(moment);

export default function Navigation() {
    const isAuth = window.location.pathname === '/';
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const [searches, setSearches] = useState({});
    const [searchText, setSearchText] = useState('');
    const [popularKeywords, setPopularKeywords] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Replace the URL with your actual API URL
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/api/events')
            .then((response) => {
                const events = response.data.map((e) => ({
                    ...e,
                    start: new Date(e.start),
                    end: new Date(e.end),
                }));

                setEvents(events);
            });
    }, []);

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


    return (
        <div>
            <BrowserRouter>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '50px', marginTop: '10px', marginBottom: '10px' }}>
                        <Link to="/Main">
                            <img
                                alt="sayoLogo"
                                src="/img/sayoLogo.png"
                                height={80}
                            />
                        </Link>
                    </div>
                    <div style={{ margin: '-65px 0px 0px 0px', fontSize: '20px', marginLeft: '230px' }}>
                        <Link to="/OrganizationChart" style={{ textDecoration: 'none', margin: '0px 200px 0px 0px', color: '#444444', fontWeight: 'bolder' }}>
                            조직도
                        </Link>
                        <Link to="/Board" style={{ textDecoration: 'none', margin: '0px 150px 0px 0px', color: '#444444', fontWeight: 'bolder' }}>게시판</Link>
                        <Link to="/Community" style={{ textDecoration: 'none', margin: '0px 150px 0px 0px', color: '#444444', fontWeight: 'bolder' }}>커뮤니티</Link>
                        <Link to="/AboutUs" style={{ textDecoration: 'none', margin: '0px 150px 0px 0px', color: '#444444', fontWeight: 'bolder' }}>AboutUs</Link>
                        <span onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}>🔍</span>
                        {isSearchBarVisible && (
                            <form onSubmit={handleSearch}>
                                <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
                                <button type="submit">검색</button>
                            </form>
                        )}
                        <div>
                            인기 검색어:
                            <ul>
                                {popularKeywords.map((keyword, index) => (
                                    <li key={index}>{keyword}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div style={{ height: 500, marginTop: 20 }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </div>
                <Routes>

                    <Route path='/AdminPage' element={<AdminPage/>}/>

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
