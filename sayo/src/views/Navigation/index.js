import * as React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Main from "../Main";
import OrganizationChart from "../OrganizationChart";
import Board from "../Board";
import Community from "../Community";
import AboutUs from "../AboutUs";
import Gyeonggi from '../Gyeonggi';
import MockElectionComponent from '../MockElectionComponent';
import Info from '../Info';
import News from '../News';
import Promise from '../Promise';

export default function Navigation() {

    return (
        <div>
            <BrowserRouter>
                <div>
                    <div style={{display:'flex', justifyContent: 'flex-start', marginLeft: '50px', marginTop: '10px', marginBottom: '10px'}}>
                    <Link to="/">
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
                    <Route path="/" element={<Main />} />
                    <Route path="/OrganizationChart" element={<OrganizationChart />} />
                    <Route path="/Board" element={<Board />} />
                    <Route path="/Community" element={<Community />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/Gyeonggi" element={<Gyeonggi />} />
                    <Route path="/MockElectionComponent" element={<MockElectionComponent />} />
                    <Route path="/Info" component={Info} />
                    <Route path="/Promise" component={Promise} />
                    <Route path="/News" component={News} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}