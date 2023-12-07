import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsSlider from './NewsSlider';
import { useLocation, useNavigate } from 'react-router-dom';

const ShowSlideImage = ({ queryText }) => {
    const si = queryText;

    const [newsData, setNewsData] = useState([]);
    const [newsData2, setNewsData2] = useState([]);
    const [newsData3, setNewsData3] = useState([]);

    const navigate = useNavigate();

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        const fetchData = async (search, setData) => {
            try {
                const response = await axios.post(`https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/issue/findSearch`, {
                    search: search,
                }, config);

                console.log("요청 [", response.status, "]")
                console.log(response.data.list);
                navigate('/Gyeonggi', { state: { data: response.data, si }, replace: true });
                setData(response.data.list);
            } catch (error) {
                console.error('Google Error:', error);
            }
        };

        fetchData(queryText+" 소식", setNewsData);
        fetchData(queryText+" 사건사고", setNewsData2);
        fetchData(queryText+" 행사", setNewsData3);
    }, [queryText]);

    return (
        <div>
            <NewsSlider newsData={newsData} newsData2={newsData2} newsData3={newsData3} />
        </div>
    );
}
export default ShowSlideImage;