import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    console.log('받아온 politicianName값 : ',politicianName);
    const [search, setSearch] = useState(`${politicianName} 시장`);
    const [newsData, setNewsData] = useState([]);

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
                console.log("요청 [", response.status, "]")
                console.log(response.data.list);
                setNewsData(response.data.list)
            })
            .catch((error) => {
                console.error('Google Error:', error);
            });
    }, [search]);
    function shortenText(text, maxLength) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        } else {
            return text;
        }
    }

    return (
        <div style={{ width: '670px', border: '1px solid lightgray', borderRadius: '20px',marginRight:'0px',padding:'20px',marginTop:'-100px'}}>
            {newsData.map((news, index) => (
                <a href={news.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>

                    <div key={index} style={{ margin: '10px', padding: '3px', borderBottom: '1px solid lightgray', display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', marginBottom: '-15px' }}>
                                <div>
                                    <img src={news.newsLogo} alt='뉴스로고' style={{ width: '100%', height: 'auto', marginTop: '19px' }} />
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
    );
}
export default ShowRealTimeArticles;