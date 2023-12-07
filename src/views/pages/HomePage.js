import React, { useEffect, useState } from 'react';
import './pages.css';
import './pages2.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Link as ScrollLink, Element, scroller } from 'react-scroll';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import Chat from '../Chat/index'


const HomePage = () => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/laws/findNewEight')
            .then(response => {
                console.log(response.data.laws);
                setData(response.data.laws);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);



    const [showArrow, setShowArrow] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) { // 20px 스크롤하면
                window.removeEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너를 제거
                scroller.scrollTo('section1', { smooth: true, duration: 100, offset: -90 }); //세션2로 이동
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Navbar shrink function
        const navbarShrink = function () {
            const navbarCollapsible = document.body.querySelector('#mainNav');
            if (!navbarCollapsible) {
                return;
            }
            if (window.scrollY === 0) {
                navbarCollapsible.classList.remove('navbar-shrink')
            } else {
                navbarCollapsible.classList.add('navbar-shrink')
            }
        };

        // Shrink the navbar
        navbarShrink();

        // Shrink the navbar when page is scrolled
        document.addEventListener('scroll', navbarShrink);

        // Collapse responsive navbar when toggler is visible
        const navbarToggler = document.body.querySelector('.navbar-toggler');
        const responsiveNavItems = [].slice.call(
            document.querySelectorAll('#navbarResponsive .nav-link')
        );
        responsiveNavItems.map((responsiveNavItem) => {
            responsiveNavItem.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarToggler.click();
                }
            });
        });

        // Cleanup function
        return () => {
            document.removeEventListener('scroll', navbarShrink);
        };
    }, []);

    const [currentSection, setCurrentSection] = useState('section1');

    const handleSetActive = (to) => {
        setCurrentSection(to);
    };

    if (data.length === 0) {
        return <div></div> // or return null;
    }
    
    return (
        <>
        <div style={{ position: 'fixed', right: 30, top: '40%', zIndex: 9999 }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><ScrollLink to="section1" spy={true} offset={-window.innerHeight / 2} onSetActive={handleSetActive} style={{ display: 'block', margin: '10px 0', padding: '5px', background: currentSection === 'section1' ? 'white' : 'rgba(211, 211, 211, 0.5)', textDecoration: 'none', textAlign: 'center', borderRadius: '50%', width: '15px', height: '15px' }} smooth={true} duration={100}></ScrollLink></li>
                <li><ScrollLink to="section2" spy={true} offset={-90} onSetActive={handleSetActive} style={{ display: 'block', margin: '10px 0', padding: '5px', background: currentSection === 'section2' ? 'white' : 'rgba(211, 211, 211, 0.5)', textDecoration: 'none', textAlign: 'center', borderRadius: '50%', width: '15px', height: '15px' }} smooth={true} duration={100}></ScrollLink></li>
                <li><ScrollLink to="section3" spy={true} offset={-200} onSetActive={handleSetActive} style={{ display: 'block', margin: '10px 0', padding: '5px', background: currentSection === 'section3' ? 'white' : 'rgba(211, 211, 211, 0.5)', textDecoration: 'none', textAlign: 'center', borderRadius: '50%', width: '15px', height: '15px' }} smooth={true} duration={100}></ScrollLink></li>
                <li><ScrollLink to="section4" spy={true} offset={-90} onSetActive={handleSetActive} style={{ display: 'block', margin: '10px 0', padding: '5px', background: currentSection === 'section4' ? 'white' : 'rgba(211, 211, 211, 0.5)', textDecoration: 'none', textAlign: 'center', borderRadius: '50%', width: '15px', height: '15px' }} smooth={true} duration={100}></ScrollLink></li>
            </ul>
        </div>
        <Element name="section1" className="section">
            <div id="section1" className="section" >
                <header className="masthead">
                    <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                        <div className="d-flex justify-content-center">
                            {/* <div className="text-center">
                                <img src="/img/page-first-logo.png" className="mount1" alt="Description" />
                            </div> */}
                        </div>
                        <div style={{ position: 'absolute', marginTop:'40%'}}>
                            {showArrow && 
                                <ScrollLink 
                                to="section2" 
                                smooth={true} 
                                duration={100} 
                                offset={-90} // 여기에 offset prop을 추가하였습니다.
                                >
                                <img src="/img/chevron-down.png" className="blink" alt="Scroll down" />
                                </ScrollLink>
                            }
                        </div>
                    </div>
                </header>
            </div>
        </Element>
        <Element name="section2" className="section">
            <div id="section2" className="section" style={{marginTop:'10%'}}>
                <section className="about-section text-center" id="about" >
                    <div className="container px-4 px-lg-5 d-flex" style={{ display:'flex'}}>
                        <img src='img/page-second-logo1.png' style={{position: 'absolute', marginLeft:'-8%', marginTop:'-8%', width:'180px'}}/>
                        
                        <a href={data[currentIndex]?.link} target="_blank" rel="noopener noreferrer">
                            <div className= "hoverEffect" style={{position: 'absolute', marginLeft:'-9%', marginTop:'-2%', width:'20%'}}>
                                <img src='img/page-second-logo2.png' style={{width:'100%'}}/>
                                <p className="YM" >{data[currentIndex]?.tryDate ? data[currentIndex].tryDate.split(".")[0] + "." + data[0].tryDate.split(".")[1] : 'Loading...'}</p>
                                <p className="DD" style={{ fontFamily: 'SCoreDream7' }} >
                                    {data[currentIndex]?.tryDate 
                                        ? (data[currentIndex].tryDate.split(".")[2].slice(1).length === 1 
                                            ? '0' + data[currentIndex].tryDate.split(".")[2].slice(1) 
                                            : data[currentIndex].tryDate.split(".")[2].slice(1)) 
                                        : 'Loading...'}
                                </p>
                                <p className="소관부처" style={{ fontFamily: 'SCoreDream5', color:'#17A6A6'}} >{data[currentIndex]?.changes}</p>
                                <p className="title" style={{ fontFamily: 'SCoreDream5'}} >{data[currentIndex]?.name}</p>
                                <p className="법정종류" style={{ fontFamily: 'SCoreDream5', color:'#777777'}} >{data[currentIndex]?.kindOfLaw}</p>
                            </div>
                        </a>


                        <a href={data[currentIndex+1]?.link} target="_blank" rel="noopener noreferrer">
                            <div className="hoverEffect" style={{position: 'absolute', marginLeft:'11%', marginTop:'-2%', width:'20%'}}>
                            <img src='img/page-second-logo2.png' style={{width:'100%'}}/>
                                <p className="YM" >{data[currentIndex+1].tryDate ? data[currentIndex+1].tryDate.split(".")[0] + "." + data[0].tryDate.split(".")[1] : 'Loading...'}</p>
                                <p className="DD" style={{ fontFamily: 'SCoreDream7' }} >
                                    {data[currentIndex+1]?.tryDate 
                                        ? (data[currentIndex+1].tryDate.split(".")[2].slice(1).length === 1 
                                            ? '0' + data[currentIndex+1].tryDate.split(".")[2].slice(1) 
                                            : data[currentIndex+1].tryDate.split(".")[2].slice(1)) 
                                        : 'Loading...'}
                                </p>
                                <p className="소관부처" style={{ fontFamily: 'SCoreDream5', color:'#17A6A6'}} >{data[currentIndex+1].changes}</p>
                                <p className="title" style={{ fontFamily: 'SCoreDream5'}} >{data[currentIndex+1].name}</p>
                                <p className="법정종류" style={{ fontFamily: 'SCoreDream5', color:'#777777'}} >{data[currentIndex+1].kindOfLaw}</p>
                            </div>
                        </a>

                        <a href={data[currentIndex+2]?.link} target="_blank" rel="noopener noreferrer">
                            <div className="hoverEffect" style={{position: 'absolute', marginLeft:'31%', marginTop:'-2%', width:'20%'}}>
                            <img src='img/page-second-logo2.png' style={{width:'100%'}}/>
                                <p className="YM" >{data[currentIndex+2].tryDate ? data[currentIndex+2].tryDate.split(".")[0] + "." + data[0].tryDate.split(".")[1] : 'Loading...'}</p>
                                <p className="DD" style={{ fontFamily: 'SCoreDream7' }} >
                                    {data[currentIndex+2]?.tryDate 
                                        ? (data[currentIndex+2].tryDate.split(".")[2].slice(1).length === 1 
                                            ? '0' + data[currentIndex+2].tryDate.split(".")[2].slice(1) 
                                            : data[currentIndex+2].tryDate.split(".")[2].slice(1)) 
                                        : 'Loading...'}
                                </p>
                                <p className="소관부처" style={{ fontFamily: 'SCoreDream5', color:'#17A6A6'}} >{data[currentIndex+2].changes}</p>
                                <p className="title" style={{ fontFamily: 'SCoreDream5'}} >{data[currentIndex+2].name}</p>
                                <p className="법정종류" style={{ fontFamily: 'SCoreDream5', color:'#777777'}} >{data[currentIndex+2].kindOfLaw}</p>
                            </div>
                        </a>

                        <a href={data[currentIndex+3]?.link} target="_blank" rel="noopener noreferrer">
                            <div className="hoverEffect" style={{position: 'absolute', marginLeft:'51%', marginTop:'-2%', width:'20%'}}>
                            <img src='img/page-second-logo2.png' style={{width:'100%'}}/>
                                <p className="YM" >{data[currentIndex+3].tryDate ? data[currentIndex+3].tryDate.split(".")[0] + "." + data[0].tryDate.split(".")[1] : 'Loading...'}</p>
                                <p className="DD" style={{ fontFamily: 'SCoreDream7' }} >
                                    {data[currentIndex+3]?.tryDate 
                                        ? (data[currentIndex+3].tryDate.split(".")[2].slice(1).length === 1 
                                            ? '0' + data[currentIndex+3].tryDate.split(".")[2].slice(1) 
                                            : data[currentIndex+3].tryDate.split(".")[2].slice(1)) 
                                        : 'Loading...'}
                                </p>
                                <p className="소관부처" style={{ fontFamily: 'SCoreDream5', color:'#17A6A6'}} >{data[currentIndex+3].changes}</p>
                                <p className="title" style={{ fontFamily: 'SCoreDream5'}} >{data[currentIndex+3].name}</p>
                                <p className="법정종류" style={{ fontFamily: 'SCoreDream5', color:'#777777'}} >{data[currentIndex+3].kindOfLaw}</p>
                            </div>
                        </a>
                    </div>
                    
                    <div style={{position: 'absolute', width:'500px', marginLeft:'70%', marginTop:'-8%'}}>
                        <ArrowBackIosNewIcon className="icon" style={{fontSize: '30px', marginRight:'2%'}}  onClick={() => {if (currentIndex - 4 >= 0) setCurrentIndex(currentIndex - 4)}}/>
                        <HorizontalRuleIcon style={{fontSize: '25px', transform: 'rotate(90deg)'}}/>
                        <ArrowForwardIosIcon className="icon" style={{fontSize: '30px', marginLeft:'2%'}} onClick={() => {if (currentIndex + 4 < 8) setCurrentIndex(currentIndex + 4)}}/>
                        <AddCircleIcon className="plusIcon" style={{fontSize: '50px' , marginLeft:'3%', }}/>
                    </div>
                </section>
            </div>
        </Element>
        <Element name="section3" className="section">
            <div id="section3" className="section">
                <section class="projects-section bg-light" id="projects">
                    <div className="container px-4 px-lg-5 button" style={{marginTop:'-2%', marginLeft:'20%'}}>
                        <button className="btn-hover color-1" style={{marginRight:'5%' , backgroundImage: 'linear-gradient(to right, #b7b7b7, #808080, #555555, #0181C9, #0181C9, #C2002F, #54AE6C)'}}>서울특별시</button>
                        <Link to="/Gyeonggi#section1">
                        <button 
                            className="btn-hover color-1" 
                            style={{marginRight:'5%', backgroundImage: 'linear-gradient(to right, #b7b7b7, #555555, #2A9837, #104094)' }}
                        >경기도</button>
                        </Link>
                        <button className="btn-hover color-1"style={{backgroundImage: 'linear-gradient(to right, #b7b7b7, #555555, #E60A34, #6E6D70)' }} >강원특별자치도</button>
                    </div>
                    <div className="container px-4 px-lg-5 button" style={{marginTop:'-4%', marginLeft:'10%', display: 'flex'}}>
                        <button className="btn-hover color-1" style={{marginRight:'6%' , backgroundImage: 'linear-gradient(to right, #b7b7b7, #555555, #01A0C7, #0B419B)'}}>세종특별자치시</button>
                        <button className="btn-hover color-1" style={{marginRight:'6%' , backgroundImage: 'linear-gradient(to right, #b7b7b7, #808080, #555555, #ED6B00, #ED6B00, #00905F)'}}>제주특별자치도</button>
                        <button className="btn-hover color-1" style={{marginRight:'6%', backgroundImage: 'linear-gradient(to right, #b7b7b7, #555555, #00A4A5, #754A9C)'}}>충청북도</button>
                    </div>
                    <div className="container px-4 px-lg-5 button" style={{marginTop:'-15.7%', marginLeft:'46%'}}>
                        <button className="btn-hover color-1" style={{backgroundImage: 'linear-gradient(to right, #b7b7b7, #555555, #0082CC, #A34E94)'}}>충청남도</button>
                    </div>
                    <div className="container px-4 px-lg-5 button" style={{marginTop:'-4%', marginLeft:'10%', display: 'flex'}}>
                        <button className="btn-hover color-1" style={{marginRight:'6%' , backgroundImage: 'linear-gradient(to right, #b7b7b7, #555555, #8FBA1E, #D2081E)'}}>전라북도</button>
                        <button className="btn-hover color-1" style={{marginRight:'6%' , backgroundImage: 'linear-gradient(to right, #b7b7b7, #555555, #41B758, #F68D3D)'}}>전라남도</button>
                        <button className="btn-hover color-1" style={{marginRight:'6%', backgroundImage: 'linear-gradient(to right, #b7b7b7, #555555, #014099, #E60021)'}}>경상북도</button>
                    </div>
                    <div className="container px-4 px-lg-5 button" style={{marginTop:'-15.7%', marginLeft:'46%'}}>
                        <button className="btn-hover color-1" style={{backgroundImage: 'linear-gradient(to right, #b7b7b7, #555555, #014DA1, #F6AC01)'}}>경상남도</button>
                    </div>
                </section>
            </div>
        </Element>

        <Element name="section4" className="section">
            <div id="section4" className="section">
                <section class="signup-section" id="signup">
                    <div class="container px-4 px-lg-5">
                        <div class="row gx-4 gx-lg-5">
                            <div class="col-md-10 col-lg-8 mx-auto text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <h1 style={{fontSize:'50px'}}>Are You Ready?</h1>
                                <img src="/img/loading-unscreen.gif" alt="Loading..." style={{marginTop: '-100px'}}/>
                                <Link to="/quizpage">
                                    <img src="/img/btn_start.png" alt="startbutton" style={{width: '150px', height: '75px', marginTop: '-50%'}} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <footer class="footer bg-white small text-center text-black-50">
                        <div class="container px-4 px-lg-5">Copyright &copy; Your Website 2023</div>
                    </footer>
                </div>
            </div>
        </Element>
        </>
    )
    
}

export default HomePage;
