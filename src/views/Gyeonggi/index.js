import React, {useState, useRef, useEffect} from 'react';
import './Gyeonggi.css';
import { useNavigate } from 'react-router-dom';
import ShowSlideImage from '../ShowSlideImage';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // carousel 스타일 지정
import { Link as ScrollLink, Element, scroller } from 'react-scroll';

export default function Gyeonggi() {
    const navigate = useNavigate();
    const [queryText, setQueryText] = useState("경기도");

    useEffect(() => {
        const hash = window.location.hash; // URL의 해시 값을 가져옵니다.
        
        if (hash) {
          // 해시 값이 있으면 해당 섹션으로 스크롤합니다.
            scroller.scrollTo(hash.slice(1), {
            duration: 600,
            smooth: true,
            });
        }
    }, []);

    const handleClick = (path, text) => {
        navigate(path, { state: { text } });
    }
    
    const element = useRef<HTMLDivElement>(null);
    const onMoveBox = () => {
        element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const [searchTerm, setSearchTerm] = useState("");

    const [cities, setCities] = useState(['동두천', '안산', '고양', '과천', '의왕', '구리', '남양주', '김포', '화성', '광주', 
                                        '양주', '포천', '여주', '안성', '오산', '시흥', '군포', '하남', '용인', '파주', '이천', 
                                        '수원', '성남', '의정부', '안양', '부천', '광명', '평택']);


    return (
        <div className="outer" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', gap: '20px'}}>
            <img src="img/경기도1.png" style={{width: 200, position:'absolute', zIndex:1, top:200, left:1220}} />
            <img src="img/경기도2.png" style={{position:'absolute', width:80, top:135, left:210, zIndex:1}} />
            <div className='cities' style={{marginLeft:'10%'}}>
            <Element name="section1" className="section">
            <div className='map' style={{ marginLeft:'-15%'}}>
                <div style={{marginTop:'1%', marginRight:'58%'}}>
                    <img alt="경기도 text" src={'/img/Gyeonggy-fonts.png'} style={{width:200}}/>
                </div>
            <svg className="myPath2" viewBox="0 90 800 800" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute', top:350, left:-250}}>
                <defs>
                    <filter id="dropshadow">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                        <feOffset dx="0" dy="0" result="offsetblur" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="dropshadow2">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" />
                        <feOffset dx="1" dy="1" result="offsetblur" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <g filter="url(#dropshadow)">
                <path id="CD41150" className="OUTLINE" d="M 370 323 l 3 1 2 2 2 1 2 3 3 1 3 2 1 2 -1 3 -3 0 -4 2 0 4 -1 5 -1 2 -3 2 -1 3 -2 2 -3 2 -2 0 -4 2 -1 3 -4 -1 -5 3 -2 1 0 0 -2 -3 -2 -1 0 0 -2 1 -2 -2 -2 -2 -4 0 1 -2 -1 -2 -1 -4 0 -4 -2 -4 -1 -1 0 -4 1 -2 0 -1 0 0 -1 -2 0 -3 3 -2 2 -2 1 0 1 1 1 0 1 0 1 0 2 0 2 0 2 1 5 1 4 -1 2 -1 3 -2 3 -2 2 -1 z "
                        onClick={() => handleClick('/Politician', '의정부')} />
                    <path id="CD41111"  className="OUTLINE" d="M 335 531 l 3 1 3 2 0 2 0 1 0 1 2 3 1 4 -2 5 -1 4 2 5 -4 1 -2 1 -3 1 -4 0 -1 -1 -1 0 -2 0 -2 0 -1 0 0 0 0 0 0 0 -1 -1 -5 2 -1 -4 -3 -3 2 -2 1 -3 0 -4 1 -5 4 1 3 -2 3 -2 3 -1 2 -2 z "
                        onClick={() => handleClick('/Politician', '수원')} />
                    <path id="CD41111" className="OUTLINE" d="M 303 554 l 5 1 5 0 3 3 1 4 4 1 2 1 0 1 0 2 3 1 1 2 1 0 0 0 2 3 4 -1 2 1 0 0 2 0 2 2 3 2 1 3 -1 5 -2 2 -3 2 -1 3 -2 0 -1 -1 -1 0 -1 0 -2 -1 -1 1 -1 0 0 0 0 0 -2 -2 -4 -1 -5 1 -2 -3 -3 -1 -1 -4 -1 -2 -2 -2 -4 -1 -3 -4 -1 -5 1 -3 1 -2 2 -4 z "
                        onClick={() => handleClick('/Politician', '수원')} />
                    <path id="CD41111" className="OUTLINE" d="M 343 559 l 1 4 1 0 0 1 0 1 0 2 -2 1 0 4 0 5 -3 -2 -2 -2 -2 0 0 0 -2 -1 -4 1 -2 -3 0 0 -1 0 -1 -2 -3 -1 0 -2 0 -1 -2 -1 -4 -1 5 -2 1 1 0 0 0 0 0 0 1 0 2 0 2 0 1 0 1 1 4 0 3 -1 2 -1 z "
                        onClick={() => handleClick('/Politician', '수원')} />
                    <path id="CD41111" className="OUTLINE" d="M 347 548 l 0 -1 1 1 3 1 1 5 0 3 3 1 5 0 3 0 0 2 0 2 -2 1 -4 1 0 1 0 0 -2 2 -1 2 0 1 2 2 2 2 0 -1 0 0 2 -1 1 4 -1 4 -4 2 -2 1 0 0 0 1 -1 2 -3 2 -2 0 -3 -1 -1 -2 1 -3 0 -1 -1 1 0 1 0 -3 -1 -3 0 -5 0 -4 2 -1 0 -2 0 -1 0 -1 -1 0 -1 -4 -2 -5 1 -4 2 -5 2 2 z "
                        onClick={() => handleClick('/Politician', '수원')} />
                    <path id="CD41131" className="OUTLINE" d="M 384 471 l 4 1 2 1 3 0 1 1 2 -1 0 2 -4 5 -3 6 -3 1 -4 3 -2 1 -2 0 -3 2 0 4 -1 4 -3 3 -1 0 0 0 0 0 -1 -1 -2 1 -1 0 0 0 -2 1 -2 3 -1 0 -1 0 -1 1 -1 0 -1 -1 -1 0 -1 0 -3 -1 -5 -2 -2 -1 1 -3 -1 -1 0 -1 0 -1 0 -1 0 -1 0 -1 0 -1 2 -2 5 1 4 -1 1 -3 3 -2 2 -1 1 -2 2 -4 3 -2 2 -1 2 0 1 1 2 -1 3 -2 2 -1 0 -1 0 0 z "
                        onClick={() => handleClick('/Politician', '성남')} />
                    <path id="CD41131" className="OUTLINE" d="M 398 472 l 1 4 2 3 2 1 1 4 0 4 0 5 -1 3 -2 2 -2 2 -2 0 1 1 -1 2 -2 2 -2 -1 -2 -1 -5 -2 -3 -1 -2 -1 -3 0 -3 0 -1 2 1 -4 0 -4 3 -2 2 0 2 -1 4 -3 3 -1 3 -6 4 -5 0 -2 z "
                        onClick={() => handleClick('/Politician', '성남')} />
                    <path id="CD41131" className="OUTLINE" d="M 358 509 l 1 0 1 -1 1 0 1 0 2 -3 2 -1 0 0 1 0 2 -1 1 1 0 0 0 0 1 0 3 -3 1 -2 3 0 3 0 2 1 3 1 5 2 2 1 2 1 -1 6 2 4 -3 2 0 0 0 0 -2 2 -1 3 -2 2 -2 2 -4 2 -2 3 0 1 1 1 1 4 -4 1 -2 1 -2 0 -2 0 -1 0 0 0 -2 -2 -2 -2 0 0 -1 0 -1 -2 -4 -2 -3 0 -2 -3 -4 -2 -3 0 -2 -3 -4 -1 -2 -1 -1 -1 1 -3 1 -3 1 -4 1 -4 3 -1 5 2 3 1 1 0 1 0 z "
                        onClick={() => handleClick('/Politician', '성남')} />
                    
                    <path id="CD41171" className="OUTLINE" d="M 304 486 l 1 2 3 1 1 4 -1 4 -3 2 -2 1 -2 2 0 4 1 2 2 1 2 3 0 1 -1 3 1 1 0 0 0 1 -2 0 -5 0 -4 1 -2 4 -1 2 -3 2 -1 -1 -1 -3 -1 -4 -3 -1 -1 -4 -1 -4 0 -4 -1 -2 -1 -2 3 0 3 -1 2 -4 1 -2 1 -1 -1 -1 1 -1 1 -3 4 0 4 -2 2 -3 z "
                        onClick={() => handleClick('/Politician', '안양')} />
                    <path id="CD41171" className="OUTLINE" d="M 315 488 l 0 4 -1 2 0 2 3 3 2 1 0 2 3 4 -1 4 -2 2 -1 3 -2 4 -1 5 -2 1 -4 -2 -2 -4 -2 -3 1 -3 0 -1 -2 -3 -2 -1 -1 -2 0 -4 2 -2 2 -1 3 -2 1 -4 -1 -4 4 -1 z "
                        onClick={() => handleClick('/Politician', '안양')} />
                    <path id="CD41190" className="OUTLINE" d="M 260 455 l -1 3 -2 1 0 2 3 2 -1 3 -1 3 -1 1 3 0 4 1 -1 4 -1 2 -1 1 -3 -1 -1 0 -1 1 -1 -1 -4 -1 -4 -2 -2 -2 -2 0 -5 -2 -2 -1 -3 -3 -3 -1 -1 -3 1 -4 -1 -4 2 -3 3 -1 2 -1 0 -4 1 -5 0 -2 0 0 0 -2 2 -3 1 0 2 2 5 1 3 2 0 1 2 -1 0 0 0 0 3 -1 2 1 3 2 1 3 1 2 0 1 -1 2 0 4 1 1 0 0 0 1 z "
                        onClick={() => handleClick('/Politician', '부천')} />
                    <path id="CD41210" className="OUTLINE" d="M 279 462 l 1 1 0 2 -1 0 1 2 2 4 1 3 1 1 0 0 1 2 1 3 2 2 0 1 0 1 1 1 1 4 -1 3 -1 1 1 1 -1 1 -1 2 -2 4 -3 1 -3 0 1 2 1 2 -4 0 -4 -1 -1 -2 -2 -2 -1 -4 -1 -4 -1 -3 -1 -3 0 -2 1 -2 -1 0 1 -1 -1 0 0 0 0 -1 0 0 0 -1 0 -1 -2 -2 -1 1 -2 0 1 -1 1 -2 1 -4 4 -1 2 -3 3 -1 2 -2 z "
                        onClick={() => handleClick('/Politician', '광명')} />
                    <path id="CD41220" className="OUTLINE" d="M 261 726 l 2 -1 4 -3 -1 -1 -2 -3 -4 -8 0 -3 -5 0 -5 -2 -4 -3 -2 -1 -1 -2 4 -6 3 1 5 0 5 0 4 0 4 -1 2 -1 2 -3 2 -3 1 -2 2 -3 2 -4 1 -2 1 -3 2 -3 3 -1 3 -1 2 -2 1 2 3 2 4 0 2 1 3 1 3 0 1 -3 4 0 3 -1 1 -1 2 0 3 1 4 0 0 -3 1 -5 2 1 -1 -2 0 -4 0 -4 0 -2 1 -1 -1 -2 0 -2 1 0 0 -1 0 0 0 -1 0 0 -1 -1 1 0 2 -1 4 -1 5 -2 2 -1 0 -1 2 3 2 3 1 0 1 -2 6 0 1 1 0 1 1 -1 2 1 1 -1 1 0 1 1 2 -1 1 -1 -1 -2 1 -1 1 0 1 0 1 -1 3 -2 4 -1 3 0 -1 3 -1 4 -2 2 -2 1 1 4 1 2 1 3 2 4 1 3 0 2 0 4 -2 1 -5 0 0 4 3 2 2 1 2 -1 0 0 2 2 -1 3 -2 3 -2 2 -3 2 0 3 2 2 0 1 3 -3 3 0 4 0 4 2 1 3 -2 2 -1 3 0 2 2 2 1 3 -5 2 -2 2 -1 2 1 1 1 3 -4 1 -1 1 -2 1 -4 2 -3 2 -1 2 0 2 1 1 -1 2 -2 2 -2 -1 -1 0 -2 1 -3 2 -4 0 -2 2 -2 1 -5 1 -2 2 -2 0 -2 -1 -2 -2 -5 0 -4 0 -4 1 -2 2 -3 1 -6 2 -2 1 -5 1 -5 3 -5 3 -2 -1 -1 -3 -12 1 -2 0 -6 1 -2 0 -2 -1 -2 -2 -1 -6 -1 -2 -1 -7 -1 0 0 0 z "
                        onClick={() => handleClick('/Politician', '평택')} />
                    <path id="CD41250" className="OUTLINE" d="M 334 256 l 0 -4 2 -3 1 -3 2 -1 2 -2 0 -1 0 -1 0 -2 3 -2 2 -2 2 -5 1 -3 2 -1 5 1 5 1 2 0 2 2 1 5 1 2 1 2 -1 2 0 0 0 1 0 1 2 1 3 1 1 3 2 4 1 2 2 3 4 1 3 1 1 2 1 3 2 3 0 2 -1 2 -1 3 -1 3 -1 -1 0 0 -2 1 -5 2 -2 2 -3 1 -2 1 0 0 -1 -1 -2 -1 0 0 -1 0 -2 -2 -5 0 -4 0 -3 -1 -3 -3 -1 -2 -1 -3 -2 -3 -3 -1 -4 -1 -3 -2 -2 -2 z "
                        onClick={() => handleClick('/Politician', '동두천')} />
                    <path id="CD41271" className="OUTLINE" d="M 283 518 l 3 1 1 4 1 3 1 1 -2 2 -1 3 -2 4 -1 2 -2 2 -2 1 0 0 0 1 0 2 3 1 4 1 5 -1 3 2 1 2 1 4 3 -1 4 2 1 4 -2 4 -1 2 -1 3 -2 -3 -2 -2 -2 -2 -4 0 -5 3 -4 0 -2 2 0 0 -2 -1 -2 1 0 0 0 1 0 0 0 0 0 1 0 1 -2 0 -3 2 -3 -3 -3 0 -2 -2 -1 -2 -2 -4 -2 -2 1 -1 0 0 -1 0 2 -2 6 -1 2 -1 0 -3 0 -3 0 -6 0 -1 -1 -2 1 -2 0 -1 -2 -2 1 -4 1 -2 1 -1 3 1 2 0 2 0 3 -2 2 -2 z "
                        onClick={() => handleClick('/Politician', '안산')} />
                    <path id="CD41271" className="OUTLINE" d="M 182 547 l -3 1 -2 1 -3 2 -2 2 -3 2 -3 2 -1 1 1 1 -2 1 -1 3 -2 3 0 2 2 -1 4 1 2 3 3 2 4 0 2 1 1 2 0 1 0 0 0 1 0 1 1 1 2 4 2 2 2 2 4 2 2 1 0 2 0 2 0 3 0 1 1 -1 1 -6 -1 -2 -1 -3 -3 -4 -1 -2 0 -2 -1 0 0 0 1 0 -1 -1 1 0 0 3 1 2 4 7 1 2 0 6 0 3 -2 4 -1 1 2 1 0 0 -3 -1 -1 -2 0 -4 2 0 0 1 1 1 0 2 0 1 0 0 0 0 0 1 0 -1 1 -4 0 -2 -1 1 -1 0 0 0 0 -1 0 0 0 -1 -3 -3 -2 0 -3 -1 0 -1 0 0 0 -1 0 0 -1 -2 0 -4 -2 1 0 0 0 1 -1 -1 -2 0 -1 1 -2 0 1 -1 -2 2 -2 -1 1 -2 -1 1 -1 0 0 0 0 -1 -2 0 0 1 1 0 0 0 3 2 2 2 3 3 1 3 -4 -1 -1 -2 -2 2 -2 0 -1 -2 -4 -1 -2 4 -1 3 -1 2 -2 3 0 -1 -3 -3 1 -1 -2 0 -1 0 0 0 0 0 -1 -2 0 -3 2 0 1 1 1 -3 -2 -2 0 0 0 0 -1 1 -1 0 0 -1 -2 0 1 -3 0 -2 4 0 4 -2 -1 -3 -1 -2 1 0 1 -4 -2 -3 0 -2 0 0 0 0 -3 -4 -1 -2 -2 -1 -2 -2 2 0 4 2 1 3 2 -1 3 -1 1 -3 2 -2 -1 -3 2 1 1 0 3 -3 9 -6 4 -1 z M 261 524 l 3 1 4 0 -1 1 -1 2 -1 4 2 2 0 1 -1 2 1 2 0 1 0 6 0 3 0 3 -2 1 -6 1 -2 2 -4 -1 -2 2 -6 1 -4 -1 0 -1 -3 -1 -5 -1 -2 -2 -6 -1 -4 -3 1 -1 2 -2 2 -3 4 0 1 -3 3 -2 3 -2 0 -1 1 0 0 0 1 1 1 -1 0 0 2 1 4 1 2 -4 0 -2 3 -1 4 -1 3 -1 z "
                        onClick={() => handleClick('/Politician', '안산')} />
                    <path id="CD41281" className="OUTLINE" d="M 303 339 l -1 5 -2 1 0 3 0 5 0 4 -1 5 -1 3 -1 2 -1 4 -1 4 4 1 4 -1 4 -1 1 -4 1 -2 3 -2 4 0 4 2 2 1 4 2 1 3 -1 5 -2 3 -2 2 1 2 1 2 -1 1 1 1 0 1 -1 1 1 1 -2 0 -2 2 -1 -1 -2 1 -3 0 1 -2 -1 -2 -1 -3 -1 -4 -3 -2 0 -1 -2 1 -3 3 -2 1 -2 1 -6 0 0 5 0 5 -1 3 -1 2 -1 4 0 4 -1 4 -5 0 -2 1 -1 4 -4 2 -2 0 -3 2 -3 -2 -2 -2 -3 -2 -2 -1 -2 -2 -3 -2 -3 -3 -2 -2 -2 -1 -3 -2 -2 -2 -2 -2 -3 -2 -4 -3 1 -2 5 1 2 0 2 2 3 0 0 -3 1 -4 5 -2 2 0 0 -4 -1 -1 0 -1 3 -2 0 -3 3 -3 2 -2 2 -2 1 -1 1 0 1 0 2 -2 0 -4 -1 -3 -1 -2 -2 -4 -1 -5 2 -2 4 -2 4 1 2 2 2 1 5 1 4 -1 2 -4 0 -3 3 -2 4 -1 z "
                        onClick={() => handleClick('/Politician', '고양')} />
                    <path id="CD41281" className="OUTLINE" d="M 244 369 l 0 -3 0 -3 1 -2 -2 -1 -1 -3 2 -3 2 -2 2 -2 2 -2 2 -4 1 3 2 1 6 0 3 0 3 0 1 5 2 4 1 2 1 3 0 4 -2 2 -1 0 -1 0 -1 1 -2 2 -2 2 -3 3 0 3 -3 2 0 1 1 1 0 4 -2 0 -5 2 -1 4 0 3 -3 0 -2 -2 -2 0 -5 -1 -1 2 -3 -1 -4 -3 -2 -2 -2 -3 1 -1 2 -2 4 -3 4 -2 4 -3 z "
                        onClick={() => handleClick('/Politician', '고양')} />
                    <path id="CD41281" className="OUTLINE" d="M 239 358 l 3 -1 1 3 2 1 -1 2 0 3 0 3 -3 6 -4 3 -4 2 -4 3 -2 2 -1 1 -3 0 -2 -2 -4 -2 -3 -2 -3 -2 -2 -1 -4 -2 -1 -2 -1 -3 0 -3 1 -6 3 2 2 2 2 0 1 -1 0 0 1 -1 3 -1 4 -2 3 0 2 -1 4 -1 4 1 z "
                        onClick={() => handleClick('/Politician', '고양')} />
                    <path id="CD41290" className="OUTLINE" d="M 331 476 l 1 2 2 2 4 -1 2 -3 2 0 1 4 0 4 0 4 3 2 1 2 -2 2 0 1 0 1 0 1 0 1 0 1 0 1 -6 1 -4 0 -4 2 -2 1 -2 0 -3 -1 -1 1 -1 2 -3 -4 0 -2 -2 -1 -3 -3 0 -2 1 -2 0 -4 1 -4 2 -3 4 -1 3 -2 2 -1 1 -1 -1 -1 z "
                        onClick={() => handleClick('/Politician', '과천')} />
                    <path id="CD41310" className="OUTLINE" d="M 386 389 l 1 4 -1 3 -2 2 0 1 1 2 1 4 1 4 5 3 2 2 -2 2 0 1 4 2 -5 4 -3 2 -2 1 -5 0 -3 1 -3 2 -2 1 -3 1 -1 -4 0 -4 1 -4 1 -2 2 -3 1 -4 1 -5 -2 -4 -3 -1 0 -3 2 -2 0 -3 1 -3 4 1 1 0 1 0 3 -1 z "
                        onClick={() => handleClick('/Politician', '구리')} />
                    <path id="CD41360" className="OUTLINE" d="M 432 323 l 1 1 2 2 4 0 4 0 4 1 3 2 0 0 1 0 2 1 2 2 2 3 1 4 2 3 1 1 1 5 3 2 1 3 0 4 1 4 1 2 -1 1 1 0 1 1 4 1 -2 1 1 2 1 2 1 2 2 0 0 2 -1 4 -1 5 -1 3 -1 3 -2 2 -3 2 -2 3 -1 4 -1 2 -1 2 0 5 -1 4 -2 4 0 2 -1 2 -2 5 -1 3 -2 2 -2 4 -1 2 -1 2 -1 5 0 3 -1 5 -2 2 -2 1 -3 0 -1 -3 0 -4 -2 -2 -2 -2 -4 -2 -2 -1 -3 -2 -3 -2 -2 -2 -1 -4 -1 -1 -2 -3 -3 -1 -1 -4 -2 -3 -2 -2 -2 -2 -2 -1 -6 0 -1 2 -2 2 -4 -2 0 -1 2 -2 -2 -2 -5 -3 -1 -4 -1 -4 -1 -2 0 -1 2 -2 1 -3 -1 -4 -4 0 -3 1 -1 0 -1 0 -4 -1 -3 0 -5 -2 0 -3 1 -5 0 -4 -1 -4 0 -4 -5 -2 1 -3 4 -2 2 0 3 -2 2 -2 1 -3 3 -2 1 -2 1 -5 0 -4 4 -2 3 0 1 -3 3 2 3 2 3 -1 1 -3 4 -4 4 0 4 -1 2 -2 1 0 1 3 3 3 1 1 4 -2 2 -2 4 -1 2 -1 2 -2 z "
                        onClick={() => handleClick('/Politician', '남양주')} />
                    <path id="CD41370" className="OUTLINE" d="M 339 604 l 3 0 2 1 3 1 5 -1 2 2 0 1 0 1 0 0 0 2 1 1 1 4 0 4 2 2 2 1 5 1 1 4 1 2 2 2 -3 2 -1 1 -1 0 -1 0 -1 1 1 2 -1 1 -2 1 -1 -1 -1 0 -1 1 -2 -1 -1 1 0 -1 -1 -1 -6 0 -1 2 -1 0 -2 -3 -2 -3 -1 -2 -1 -4 0 -4 -2 -3 -3 -1 -4 -1 -2 -2 -1 -2 1 -1 2 -3 2 -1 0 0 -1 -2 3 -1 4 -2 z "
                        onClick={() => handleClick('/Politician', '오산')} />
                    <path id="CD41390" className="OUTLINE" d="M 207 532 l 4 0 2 -2 0 0 0 0 0 0 0 -1 12 -16 4 0 1 -1 -1 2 -2 -2 -1 1 0 -1 2 -3 2 -2 3 1 4 0 0 2 6 0 2 1 -1 1 2 -2 1 -5 -1 -2 0 3 0 3 -2 1 1 0 -3 -1 -3 0 -1 -2 -6 -2 1 -3 1 -5 1 -3 3 -1 2 -2 0 0 0 -1 0 -1 0 -2 -1 -1 1 -2 0 -1 1 -1 2 -2 0 -5 0 -3 2 0 2 2 4 2 4 1 1 1 1 -1 1 0 3 1 2 0 1 -1 2 2 0 1 0 1 0 0 0 1 0 0 1 0 -1 1 1 0 -1 2 0 2 1 3 1 3 1 4 1 4 2 2 1 2 4 1 4 0 0 4 1 4 1 4 -3 4 -2 2 -3 2 -2 0 -2 0 -3 -1 -4 0 -3 -1 -3 3 -3 1 -4 1 -3 1 0 2 -2 4 -4 -1 -2 -1 0 0 -1 1 -1 -1 0 0 -1 0 0 1 -3 2 -3 2 -1 3 -4 0 -2 3 -2 2 -1 1 -4 -4 -5 -4 -3 -2 1 0 -1 -2 z "
                        onClick={() => handleClick('/Politician', '시흥')} />
                    <path id="CD41410" className="OUTLINE" d="M 279 542 l 0 -1 0 0 2 -1 2 -2 1 -2 2 -4 1 -3 2 -2 3 -2 1 -2 2 -4 4 -1 5 0 2 0 0 -1 1 2 2 4 4 2 1 3 -1 4 -2 3 -2 2 -1 5 -1 3 -3 0 -3 2 0 1 1 2 1 4 -4 -2 -3 1 -1 -4 -1 -2 -3 -2 -5 1 -4 -1 -3 -1 z "
                        onClick={() => handleClick('/Politician', '안산')} />
                    <path id="CD41430" className="OUTLINE" d="M 345 500 l 1 1 -1 3 2 1 -3 1 -1 4 -1 4 -1 3 -1 3 -2 4 -2 2 -1 2 0 3 -3 4 -2 2 -3 1 -3 2 -3 2 -4 -1 -1 5 0 4 -1 3 -2 2 -5 0 -5 -1 -1 -4 -1 -2 0 -1 3 -2 3 0 1 -3 1 -5 2 -2 2 -3 1 -4 -1 -3 2 -1 1 -5 2 -4 1 -3 2 -2 1 -4 1 -2 1 -1 3 1 2 0 2 -1 4 -2 4 0 z "
                        onClick={() => handleClick('/Politician', '의왕')} />
                    <path id="CD41450" className="OUTLINE" d="M 405 415 l 2 1 2 2 2 2 2 3 1 4 3 1 2 3 1 1 1 4 2 2 3 2 3 2 2 1 4 2 2 2 2 2 0 4 -4 2 -2 1 -1 0 -2 0 -3 2 1 3 1 2 -1 2 -2 1 -2 1 0 1 0 1 -2 1 -5 0 -1 -1 -1 0 0 0 -2 -1 -5 0 -3 0 -5 -1 -3 0 0 3 1 2 -2 1 -2 1 -1 -1 -3 0 -2 -1 -4 -1 1 -1 2 -4 2 -1 1 -2 1 -4 -5 -2 -2 -1 -1 -2 1 -1 0 -1 0 -1 1 -1 3 -5 1 -3 1 -2 2 -3 4 0 3 -1 0 -4 0 -5 -1 -3 -1 -2 -1 -3 2 -2 1 -2 z "
                        onClick={() => handleClick('/Politician', '하남')} />
                    <path id="CD41461" className="OUTLINE" d="M 370 641 l 2 -1 2 -2 1 -4 1 -3 1 0 1 0 0 -2 0 -5 2 -2 0 -1 0 0 0 0 0 -1 2 -1 4 -1 2 -1 2 -2 0 -4 0 -3 -2 -3 0 -2 1 -2 0 -1 -1 -2 -2 -4 3 -3 0 0 0 0 -1 -3 -1 -3 1 -3 2 -2 2 -2 3 -2 0 -4 1 -5 0 -4 -1 -5 -1 -2 -3 -2 -4 -1 -2 -2 -1 -2 -2 -4 1 -4 -1 -4 4 0 5 -2 3 0 2 -1 1 1 1 0 3 -1 2 -1 2 4 0 3 4 1 1 -3 2 -1 2 -5 -1 -3 5 -1 3 0 4 1 2 2 3 2 2 2 2 0 2 -1 2 0 0 3 -1 3 0 1 0 1 0 0 1 1 0 2 0 4 -2 2 0 2 1 3 0 1 -1 3 1 2 0 3 0 0 0 0 0 1 -1 2 1 2 2 0 4 1 3 1 0 -1 1 -1 2 -1 4 0 2 0 2 1 3 1 -1 4 0 2 0 1 0 1 -1 2 -1 3 1 5 -1 4 2 3 1 2 2 3 4 2 2 1 0 0 2 0 3 0 1 2 0 5 3 2 2 1 4 0 3 -1 1 0 1 2 0 4 0 5 1 3 3 1 3 2 -1 1 -1 2 1 2 -2 3 -1 3 -2 2 0 2 3 2 0 3 -1 5 -1 3 -2 0 -2 -2 -3 -2 -2 -3 -3 -1 -3 1 -1 2 -1 -2 -3 -1 -4 1 -1 2 -1 -1 -3 -2 -2 -2 -2 -2 -2 -2 0 0 -2 2 -3 3 -2 1 -2 -2 -2 -2 -2 -4 -1 -2 -2 -2 -4 -2 -1 -3 -1 -3 -1 -1 1 -1 -1 -1 -1 -1 -2 1 -2 2 -1 4 0 4 -1 4 -3 1 -3 1 -2 2 -5 2 -2 1 -1 2 -3 3 -1 2 -2 3 -4 2 -4 -1 -4 0 -4 -2 -4 1 -3 -1 0 0 -1 0 -1 0 -2 2 0 -2 -1 -3 -2 -4 -1 -3 -1 -2 z "
                        onClick={() => handleClick('/Politician', '용인')} />
                    <path id="CD41461" className="OUTLINE" d="M 354 570 l 0 -1 1 -2 2 -2 0 0 0 -1 4 -1 2 -1 0 -2 0 -2 1 -4 2 -5 1 -1 1 -2 -1 0 2 -2 4 1 5 1 4 -1 2 4 1 2 2 2 4 1 3 2 1 2 1 5 0 4 -1 5 0 4 -3 2 -2 2 -2 2 -1 3 1 3 1 3 0 0 0 0 -3 3 -2 1 -2 1 -3 0 -3 -1 -3 0 -4 0 -3 0 -3 1 -1 0 -2 -2 -2 -2 -3 -3 -1 -4 0 -2 0 0 2 -1 4 -2 1 -4 -1 -4 -2 1 0 0 0 1 -2 -2 z "
                        onClick={() => handleClick('/Politician', '용인')} />
                    <path id="CD41461" className="OUTLINE" d="M 340 520 l 1 1 2 1 4 1 2 3 3 0 4 2 2 3 3 0 4 2 1 2 1 0 0 0 2 2 2 2 0 0 1 0 2 0 2 0 2 -1 4 -1 1 4 -1 4 -4 1 -5 -1 -4 -1 -2 2 1 0 -1 2 -1 1 -2 5 -1 4 -3 0 -5 0 -3 -1 0 -3 -1 -5 -3 -1 -1 -1 0 1 -1 -1 -2 -2 -1 -4 -2 -3 0 -1 0 -1 0 -2 -3 -2 -3 -1 0 -3 1 -2 2 -2 z "
                        onClick={() => handleClick('/Politician', '용인')} />
                    <path id="CD41480" className="OUTLINE" d="M 199 291 l 3 -1 4 0 1 -3 2 -3 1 -2 1 -3 -2 -2 -1 -1 -1 1 -3 1 1 -1 0 -1 -1 -1 3 -2 -1 -2 -1 1 -1 0 0 -3 1 -2 1 -2 0 -4 1 -4 -4 -1 -1 -4 0 -4 1 -4 1 -4 0 -3 1 0 1 0 2 -1 3 -2 2 -3 2 -2 2 -2 1 1 2 2 5 1 4 -1 2 -2 0 0 3 -2 2 -2 2 -1 2 0 1 1 0 0 2 1 0 -2 2 0 2 1 1 -1 2 -3 2 -1 2 0 0 3 2 5 0 2 3 2 2 4 4 -1 2 0 1 -3 1 -5 1 -3 3 -1 3 2 2 2 2 2 2 2 4 2 4 -2 -1 -3 0 -6 1 -2 4 0 2 2 3 1 3 2 1 0 4 0 2 -1 3 -2 2 -2 2 -2 2 -3 2 -1 4 -2 2 0 0 1 2 3 2 2 4 2 2 1 0 0 0 0 1 2 -2 1 0 3 -2 3 -1 -1 0 0 -1 2 -4 2 -1 3 -1 2 -3 3 -2 4 -2 1 -2 3 0 4 -1 3 -2 -1 -1 3 1 2 0 0 -2 2 -1 2 0 2 -1 5 0 4 0 4 -1 5 -2 4 -1 2 0 3 -2 2 -4 -1 -3 0 0 3 -2 3 -2 1 1 2 1 3 1 5 -2 4 0 3 0 0 2 0 4 1 4 1 3 0 0 1 -2 3 0 3 -1 5 0 5 0 3 -4 -1 -4 1 -3 2 0 3 -2 4 -4 1 -5 -1 -2 -1 -2 -2 -4 -1 -4 2 -2 2 -3 0 -3 0 -6 0 -2 -1 -1 -3 -2 4 -2 2 -2 2 -2 2 -2 3 -3 1 -6 1 -4 -1 -4 1 -2 1 -3 0 -4 2 -3 1 -1 1 0 0 -1 1 -2 0 -2 -2 -3 -2 0 -5 0 -2 1 -2 1 -5 0 -3 -1 -5 0 -1 2 0 0 -8 -2 -3 0 -1 -2 -11 2 0 0 -10 -2 0 -1 -10 -2 -1 z "
                        onClick={() => handleClick('/Politician', '파주')} />
                    <path id="CD41500" className="OUTLINE" d="M 513 528 l 2 3 2 2 1 2 3 1 6 2 2 1 2 3 2 1 0 2 0 3 2 1 4 1 1 4 -1 4 -2 2 -2 3 -1 4 0 5 1 4 1 4 -2 4 -2 2 0 3 1 0 0 1 -1 2 1 -1 0 1 0 2 0 1 0 1 1 1 0 5 0 3 -2 2 -2 4 1 4 2 3 1 0 1 -1 0 1 1 -1 3 0 2 1 0 -1 3 -1 3 0 3 2 1 0 1 -2 -1 -3 -1 -1 2 -2 5 0 4 2 2 3 2 2 1 2 2 3 1 1 1 -1 0 0 0 0 0 0 2 -1 1 1 0 1 -1 3 0 1 1 1 2 5 0 5 -1 4 1 4 0 4 -1 4 -3 2 -2 1 -4 2 -4 0 -2 0 1 1 2 4 0 3 -5 -1 -1 -1 -2 0 -3 2 -1 2 -2 3 1 5 -2 3 -3 1 -3 -2 -2 -1 -4 -2 -3 -1 -2 -1 -2 0 -2 2 -4 2 -4 -2 1 -2 0 0 1 0 2 -1 3 -2 1 -3 2 -5 0 -4 -1 -4 0 -4 -3 -2 -1 -3 -2 -4 -3 -1 -4 -1 -2 -1 -3 0 -4 -2 -2 -4 -1 -2 -3 -1 -4 0 -3 -2 -3 -1 -1 -3 0 -5 0 -4 -1 -2 -1 0 -3 1 -4 0 -2 -1 -3 -2 0 -5 -1 -2 -3 0 -2 0 0 0 -2 -1 -4 -2 -2 -3 -1 -2 -2 -3 1 -4 -1 -5 1 -3 1 -2 0 -1 0 -1 0 -2 1 -4 2 -2 1 -2 0 -1 -2 -3 1 -3 1 1 0 0 3 -2 1 -5 2 -1 1 -4 2 -1 2 -1 5 -1 3 -2 2 -1 3 -2 3 -2 2 -3 2 -2 2 -2 2 -3 2 -1 2 2 1 0 2 -1 4 -2 z "
                        onClick={() => handleClick('/Politician', '이천')} />
                    <path id="CD41550" className="OUTLINE" d="M 431 626 l 1 1 1 1 -1 1 1 1 1 3 1 3 4 2 2 2 1 2 2 4 2 2 2 2 2 -1 3 -3 2 -2 0 0 2 2 2 2 2 2 3 2 1 1 1 -2 4 -1 3 1 1 2 1 -2 3 -1 3 1 2 3 3 2 2 2 2 0 1 -3 1 -5 0 -3 -3 -2 0 -2 2 -2 1 -3 2 -3 -1 -2 1 -2 1 -1 4 0 3 1 1 2 2 4 4 2 3 0 2 1 4 1 3 1 2 4 1 3 3 2 0 4 1 4 0 4 -2 5 -1 3 -3 2 -2 1 -1 0 0 0 -2 1 -4 1 -3 1 -3 2 -1 2 0 5 0 5 -2 1 0 0 -1 1 -1 2 -1 1 -1 0 -1 1 -2 1 -2 3 -1 -1 -2 0 -2 1 -3 1 -4 0 -3 2 -1 3 0 4 2 2 2 3 -1 3 -4 1 -3 2 -1 3 -4 1 -3 1 0 0 -2 -2 -3 1 -2 3 -3 2 -2 1 -3 1 -3 2 -1 1 0 0 0 0 -1 0 -1 0 0 -1 0 1 -1 0 -2 -1 0 3 2 4 -1 4 -2 4 -3 2 -2 -2 -2 -3 -2 -3 -3 -1 -3 -2 -2 -1 -1 1 -2 0 -2 -2 -3 -1 -3 -2 -1 -1 -1 1 -1 -1 -1 -1 -2 -5 -1 -3 -3 -1 -4 -2 -2 -1 0 1 0 -1 -2 -2 -5 -1 -3 0 0 -1 1 -1 -2 -1 -5 1 -4 0 -4 -2 2 -1 1 -1 4 -1 -1 -3 -1 -1 1 -2 2 -2 5 -2 -1 -3 -2 -2 0 -2 1 -3 2 -2 -1 -3 -4 -2 -4 0 -3 0 -3 3 0 -1 -2 -2 0 -3 3 -2 2 -2 2 -3 1 -3 -2 -2 0 0 -2 1 -2 -1 -3 -2 0 -4 5 0 2 -1 0 -4 2 -2 1 0 1 0 0 0 3 1 4 -1 4 2 4 0 4 1 4 -2 2 -3 1 -2 3 -3 1 -2 2 -1 5 -2 2 -2 3 -1 3 -1 1 -4 0 -4 1 -4 2 -2 z "
                        onClick={() => handleClick('/Politician', '안성')} />
                    <path id="CD41570" className="OUTLINE" d="M 163 327 l 3 3 7 1 2 -1 3 -2 3 -2 2 -2 2 -2 4 -1 7 0 3 1 2 5 4 8 0 3 0 1 1 5 0 3 -1 5 -1 2 0 2 0 5 -1 6 0 3 1 3 1 2 4 2 2 1 3 2 3 2 4 2 2 2 3 0 2 3 2 2 4 3 3 1 4 3 3 2 2 2 2 2 3 2 0 4 1 4 -2 3 -4 0 -3 0 -2 -1 -2 -1 -2 2 -3 1 -2 -2 -3 -3 -5 0 -2 -1 -1 -2 -2 -3 -1 1 0 -1 -1 0 -2 1 0 -3 0 -2 -3 -3 -2 -1 0 0 -1 0 -2 -2 -3 -2 -2 -2 -4 -2 -2 0 -1 -1 0 2 -2 3 -4 2 -1 2 -1 3 -1 3 -2 3 0 -1 -2 0 -4 0 -2 2 -2 2 -2 1 0 -2 -4 -2 -2 -1 0 1 -2 0 -2 -1 -2 0 -1 1 -1 -3 -1 -4 0 -3 -1 -2 -1 -4 -2 -3 -2 -1 -1 -5 2 -2 1 -2 0 -2 0 0 -1 0 -1 -2 -4 -2 1 -1 1 -3 0 -2 0 -6 0 -3 -2 -2 -2 -3 1 -5 1 -4 1 -3 0 -2 1 -3 -1 -1 0 0 0 -1 -2 -3 -1 -3 -1 -2 0 -3 2 -7 5 3 7 3 z "
                        onClick={() => handleClick('/Politician', '김포')} />
                    <path id="CD41590" className="OUTLINE" d="M 275 568 l 0 -1 0 -1 0 0 0 0 0 -1 0 0 2 -1 2 1 0 0 2 -2 4 0 5 -3 4 0 2 2 2 2 2 3 1 5 3 4 4 1 2 2 1 2 1 4 3 1 2 3 5 -1 4 1 2 2 0 0 0 0 1 0 1 -1 2 1 1 0 1 0 1 1 2 0 1 -3 3 -2 2 -2 1 -3 1 -1 0 1 -1 3 1 2 3 1 2 0 3 -2 1 -2 1 5 3 3 2 2 2 2 1 0 3 -1 3 0 4 0 3 0 3 1 3 0 2 -1 2 -1 2 4 1 2 0 1 -1 2 0 2 2 3 0 3 0 4 -2 2 -2 1 -4 1 -2 1 0 1 0 0 0 0 0 1 -2 2 0 5 0 2 -1 0 -1 0 -3 0 -4 1 -2 -2 -1 -2 -1 -4 -5 -1 -2 -1 -2 -2 0 -4 -1 -4 -1 -1 0 -2 0 0 0 -1 0 -2 -2 -1 -5 1 -3 -1 -2 -1 -3 0 -1 1 -4 2 -3 1 1 2 0 0 -2 1 -2 3 -1 1 1 2 2 2 4 1 3 1 2 3 0 4 1 4 1 2 0 1 -2 1 -5 2 -4 1 -2 1 -1 0 1 1 0 0 0 1 0 0 0 1 -1 0 0 2 1 2 -1 1 0 2 0 4 0 4 1 2 -3 -1 0 5 0 3 -4 0 -3 -1 -2 0 -1 1 -3 1 -4 0 -1 3 -3 0 -3 -1 -2 -1 -4 0 -3 -2 -1 -2 -2 2 -3 1 -3 1 -2 3 -1 3 -1 2 -2 4 -2 3 -1 2 -2 3 -2 3 -2 1 -4 1 -4 0 -5 0 -5 0 -3 -1 1 -2 -2 -4 -4 -1 -5 0 -4 0 -3 -1 0 -2 -1 1 0 -3 1 -4 2 -2 1 -1 -14 -14 -5 -6 -4 -3 -2 -2 -2 -2 -2 -2 -1 -2 2 -1 -1 -5 -2 -4 2 -3 3 -2 3 -1 -2 -2 -5 -2 -6 1 -3 0 2 -2 0 -1 0 -2 -1 -3 2 -3 1 -2 1 -2 0 0 -1 -1 -2 0 -3 3 -1 -1 1 0 0 -1 1 0 1 -2 2 -2 5 0 2 -1 4 -2 1 -2 1 -2 -3 0 -3 1 -1 3 -3 -1 -1 -3 1 -3 1 -1 0 -1 1 -1 0 -2 -3 -2 -1 -3 0 -3 2 1 1 -1 1 -1 3 -5 1 -1 2 -2 1 1 0 0 1 0 1 0 0 0 2 1 3 1 5 1 2 1 0 0 0 0 2 1 5 -2 3 0 2 2 2 2 0 3 -2 2 2 0 0 3 1 -4 1 -5 2 1 1 5 1 3 -2 3 -2 2 1 2 0 2 -2 0 -3 0 2 0 4 0 1 -4 2 -3 0 -2 0 0 1 -1 0 -1 -2 -2 0 -3 3 -1 2 -6 0 -3 1 -2 1 -1 2 1 2 0 -1 -1 0 -1 0 0 -1 -2 0 -2 3 -1 1 3 4 2 2 2 0 -1 0 0 1 0 3 1 2 3 2 2 0 -2 3 -2 3 1 2 3 3 0 -3 0 -2 -3 -1 -1 -1 -2 4 -1 2 -1 z M 234 673 l 4 -1 3 0 -2 0 0 -3 2 -1 1 -3 -1 2 -2 1 -3 1 0 -2 0 -3 0 -2 0 -1 0 0 0 0 1 -2 1 -4 0 -5 -2 -2 -1 -2 0 -3 2 -2 2 -3 3 -1 6 0 4 -3 3 -2 -2 -2 -1 -3 -2 -1 -1 0 -2 1 -3 0 0 -1 3 -1 2 -2 0 0 0 -1 2 -1 -2 -1 0 -1 0 0 1 -1 0 -1 -1 1 0 -1 -1 -1 1 -2 -1 0 1 -1 1 0 0 0 -1 -2 1 -4 -2 1 1 1 0 0 -2 1 -1 6 -2 0 1 1 0 1 -2 0 -5 2 -4 0 -4 0 -2 5 -1 2 -2 1 -2 4 -1 1 1 1 -2 0 -2 2 -3 1 -3 1 -2 2 -3 2 -2 3 5 5 z "
                        onClick={() => handleClick('/Politician', '화성')} />
                    <path id="CD41610" className="OUTLINE" d="M 380 532 l 0 -1 2 -3 4 -2 2 -2 2 -2 1 -3 2 -2 0 0 0 0 3 -2 -2 -4 1 -6 2 -2 1 -2 -1 -1 2 0 2 -2 2 -2 1 -3 0 -5 0 -4 -1 -4 -2 -1 -2 -3 -1 -4 -1 -2 0 -3 3 0 5 1 3 0 5 0 2 1 0 0 1 0 1 1 5 0 2 -1 0 -1 0 -1 2 -1 2 -1 1 -2 -1 -2 -1 -3 3 -2 2 0 1 0 2 -1 4 -2 1 3 3 0 2 -1 2 -2 1 -5 1 -2 3 -2 2 -2 3 0 4 0 4 0 2 1 3 2 2 2 1 2 2 5 1 2 1 2 0 3 -1 3 0 0 1 2 2 5 -1 4 -1 4 -3 0 -3 1 1 2 1 3 2 1 1 0 0 0 1 2 2 5 2 2 3 2 0 4 2 2 2 3 1 4 1 2 2 2 4 0 4 1 1 4 0 5 -1 4 -2 1 -2 3 -2 2 -2 2 -2 3 -3 2 -3 2 -2 1 -3 2 -5 1 -2 1 -2 1 -1 4 -2 1 -1 5 -3 2 0 0 -1 -1 -1 3 2 3 0 1 -1 2 -2 2 -3 -1 -2 -1 -2 0 -4 0 -2 1 -1 1 0 1 -3 -1 -4 -1 -2 0 -1 -2 1 -2 0 -1 0 0 0 0 0 -3 -1 -2 1 -3 0 -1 -1 -3 0 -2 2 -2 0 -4 0 -2 -1 -1 0 0 0 -1 0 -1 1 -3 0 -3 -2 0 -2 1 -2 0 -2 -2 -3 -2 -2 -2 -4 -1 -3 0 -5 1 1 3 -2 5 -2 1 -1 3 -4 -1 0 -3 -2 -4 -2 1 -3 1 -1 0 -1 -1 -2 1 -3 0 -5 2 -4 0 -1 -4 z "
                        onClick={() => handleClick('/Politician', '광주')} />
                    <path id="CD41630" className="OUTLINE" d="M 292 300 l 2 -1 2 -3 0 -3 3 0 4 1 2 -2 0 -3 1 -2 2 -4 1 -5 0 -4 0 -4 1 -5 0 -2 1 -2 2 -2 0 0 -1 -2 1 -3 2 1 1 -3 0 -4 2 -3 2 -1 2 2 2 0 2 1 4 1 2 2 2 2 0 4 0 5 2 2 3 2 4 1 3 1 2 3 1 3 1 2 3 3 3 1 4 0 5 0 2 2 1 0 0 0 2 1 1 1 0 0 2 4 1 4 1 5 1 2 0 2 0 5 0 3 -1 2 0 4 -2 4 -1 2 -2 3 -4 1 -2 1 -3 2 -3 2 -2 1 -4 1 -5 -1 -2 -1 -2 0 -2 0 -1 0 -1 0 -1 0 -1 -1 -1 0 -2 2 -3 2 0 3 1 2 0 0 0 1 -1 2 0 4 1 1 2 4 0 4 1 4 1 2 -1 2 -2 5 0 3 -3 0 -4 2 -4 -2 -2 -1 -4 -2 -4 0 -3 2 -1 2 -1 4 -4 1 -4 1 -4 -1 1 -4 1 -4 1 -2 1 -3 1 -5 0 -4 0 -5 0 -3 2 -1 1 -5 0 -3 0 -5 1 -5 0 -3 2 -3 0 -1 -3 0 -4 -1 -4 -1 -2 0 0 0 0 -3 2 -4 -1 -5 -1 -3 z "
                        onClick={() => handleClick('/Politician', '양주')} />
                    <path id="CD41650" className="OUTLINE" d="M 377 327 l -2 -1 -2 -2 -3 -1 2 -3 1 -2 2 -4 0 -4 1 -2 0 -3 0 -5 0 -2 -1 -2 -1 -5 -1 -4 -2 -4 2 -1 3 -1 2 -2 5 -2 2 -1 0 0 1 1 1 -3 1 -3 1 -2 0 -2 -2 -3 -1 -3 -1 -2 -3 -1 -4 -1 -2 -3 -1 -2 -2 -4 -1 -3 -3 -1 -2 -1 0 -1 0 -1 0 0 1 -2 -1 -2 -1 -2 -1 -5 0 -4 1 -3 3 -1 4 0 3 2 1 1 5 -3 3 -2 1 -2 1 -5 -1 -5 -2 -1 -1 -2 0 -5 0 -2 0 0 -1 -1 -2 1 0 0 0 0 -1 0 -1 -1 -3 -1 -1 -5 1 -4 3 0 3 -2 2 -2 3 -1 1 5 4 -1 3 0 3 -2 2 0 1 1 3 0 0 -2 1 -5 -1 -4 -2 -2 0 -2 0 -4 -1 -6 -2 -2 -1 -2 1 -2 0 -1 -1 -2 1 -1 0 0 -1 -2 1 -2 0 -3 0 -3 -1 -2 1 -1 0 -1 -1 -2 0 -3 1 -2 1 -3 4 0 0 4 -1 2 0 0 0 2 2 4 3 3 2 2 2 2 2 2 2 2 1 1 0 -2 2 -3 3 -3 2 -2 3 -1 3 -2 2 -3 1 -2 1 -1 -1 -1 2 -2 4 0 1 0 2 2 2 1 0 2 -2 2 -1 3 0 5 -2 4 -2 2 0 2 1 4 1 1 2 4 3 0 5 0 2 1 0 0 0 1 1 3 1 4 4 2 2 1 2 0 0 -3 2 -2 3 -1 5 -2 3 -1 1 -3 4 0 5 1 2 1 1 2 6 1 2 -3 2 -1 1 2 2 1 2 5 0 5 1 4 0 4 -1 5 1 4 -2 4 -2 2 -2 2 -3 2 1 1 0 1 -1 2 -2 4 -1 3 -1 2 0 0 1 1 -2 3 -2 3 -3 1 -3 2 -1 1 -2 5 -1 2 -1 3 0 4 2 2 1 3 -2 2 -2 2 -2 2 -2 2 -3 2 0 1 -1 -1 -1 1 -1 -1 -3 -1 -3 0 -2 4 0 4 0 5 0 3 -2 2 0 3 1 2 -1 1 -2 2 -2 2 -1 0 -1 -1 -5 -1 -2 0 0 0 0 1 -2 3 -1 5 1 3 -2 3 -1 2 0 4 1 4 0 2 0 3 0 2 0 0 -1 3 -2 4 -1 3 -1 2 -2 4 -2 2 -2 1 -4 1 -2 2 -4 2 -1 -1 -3 -3 -1 -3 -1 0 -2 2 -4 1 -4 0 -4 4 -1 3 -3 1 -3 -2 -3 -2 -1 -2 -3 -2 -3 -1 z "
                        onClick={() => handleClick('/Politician', '포천')} />
                    <path id="CD41670" className="OUTLINE" d="M 530 490 l 2 2 2 2 1 3 1 4 4 1 5 -2 3 1 4 0 2 -2 1 1 1 0 2 -2 3 0 3 1 3 1 2 2 6 0 2 2 2 1 2 -1 1 -2 1 -3 2 1 2 1 6 0 2 1 -1 2 0 2 0 2 0 0 2 -1 3 -3 1 0 0 0 2 -1 1 0 2 3 -1 3 -2 2 -1 4 -1 4 2 3 1 -1 1 0 2 1 3 -1 5 -1 2 2 3 0 4 1 0 5 -1 5 1 3 0 5 1 4 1 3 0 0 0 0 0 2 1 4 -3 1 -2 2 -2 1 1 3 1 3 1 3 1 5 -1 4 -3 5 -1 4 0 4 1 4 -1 4 -3 2 -2 3 -1 4 0 2 -1 3 -2 2 -1 0 -1 0 -2 2 -2 3 -1 2 -1 4 -1 3 -2 2 0 4 -3 3 -3 -1 -3 0 -2 -1 -3 -1 -2 -3 -3 -1 -6 -1 -1 -1 0 -1 1 -3 0 -1 -1 -1 -2 1 0 0 -1 1 -1 -1 -2 -3 -1 -2 -2 -2 -2 -3 -4 -2 -5 0 -2 2 1 1 1 3 -1 2 -1 0 -3 -2 -3 0 -3 1 0 1 -2 -1 -3 0 -1 1 0 -1 -1 1 -1 0 -2 -3 -1 -4 2 -4 2 -2 0 -3 0 -5 -1 -1 0 -1 0 -1 0 -2 0 -1 -1 0 1 -1 0 -1 -1 0 0 -3 2 -2 2 -4 -1 -4 -1 -4 0 -5 1 -4 2 -3 2 -2 1 -4 -1 -4 -4 -1 -2 -1 0 -3 0 -2 0 0 -2 -1 -2 -3 -2 -1 -6 -2 -3 -1 -1 -2 -2 -2 -2 -3 -4 -1 -4 2 -2 1 -1 0 -2 -2 1 -4 0 -5 -1 -4 -4 -1 -4 0 -2 -2 -1 -2 -1 -4 -2 -3 -2 -2 0 -4 1 -2 2 -2 3 -2 2 -2 3 1 3 1 2 0 5 2 3 1 2 2 3 0 2 -2 2 -2 4 0 2 -2 3 -1 z "
                        onClick={() => handleClick('/Politician', '여주')} />
                    <path id="CD41800" className="OUTLINE" d="M 388 99 l 3 1 2 0 0 1 0 1 0 1 0 2 -1 3 1 2 2 2 2 3 1 1 -1 2 -1 3 2 2 1 3 -1 3 -1 2 0 3 1 2 0 1 -1 1 1 2 0 3 0 3 -1 2 1 2 0 0 -1 1 1 2 0 1 -1 2 1 2 2 2 1 6 0 4 0 2 2 2 1 4 -1 5 0 2 -3 0 -1 -1 -2 0 -3 2 -3 0 -4 1 -1 -5 -3 1 -2 2 -3 2 -3 0 -1 4 1 5 3 1 1 1 1 0 0 0 0 0 2 -1 1 1 0 0 0 2 0 5 1 2 2 1 1 5 -1 5 -1 2 -3 2 -5 3 -1 -1 -3 -2 -4 0 -3 1 -1 3 0 4 -2 -2 -2 0 -5 -1 -5 -1 -2 1 -1 3 -2 5 -2 2 -3 2 0 2 0 1 0 1 -2 2 -2 1 -1 3 -2 3 -2 -2 -2 -2 -4 -1 -2 -1 -2 0 -2 -2 2 -4 3 -3 1 -2 1 -3 4 -2 1 -2 0 0 1 1 2 -3 0 -3 2 -1 -1 -2 0 0 0 0 -2 -1 -4 -2 -2 -2 -2 -3 0 -1 -2 0 -4 2 -2 1 -2 3 -2 2 -2 2 -3 2 -2 1 -4 0 -1 0 -3 -2 -3 -1 -2 -2 -4 0 -1 2 0 6 1 3 -4 2 -4 -2 -2 -2 -2 -2 -2 -2 -3 -2 -3 1 -1 3 -1 5 -1 3 -2 0 -4 1 -2 -4 -3 -2 0 -2 -2 -5 2 -3 4 0 4 -2 -4 0 -2 1 0 0 -1 0 1 -1 -3 1 -2 0 0 -1 0 0 1 -1 -1 0 0 0 0 0 3 0 2 0 1 -1 1 0 0 0 1 0 1 0 0 0 -1 0 1 -1 -1 0 1 -1 0 0 0 -1 -1 0 0 -1 1 0 0 0 0 0 0 0 0 -1 -1 -1 1 -1 -1 0 2 -1 2 -3 1 0 0 0 1 0 -1 1 0 0 0 0 1 0 2 -5 4 0 1 -5 0 -4 2 -1 0 -3 -2 -1 2 -1 2 -2 2 -1 -1 -1 1 0 -1 -1 0 0 1 -3 0 -1 0 0 -1 0 -2 -2 0 -5 -2 -2 0 0 2 -2 2 -3 2 -1 4 -1 2 -4 1 -3 2 -1 3 -2 2 -1 2 1 0 0 2 -1 1 2 1 1 0 1 1 0 2 2 2 -1 0 -1 0 1 0 0 0 0 0 0 -1 -2 3 -1 4 -1 3 0 2 -2 2 -2 0 -1 -2 -2 -1 -2 0 0 0 -1 -1 1 -1 0 -1 -2 -1 -3 0 0 0 0 1 2 1 -2 0 0 0 -1 2 -1 2 -4 0 -2 0 0 1 0 2 -3 2 -2 0 0 0 0 0 1 1 0 0 -1 -1 -1 1 -2 1 -3 -1 -5 -1 -2 0 0 0 0 0 0 0 -1 0 -1 1 -2 0 0 1 0 0 0 1 0 1 -1 1 0 0 1 0 0 0 0 0 0 0 0 -1 0 3 1 2 1 0 -1 0 -1 0 1 2 0 4 2 4 0 -1 4 0 2 1 -3 1 4 4 -1 1 -1 -1 1 1 0 0 0 0 -1 0 1 0 -2 1 2 1 0 0 -2 -1 -2 2 -4 0 -2 0 1 2 -1 1 -2 2 -3 4 0 5 0 4 0 4 0 2 1 0 0 3 2 4 0 1 -2 0 0 1 0 z "
                    />
                    <path id="CD41820" className="OUTLINE" d="M 504 200 l 1 4 1 4 2 2 2 2 3 1 5 1 3 1 1 1 5 0 4 0 4 0 3 1 1 5 1 5 -1 4 2 2 3 1 4 0 4 1 5 1 2 1 2 1 1 5 3 2 1 3 0 4 0 4 1 5 -1 4 -2 3 0 3 0 1 0 1 -1 2 -2 2 -4 0 -4 1 -3 2 -2 3 -1 3 -4 1 -1 1 -2 3 -4 1 -2 2 -2 3 0 4 1 2 2 2 1 4 -2 3 -2 2 -1 4 2 3 1 2 3 3 1 2 1 3 -1 4 -1 2 -3 2 -3 2 -3 2 -3 6 1 4 3 -1 3 -3 2 1 2 2 3 0 2 -2 4 -1 1 4 -1 5 -1 3 -2 5 0 2 0 1 0 2 0 1 -1 3 1 3 0 2 0 1 -2 2 -2 3 -2 1 1 3 3 2 1 3 4 2 1 3 2 2 1 4 -2 3 -1 2 0 3 -1 4 -5 0 -5 0 -4 -1 -2 2 0 0 -1 1 -1 2 -5 2 -4 -1 -5 -1 -2 -1 0 -2 0 -5 0 -2 0 0 1 -2 0 -4 -1 -1 0 -1 0 0 0 -1 0 -1 0 -2 -3 -2 -2 -2 -1 -4 -3 -2 -2 -2 -2 -2 0 -2 1 -2 0 -2 -3 -2 -2 -1 0 0 -2 2 -4 2 -2 1 -2 2 -1 2 0 0 -1 0 0 0 0 0 -2 0 -1 0 -1 0 -2 0 0 0 -3 1 1 -3 1 -5 1 -4 0 -2 -2 0 -1 -2 -1 -2 -1 -2 2 -1 -4 -1 -1 -1 -1 0 1 -1 -1 -2 -1 -4 0 -4 -1 -3 -3 -2 -1 -5 -1 -1 -2 -3 -1 -4 -2 -3 -2 -2 -2 -1 -1 0 0 0 -3 -2 -4 -1 -4 0 -4 0 -2 -2 -1 -1 1 -2 1 -3 2 -4 1 -3 0 0 0 -2 0 -3 0 -2 -1 -4 0 -4 1 -2 2 -3 -1 -3 1 -5 2 -3 0 -1 0 0 2 0 5 1 1 1 1 0 2 -2 2 -2 1 -1 -1 -2 0 -3 2 -2 0 -3 0 -5 0 -4 2 -4 3 0 3 1 1 1 1 -1 1 1 0 -1 3 -2 2 -2 2 -2 2 -2 2 -2 -1 -3 -2 -2 0 -4 1 -3 1 -2 2 -5 1 -1 3 -2 3 -1 2 -3 2 -3 -1 -1 0 0 1 -2 1 -3 2 -4 1 -2 0 -1 -1 -1 3 -2 2 -2 2 -2 2 -4 1 2 1 2 z "
                    />
                    <path id="CD41830" className="OUTLINE" d="M 448 448 l 0 -3 1 -5 1 -2 1 -2 2 -4 2 -2 1 -3 2 -5 1 -2 0 -2 2 -4 1 -4 0 -5 1 -2 1 -2 1 -4 2 -3 3 -2 2 -2 1 -3 3 -1 0 0 2 0 1 0 1 0 2 0 0 0 0 0 1 0 0 0 1 -2 2 -2 2 -1 4 -2 2 -2 0 0 2 1 3 2 0 2 -1 2 0 2 2 2 2 2 3 2 1 4 2 2 3 2 0 2 0 1 0 1 0 0 0 1 1 1 0 4 -1 2 0 0 0 2 0 5 0 2 2 1 5 1 4 1 5 -2 1 -2 1 -1 0 0 2 -2 4 1 5 0 5 0 1 -4 0 -3 1 -2 2 -3 -1 -4 -2 -2 -1 -3 2 -2 0 -1 2 1 2 -1 0 0 0 0 1 1 2 -2 1 -3 3 -1 3 -2 1 -1 0 0 1 0 0 0 3 2 3 2 0 1 2 -1 1 1 2 2 2 2 3 1 2 3 2 0 2 0 1 0 0 2 3 3 3 2 2 2 3 2 2 2 0 1 -1 1 2 2 3 1 1 0 2 -1 4 -1 3 1 2 0 1 0 0 0 3 -1 2 0 2 2 4 2 3 1 2 1 1 -1 3 -2 3 2 2 3 1 2 2 2 5 2 2 0 3 2 2 2 0 2 0 1 0 0 0 1 0 0 -1 1 -2 2 -4 0 -4 1 -4 0 -1 3 -3 1 -2 3 -2 3 -2 2 -2 2 -3 2 -3 1 0 4 5 1 1 1 1 1 1 -1 0 3 2 2 3 3 2 1 0 1 -1 2 0 4 1 4 0 3 1 2 0 4 -2 2 -1 2 -1 5 -1 2 -1 3 -1 4 -1 3 -2 1 0 2 0 0 0 0 1 3 0 1 -3 1 -4 1 -4 -1 -3 0 -2 -2 -5 1 -3 1 -2 -1 -1 0 -1 1 -2 -3 1 -4 1 -4 2 -2 1 -3 -2 -3 -1 0 -2 1 0 0 -1 0 -3 3 -2 1 0 0 0 -2 0 -2 1 -2 -2 -1 -6 0 -2 -1 -2 -1 -1 3 -1 2 -2 1 -2 -1 -2 -2 -6 0 -2 -2 -3 -1 -3 -1 -3 0 -2 2 -1 0 -1 -1 -2 2 -4 0 -3 -1 -5 2 -4 -1 -1 -4 -1 -3 -2 -2 -2 -2 -4 -1 -3 1 -2 2 -4 0 -2 2 -2 2 -3 0 -2 -2 -3 -1 -5 -2 -2 0 -3 -1 -3 -1 -2 2 -3 2 -2 2 -1 2 -3 -2 -2 -2 -2 -5 -1 -2 0 0 -1 0 -2 -1 -1 -3 -1 -2 3 -1 3 0 1 -4 1 -4 -2 -5 -1 -2 0 0 1 -3 0 -3 -1 -2 -1 -2 -2 -5 -1 -2 -2 -2 -3 -2 -2 -1 -4 0 -4 0 -3 0 -2 2 -3 2 z "
                    />
                </g><g filter="url(#dropshadow2)"></g>
                <g>
                    <text id="LCD41113" className="TEXT" x="330" y="570">수원시</text>
                    <text id="LCD41131" className="TEXT" x="370" y="500">성남시</text>
                    <text id="LCD41150" className="TEXT" x="356" y="344">의정부시</text>
                    <text id="LCD41173" className="TEXT" x="300" y="500">안양시</text>
                    <text id="LCD41190" className="TEXT" x="247" y="456">부천시</text>
                    <text id="LCD41210" className="TEXT" x="295" y="460">광명시</text>
                    <text id="LCD41220" className="TEXT" x="323" y="695">평택시</text>
                    <text id="LCD41250" className="TEXT" x="360" y="257">동두천시</text>
                    <text id="LCD41273" className="TEXT" x="250" y="550">안산시</text>
                    <text id="LCD41281" className="TEXT" x="260" y="380">고양시</text>
                    <text id="LCD41290" className="TEXT" x="330" y="480">과천시</text>
                    <text id="LCD41310" className="TEXT" x="380" y="411">구리시</text>
                    <text id="LCD41360" className="TEXT" x="423" y="380">남양주시</text>
                    <text id="LCD41370" className="TEXT" x="348" y="622">오산시</text>
                    <text id="LCD41390" className="TEXT" x="247" y="512">시흥시</text>
                    <text id="LCD41410" className="TEXT" x="298" y="538">군포시</text>
                    <text id="LCD41430" className="TEXT" x="330" y="518">의왕시</text>
                    <text id="LCD41450" className="TEXT" x="409" y="448">하남시</text>
                    <text id="LCD41461" className="TEXT" x="426" y="603">용인시</text>
                    <text id="LCD41480" className="TEXT" x="257" y="285">파주시</text>
                    <text id="LCD41500" className="TEXT" x="515" y="600">이천시</text>
                    <text id="LCD41550" className="TEXT" x="445" y="685">안성시</text>
                    <text id="LCD41570" className="TEXT" x="181" y="355">김포시</text>
                    <text id="LCD41590" className="TEXT" x="279" y="621">화성시</text>
                    <text id="LCD41610" className="TEXT" x="445" y="506">광주시</text>
                    <text id="LCD41630" className="TEXT" x="330" y="309">양주시</text>
                    <text id="LCD41650" className="TEXT" x="426" y="231">포천시</text>
                    <text id="LCD41670" className="TEXT" x="567" y="555">여주시</text>
                    <text id="LCD41800" className="TEXT" x="340" y="171">연천군</text>
                    <text id="LCD41820" className="TEXT" x="503" y="305">가평군</text>
                    <text id="LCD41830" className="TEXT" x="553" y="450">양평군</text>
                </g></svg>
                <div className='goSijang' onClick={() => handleClick('/Politician', queryText)}>
                    시장님 페이지 바로가기 →
                </div>
            </div>
            </Element>
            <div className='map-list' style={{ textAlign:'center', marginBottom:'100%', marginTop:'12%', marginLeft:'45%'}}>
            <input 
                type="text" 
                style={{width:'50%', height:'5vh', fontSize:'15px', borderRadius:'15px', marginRight:'50%'}}
                placeholder="경기도의 시를 검색해보세요" 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.548)', border:'1px solid #000000', borderRadius:'15px', width:'50%'}}>
                    <div className='cities-list' style={{ overflow: 'auto', maxHeight: '500px', marginTop:'5px', marginBottom:'5px'}}>
                        {cities.filter((value) => { 
                        if (searchTerm == "") {
                            return value;
                        } else if (value.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return value;
                        }
                        }).map((value, key) => {
                        return (
                            <ScrollLink to="section1" smooth={true} duration={500}>
                                <div className="city-list" key={key} onClick={() =>setQueryText(value)}>
                                {value}
                                </div>
                            </ScrollLink>
                        );
                        })}
                    </div>
                </div>
            </div>
            </div>
            <div className='getIssue'>
                <Element name="section2" className="section">
                    <div style={{ marginLeft: '350px', marginTop:'-10%'}}>
                        <ShowSlideImage queryText={queryText} />
                    </div>
                </Element>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <footer class="footer bg-white small text-center text-black-50">
                    <div class="container px-4 px-lg-5">Copyright &copy; Your Website 2023</div>
                </footer>
            </div>
        </div>

    )
}
