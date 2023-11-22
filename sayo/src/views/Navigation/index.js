import * as React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';

import AuthForm from "../AuthForm";

import Main from "../Main";
import OrganizationChart from "../OrganizationChart";
import Board from "../Board";
import Community from "../Community";
import AboutUs from "../AboutUs";
import Gyeonggi from '../Gyeonggi';
import MockElectionComponent from '../MockElectionComponent';

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



export default function Navigation() {
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

    return (
        <div>
            <BrowserRouter>
                <div>
                    <div style={{display:'flex', justifyContent: 'flex-start', marginLeft: '50px', marginTop: '10px', marginBottom: '10px'}}>
                    <Link to="/Main">
                        <img
                            alt="sayoLogo"
                            src="/img/sayoLogo.png"
                            height={80}
                        />
                    </Link>
                    </div>
                    <div style={{margin: '-65px 0px 0px 0px', fontSize: '20px', marginLeft: '230px'}}>
                    <Link to="/OrganizationChart" style={{textDecoration: 'none',  margin: '0px 200px 0px 0px',color: '#444444', fontWeight:'bolder'}}>
                        조직도
                    </Link>
                    <Link to="/Board"style={{textDecoration: 'none',  margin: '0px 150px 0px 0px',color: '#444444', fontWeight:'bolder'}}>게시판</Link>
                    <Link to="/Community"style={{textDecoration: 'none',  margin: '0px 150px 0px 0px',color: '#444444', fontWeight:'bolder'}}>커뮤니티</Link>
                    <Link to="/AboutUs" style={{textDecoration: 'none',  margin: '0px 150px 0px 0px',color: '#444444', fontWeight:'bolder'}}>AboutUs</Link>
                    </div>
                </div>
                <Routes>                    

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

                    <Route path='/BoardDetail' element={<BoardDetail />} />
                    <Route path='/BoardWrite' element={<BoardWrite />} />
                    <Route path='/BoardEdit' element={<BoardEdit/>} />

                </Routes>
            </BrowserRouter>
        </div>
    );
}