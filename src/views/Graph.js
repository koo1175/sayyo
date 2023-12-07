import React, { useEffect, useState } from 'react';

import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, PieChart, Pie, Cell } from "recharts";
import './Graph.css';
import axios from 'axios';


const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF00DD', '#6B66FF', '#5CD1E5'];
const colors2 = ['#88A9FF', '#D2B6FF'];

export default function Test2() {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    useEffect(() => {
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/getAge')
            .then(function (response) {
                console.log('나이 데이터', response.data);
                const newData = [
                    {
                        name: "10대",
                        // num: response.data['10']
                        num: response.data['10']
                    },
                    {
                        name: "20대",
                        num: response.data['20']
                    },
                    {
                        name: "30대",
                        num: response.data['30']
                    },
                    {
                        name: "40대",
                        num: response.data['40']
                    },
                    {
                        name: "50대",
                        num: response.data['50']
                    },
                    {
                        name: "60대",
                        // num: response.data['60']
                        num: response.data['60']

                    },
                    {
                        name: "70대",
                        num: response.data['70']
                    },
                    {
                        name: "80대",
                        num: response.data['80']
                    },
                ];

                setData1(newData);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/getGender')
            .then(function (response) {
                console.log('성별 데이터', response.data);
                const newData = [];

                for (let i = 1; i <= 4; i++) {
                    let maleKey = `남자,${i}`;
                    let femaleKey = `여자,${i}`;

                    newData.push({
                        name: `번호${i}`,
                        male: response.data[maleKey] || 0,
                        female: response.data[femaleKey] || 0
                    });
                }

                setData2(newData);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/getRegion')
            .then(function (response) {
                const dataRaw = response.data;
                let dataProcessed = {};

                for (let key in dataRaw) {
                    let [name, no] = key.split(',');
                    no = 'no' + no;

                    if (!dataProcessed[name]) {
                        dataProcessed[name] = { name };
                    }

                    dataProcessed[name][no] = dataRaw[key];
                }

                const data3 = Object.values(dataProcessed);
                console.log(data3);

                setData3(data3); // state 업데이트
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    return (
        <div className="chart-container">
            <div className="chart-container2">
                <BarChart width={500} height={300} data={data1} >
                    <Bar dataKey="num" barSize={40}>
                        {
                            data1.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))
                        }
                        <LabelList dataKey="num" position="top" offset={3} />
                    </Bar>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                </BarChart>
                <PieChart width={500} height={250}>
                    <Pie
                        data={data1}
                        dataKey="num"
                        nameKey="name"
                        cx="50%"
                        cy="51  %"
                        outerRadius={100}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        animationDuration={3000}
                    >
                        {data1.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
            <div className="chart-container2">
                {data2.map((data, index) => (
                    <div key={index}>
                        <PieChart width={400} height={250}>
                            <Pie
                                data={[
                                    { name: "남성", num: data.male },
                                    { name: "여성", num: data.female }
                                ]}
                                dataKey="num"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                animationDuration={3000}
                            >
                                {[data.male, data.female].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors2[index % colors2.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        <div style={{ textAlign: 'center', marginTop: '0px' }}>기호{index + 1}번</div>
                    </div>
                ))}
            </div>

            <div className="chart-container2">

                <BarChart width={2000} height={800} data={data3}>
                    <Bar dataKey="no1" fill=" #FFA7A7" barSize={20}>
                        <LabelList dataKey="no1" position="top" />
                    </Bar>
                    <Bar dataKey="no2" fill='#FFC19E' barSize={20} >
                        <LabelList dataKey="no2" position="top" />
                    </Bar>
                    <Bar dataKey="no3" fill='#FFE08C' barSize={20}>
                        <LabelList dataKey="no3" position="top" />
                    </Bar>
                    <Bar dataKey="no4" fill='#FAED7D' barSize={20}>
                        <LabelList dataKey="no4" position="top" />
                    </Bar>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip cursor={{ fill: 'transparent' }} />

                </BarChart>
            </div>
            <div style={{ height: '200px' }}></div>
        </div>
    );
}