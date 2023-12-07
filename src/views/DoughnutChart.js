import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({ data }) {
    const notCompleteNum = data.planNum - data.completeNum - data.tryNum;

    const chartData = {
        labels: ['추진완료', '추진 중', '미이행'], // 레이블에 'NOT_COMPLETE_NUM' 추가
        datasets: [{
            data: [data.completeNum, data.tryNum, notCompleteNum], // data 배열에 'NOT_COMPLETE_NUM' 값 추가
            backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)'], // 색상 추가
            hoverBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'], // hover 색상 추가
            borderRadius:5,

            
        }]
    };

    const chartData2 = {
        labels: ['이행률', '미이행률'],
        datasets: [{
            data: [data.fulfillment, 100 - data.fulfillment],
            backgroundColor: ['#36A2EB', '#808080'],
            hoverBackgroundColor: ['#36A2EB', '#808080'],
            borderRadius: 5,

        }]
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ position: 'relative',marginLeft:70 }}>
                <Doughnut
                    data={chartData}
                    height={250}
                    width={250}
                    options={{
                        cutout:'60%',
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'black', boxWidth: 20
                                },
                                display: true,
                                position: 'bottom',
                                align: 'center',
                            }
                        }
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '20px'
                }}>
                    총공약수<br/>
                    {data.planNum}
                </div>
            </div>

            <div style={{ position: 'relative',marginLeft:50 }}>
                <Doughnut
                    data={chartData2}
                    height={250}
                    width={250}
                    
                    options={{
                        hover:{mode:null},
                        cutout:'60%',
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'black', boxWidth: 20
                                },
                                display: true,
                                position: 'bottom',
                                align: 'center',

                            }
                        }
                    }}
                />
                  <div style={{
                    position: 'absolute',
                    top: '45%',
                    left: '51%',
                    transform: 'translate(-50%, -50%)',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '20px'
                }}>
                    이행률<br/>
                    {data.fulfillment}%
                </div>
            </div>
        </div>
    );
}

export default DoughnutChart;