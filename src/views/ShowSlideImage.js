import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsSlider from './NewsSlider';


const ShowSlideImage = () => {
    const [search, setSearch] = useState("선문대학교");
    const [search2, setSearch2] = useState("경기 사건사고");
    const [search3, setSearch3] = useState("경기도 행사");
    const [newsData, setNewsData] = useState([]);
    const [newsData2, setNewsData2] = useState([]);
    const [newsData3, setNewsData3] = useState([]);

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
                setData(response.data.list);
            } catch (error) {
                console.error('Google Error:', error);
            }
        };

        fetchData(search, setNewsData);
        fetchData(search2, setNewsData2);
        fetchData(search3, setNewsData3);
    }, [search, search2, search3]);

    return (
        <div>
            <NewsSlider newsData={newsData} newsData2={newsData2} newsData3={newsData3} />
        </div>
    );
}
export default ShowSlideImage;