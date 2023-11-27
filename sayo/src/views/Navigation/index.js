import * as React from 'react';
import './Navigation.css';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Main from "../Main";
import OrganizationChart from "../OrganizationChart";
import Board from "../Board";
import Community from "../Community";
import AboutUs from "../AboutUs";
import Gyeonggi from '../Gyeonggi';
import MockElectionComponent from '../MockElectionComponent';
import Politician from '../Politician';
import AuthForm from "../AuthForm";
import Test from '../Test';
import Chat from '../Chat';

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
                    <div style={{display:'flex', justifyContent: 'flex-start', marginRight: '5%', marginTop: '10px', marginBottom: '10px'}}>
                    <Link to="/Main">
                        <img
                            alt="sayoLogo"
                            src="/img/sayoLogo.png"
                            height={80}
                        />
                    </Link>
                    </div>
                    <div style={{margin: '-65px 0px 0px 0px', fontSize: '20px', marginRight: '20%'}}>
                        <Link to="/OrganizationChart" className="link">조직도</Link>
                        <Link to="/Board" className="link">게시판</Link>
                        <Link to="/Chat" className="link">커뮤니티</Link>
                        <Link to="/AboutUs" className="link">AboutUs</Link>
                    </div>
                </div>
                <Routes>
                    <Route path="/Test" element={<Test />} />
                    <Route path="/Chat" element={<Chat />} />
                    <Route path="/Main" element={<Main />} />
                    <Route path="/OrganizationChart" element={<OrganizationChart />} />
                    <Route path="/Board" element={<Board />} />
                    <Route path="/Community" element={<Community />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/Gyeonggi" element={<Gyeonggi />} />
                    <Route path="/MockElectionComponent" element={<MockElectionComponent />} />
                    <Route path="/Politician" element={<Politician />} />
                    
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
                </Routes>
            </BrowserRouter>
        </div>
    );
}