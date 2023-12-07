import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Reply from './Reply';

function shortenText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
}

function boldText(text, word) {
    const regex = new RegExp(word, 'g');
    return text.replace(regex, `<strong>${word}</strong>`);
}

const ShowRealTimeArticles = ({ politicianName }) => {
    //console.log('받아온 politicianName값 : ', politicianName);
    const [search, setSearch] = useState(`${politicianName} 시장`);
    const [newsData, setNewsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        axios.post(`https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/issue/findSearch`, {
            search: search,
        }, config)
            .then((response) => {
                //console.log("요청 [", response.status, "]")
                //console.log(response.data.list);
                setNewsData(response.data.list)
            })
            .catch((error) => {
                console.error('Google Error:', error);
            });
    }, [search]);

    useEffect(() => {
        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/politician/findAll')
            .then(response => {
                const data = response.data.list; // 'list' 속성 접근
                const filteredData = data.filter(item => item.name === politicianName); // 이름이 일치하는 행만 선택
                console.log('filteredData 확인!!', filteredData);
                console.log('region : ', filteredData[0].region);
                setFilteredData(filteredData); // state 업데이트

            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    function shortenText(text, maxLength) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        } else {
            return text;
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', height: 800 }}>
                {/* 인물정보 div */}
                <div className='chat-list' style={{ textAlign: 'left', width: 670, marginLeft: 5, overflow: 'auto' }}>
                    {filteredData.map(item => {
                        const date = new Date(item.birth); // Date 객체 생성
                        const dateString = date.toLocaleDateString(); // 날짜를 문자열로 변환
                        return (
                            <div>
                                <div key={item.id} style={{ border: '1px solid lightgray', borderRadius: 10, padding: 10 }}>
                                    <div style={{ display: 'flex', marginBottom: -20 }}>
                                        <p style={{ color: 'gray', width: '50px', marginLeft: 10 }}>이름 </p>
                                        <p style={{ color: 'black' }}>{item.name}</p>
                                    </div>
                                    <div style={{ display: 'flex', marginBottom: -20 }}>
                                        <p style={{ color: 'gray', width: '50px', marginLeft: 10 }}>출생 </p>
                                        <p style={{ color: 'black' }}>{dateString}</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <p style={{ color: 'gray', width: '50px', marginLeft: 10 }}>소속 </p>
                                        <p style={{ color: 'black' }}>{item.region}시장</p>
                                    </div>
                                </div>
                                <div style={{ border: '1px solid lightgray', borderRadius: 10, padding: 10, marginTop: 20 }}>
                                    <h4 style={{ marginLeft: 10 }}>학력사항</h4>
                                    {item.education && item.education.split('/').map((part, index) => {
                                        const [time, school] = part.split(',', 2);
                                        return (
                                            <div key={index} style={{ display: 'flex', borderLeft: '1px solid gray' }}>
                                                <div style={{ color: 'gray', marginLeft: 10, width: '100px', textAlign: 'left', marginBottom: 5 }}>{time}</div>
                                                <div style={{ marginBottom: 5 }}>
                                                {school && school.split('.').map((s, i) => <div key={i}>{s}</div>)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div style={{ border: '1px solid lightgray', borderRadius: 10, padding: 10, marginTop: 20 }}>
                                    <h4 style={{ marginLeft: 10 }}>경력사항</h4>
                                    {item.career && item.career.split('/').map((part, index) => {
                                        const [time, school] = part.split(',', 2);
                                        return (
                                            <div key={index} style={{ display: 'flex', borderLeft: '1px solid gray' }}>
                                                <div style={{ color: 'gray', marginLeft: 10, width: '140px', textAlign: 'left', marginBottom: 5 }}>{time}</div>
                                                <div style={{ marginBottom: 5,width:'400px'}}>
                                                {school && school.split('.').map((s, i) => <div key={i}>{s}</div>)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        );
                    })}
                </div>

                {/* 뉴스기사 div */}
                <div className='chat-list' style={{ width: '700px', border: '1px solid lightgray', borderRadius: '10px', padding: '20px', marginRight: 130, overflow: 'auto' }}>
                    {newsData.map((news, index) => (
                        <a href={news.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>

                            <div key={index} style={{ margin: '10px', padding: '3px', borderBottom: '1px solid lightgray', display: 'flex' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', marginBottom: '-15px' }}>
                                        <div>
                                            <img src={news.newsLogo} alt='뉴스로고' style={{ width: '100%', height: 'auto'}} />
                                        </div>
                                        <p style={{ fontWeight: 'bold', marginLeft: '3px' }}>{news.magazine}</p>
                                        <p style={{ color: 'gray' }}>ㆍ{news.wrotetime}ㆍ네이버뉴스</p>
                                    </div>
                                    <div>
                                        <p style={{ textAlign: 'left', fontSize: '16px', color: '#0042ED', marginBottom: '-5px' }} dangerouslySetInnerHTML={{ __html: boldText(shortenText(news.title, 40), search) }}></p>
                                        <p style={{ textAlign: 'left', fontSize: '15px' }}>{news.content}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={news.image} alt='기사 이미지' style={{ width: '100%', height: 'auto', borderRadius: '10px', marginTop: '40px', marginLeft: '7px' }} />
                                </div>
                            </div>
                        </a>
                    ))}

                </div>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>
                {filteredData.length > 0 ? <Reply text={filteredData[0].region} /> : null}
            </div>
        </div>
    );
}
export default ShowRealTimeArticles;