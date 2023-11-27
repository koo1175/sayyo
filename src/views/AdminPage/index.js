import React from "react";
import { Line } from 'react-chartjs-2';
import Utils from "./Utils";
import './style.css';

export default function AdminPage() {


    // 데이터 정의
    const labels = Utils.months({ count: 7 });
    const chartData = {
        labels: labels,
        datasets: [{
            label: '방문자 현황',
            data: [1, 30, 20, 81, 56, 55, 90],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    // React-ChartJS-2의 Line 컴포넌트 사용
    return (
        <div className="rounded-bg">

        <div style={{ marginTop: '50px', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
           
        <div style={{ flexBasis: '30%', textAlign: 'center' }}>
                {/* 시장 인증 관리 */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: 'white', fontWeight: 'bold' }}>시장 인증 관리</h3>
                    <table className="rounded-table">
                        <thead>
                            <tr>
                                <th className="th-paper">인증서</th>
                                <th className="th-data">인증날짜</th>
                                <th className="th-YorN">인증여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img className="certifi-img" src="/img/인증서3.png" alt="인증서3" /></td>
                                <td>2023-11-27 12:59</td>
                                <td>Y</td>
                            </tr>
                            <tr>
                                <td><img className="certifi-img" src="/img/seungju.png" alt="seungju" /></td>
                                <td>2023-11-27 12:58</td>
                                <td>N</td>
                            </tr>
                            <tr>
                                <td><img className="certifi-img" src="/img/인증서2.png" alt="인증서2" /></td>
                                <td>2023-11-27 12:57</td>
                                <td>Y</td>
                            </tr>
                            <tr>
                                <td><img className="certifi-img" src="/img/인증서1.png" alt="인증서1" /></td>
                                <td>2023-11-27 12:56</td>
                                <td>Y</td>
                            </tr>
                            <tr>
                                <td><img className="certifi-img" src="/img/안산시장.png" alt="안산시장" /></td>
                                <td>2023-11-27 12:55</td>
                                <td>N</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>


                <div style={{ flexBasis: '30%', textAlign: 'center' }}>
                {/* 방문자 현황 그래프 */}
                <div style={{ marginTop: '25px' }}>
                    <h3 style={{ color: 'white', fontWeight: 'bold' }}>방문자 현황</h3>
                    {/* React-ChartJS-2의 Line 컴포넌트 사용 */}
                    <Line
                        data={chartData}
                        options={{
                            scales: {
                                x: {
                                    type: 'category',
                                    labels: labels,
                                },
                            },
                        }}
                        style={{ backgroundColor: 'white', borderRadius: '5px', margin: 'auto', width:'700px', height:'350px' }}
                    />
                </div>
            </div>


            <div style={{ flexBasis: '30%', textAlign: 'center' }}>
                {/* 시장 이행률 */}
                <div>
                    <h3 style={{ color: 'white', fontWeight: 'bold' }}>이행률 순위</h3>
                    <table className="rounded-table">
                        <thead>
                            <tr>
                                <th className="th-no">순위</th>
                                <th className="th-name">이름</th>
                                <th className="th-region">지역</th>
                                <th className="th-percentage">이행률</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>김관용</td>
                                <td>경북</td>
                                <td>80.5%</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>박원순</td>
                                <td>서울</td>
                                <td>80.3%</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>박준영</td>
                                <td>경북</td>
                                <td>80.0%</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>염홍철</td>
                                <td>대전</td>
                                <td>76.6%</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>강운태</td>
                                <td>광주</td>
                                <td>75.9%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    </div>
        </div>
    );
}
