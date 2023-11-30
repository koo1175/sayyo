import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Board/Board.css';

const Test = (props) => {
    const [search, setSearch] = useState("오세훈 시장");
    const [newsData, setNewsData] = useState([]);
    
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
    };

    console.log(search);
    useEffect(() => {
        axios.post(`https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/issue/findSearch`, {
            search:search,
        }, config)
            .then((response) => {
                console.log("요청 [", response.status,"]")
                console.log(response.data.list);
                setNewsData(response.data.list)
            })
            .catch((error) => {
                console.error('Google Error:', error);
            });
    }, [search]);

    return (
        <div>
            {newsData.map((news, index) => (
                <div key={index}>
                    <h2>{news.title}</h2>
                    <p>{news.content}</p>
                    <img src={news.image} alt={news.title} />
                    <a href={news.link}>Read more</a>
                    <p>{news.pressInfo}</p>
                    <p>{news.time}</p>
                </div>
            ))}
        </div>
    );
}
export default Test;