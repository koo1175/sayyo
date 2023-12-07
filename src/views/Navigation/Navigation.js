import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/pages.css';
import './Navigation.css';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import axios from 'axios';
import SubMenu from './SubMenu';
import { ChatProvider } from '../ChatContext';

const Navigation = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    //인기검색어
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [popularKeywords, setPopularKeywords] = useState([]);

    useEffect(() => {
        const loginId = sessionStorage.getItem('loginId');
        if (loginId) {
            console.log(loginId);
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        // 세션 스토리지에서 로그인 ID 제거
        sessionStorage.removeItem('loginId');
    
    // 로그인 상태 업데이트
    setIsLoggedIn(false);
    };

    const handleFocus = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    
    const handleBlur = () => {
        setOpen(false);
    };

      // 인기 검색어 가져오기
    useEffect(() => {
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/search/popular')
            .then(response => {
                setPopularKeywords(response.data.list.map(item => item.keyword));
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
    const [isMouseWithinSubMenu, setIsMouseWithinSubMenu] = useState(false);

    const handleMouseEnterSubMenu = () => {
        isMouseWithinSubMenu(true);
    };

    const handleMouseLeaveSubMenu = () => {
        setIsMouseWithinSubMenu(false);
        setIsSubMenuVisible(false);
    };

    const handleMouseEnter = () => {
        setIsSubMenuVisible(true);
    };

    const handleMouseLeave = () => {
        if (!isMouseWithinSubMenu) {
            setIsSubMenuVisible(false);
        }
    };

    const handleClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav" style={{ backgroundColor: '#ffffff', zIndex: 1 }}>
            <div className="container px-4 px-lg-5"  style={{ display: 'flex', justifyContent: 'center', width: '100%' }} onMouseLeave={handleMouseLeave}>
                <Link to="/">
                    <img className="navbar-brand" src="img/sayoLogo.png" alt="Logo" width={80} style={{ marginLeft: isSearchOpen ? '20%' : '-300%%' }} />
                </Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul
                            className="navbar-nav ms-auto"
                            style={{ display: 'flex', justifyContent: 'center', width: '150%', marginRight: isSearchOpen ? '-4%' : '12%' }}
                            onMouseEnter={handleMouseEnter}
                        >
                            <li className="nav-item"><a className="nav-link" href="#about">세상의 소리</a></li>
                            <li className="nav-item"><a className="nav-link" href="/Board">공지사항</a></li>
                            <li className="nav-item"><a className="nav-link" href="/AboutUs">소개</a></li>
                            <li className="nav-item">
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '70px', marginRight: isSearchOpen ? '1%' : 0 }}>
                                    <img src="img/person.png" alt="Profile" style={{ marginRight: '-20%' }} />
                                    <a className="nav-link" href="/MyPage">내정보</a>
                                </div>
                            </li>
                        </ul>
                        <SubMenu
                            isVisible={isSubMenuVisible}
                            onMouseEnter={handleMouseEnter}
                        />
                    </div>
                    <>
                    {/* 검색어 창 */}
                    {isSearchOpen && (
                        <TextField
                        id="input-with-icon-textfield"
                        variant="standard"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={{ width: '300px' }}
                        />
                    )}
                    {/* 검색어아이콘 */}
                    <SearchIcon className="searchIcon" onClick={handleClick} style={{marginRight: isSearchOpen ? '-18%' : '-5%'}} />
                    {/* 인기검색어 */}
                    <Popper open={open} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 1 }}>
                        <div className='search' style={{ backgroundColor: '#ffffff', width: '230px', height: '130px', textAlign: 'center', borderRadius: '10px', marginLeft: '20%' }}>
                        <div style={{ textAlign: 'left', marginLeft: '10px', color: 'gray', padding: '10px' }}>
                            인기 검색어
                        </div>
                        {popularKeywords.slice(0, 3).map((keyword, index) =>
                            <div key={index}>
                            {index + 1}. {keyword}
                            </div>
                        )}
                        </div>
                    </Popper>
                    </>
                    {!isSearchOpen && (isLoggedIn ? 
                    <Button variant="contained" onClick={handleLogout} style={{marginLeft:'10%', marginRight:'-20%', backgroundColor:'#2DA7A7', width:'77px'}}>
                        Logout
                    </Button>
                    :
                    <Button variant="contained" component={Link} to="/login" style={{marginLeft:'10%', marginRight:'-20%', backgroundColor:'#2DA7A7'}}>
                        Login
                    </Button>
                    )}
            </div>
        </nav>
        
    )
}

export default Navigation
