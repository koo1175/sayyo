import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import FulfillForm from './FulfillForm';

const Minus = ({ onClick }) => (
    <input
        type='button'
        onClick={onClick}
        value='-'
        style={{ fontSize: '15px', width: '20px', padding: '1px', cursor: 'pointer', color: '#444', borderRadius: '15px' }}
    />
);

const Plus = ({ onClick }) => (
    <input
        type='button'
        onClick={onClick}
        value='+'
        style={{ fontSize: '15px', width: '20px', padding: '1px', cursor: 'pointer', color: '#444', borderRadius: '15px' }}
    />
);


const Fullfillment = () => {
    const [topFive, setTopFive] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    

    const navigate = useNavigate();

    const gotoBack = () => {
        navigate('/AdminPage');
    };

    const handleSave = (index) => {
        const modifiedTopFive = {
            region: topFive[index].region,
            name: topFive[index].name,
            planNum: topFive[index].planNum,
            completeNum: topFive[index].completeNum,
            tryNum: topFive[index].tryNum,
            regionDev: topFive[index].regionDev,
            fulfillment: topFive[index].fulfillment,
        };


        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/fulfillment/modify', modifiedTopFive)
            .then(response => {
                console.log('Top Five updated:', response.data);
                setTopFive((prevTopFive) => {
                    const newTopFive = [...prevTopFive];
                    newTopFive[index] = modifiedTopFive;
                    return newTopFive;
                });

                reloadData();

                setEditIndex(null);
            })
            .catch((error) => {
                console.error('Error updating Top Five:', error);
            });
    };

    const reloadData = () => {
        axios
            .get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/fulfillment/findAll')
            .then(response => {
                const sortedData = response.data.list.sort((a, b) => b.fulfillment - a.fulfillment);
                setTopFive(sortedData);


                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching top five data:', error);
                setLoading(false);
            });
    };

    const handlePopupOpen = () => {
        setShowPopup(true);
    };


    useEffect(() => {
        axios
            .get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/fulfillment/findAll')
            .then((response) => {
                const sortedData = response.data.list.sort((a, b) => b.fulfillment - a.fulfillment);
                setTopFive(sortedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching top five data:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (region) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const regionData = {
            region: region
        }

        axios.post(`https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/fulfillment/delete`, regionData, config)

            .then(response => {
                console.log('삭제 완료 여부:', response.data);

                // After successful deletion, reload the data
                reloadData();
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });

    };

    const handleCount = (type, index, field) => {
        const newTopFive = [...topFive];
        const inputState = {
            'plus': 1,
            'minus': -1
        };

        if (type === 'plus' || type === 'minus') {
            newTopFive[index][field] = (parseInt(newTopFive[index][field], 10) + inputState[type]).toString();
        }

        setTopFive(newTopFive);
    };

    const [fulfillments, setFulfillments] = useState([]);

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleFulfillRegister = (newFulfillments) => {
        // Add logic to update fulfillmentData with the new fulfillments
        const updatedFulfillments = [...fulfillments, ...newFulfillments];
        setFulfillments(updatedFulfillments);
    };


    return (
        <div className="rounded-bg" style={{ marginTop: '100px' }}>
            <h5>
                <button className="button-85" onClick={handlePopupOpen}>
                    리스트 추가
                </button>
            </h5>

            {/* Popup */}
            {showPopup && (
                <div className="popup-overlay">
                    <FulfillForm onClose={handlePopupClose} onRegister={handleFulfillRegister} reloadData={reloadData} />
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 className="member-heading" style={{ color: 'white', flexBasis: '30%', marginLeft: '530px' }}>
                    이행률 관리
                </h3>
                {/* 뒤로가기 버튼 */}
                <div style={{ flexBasis: '60%' }}>
                    <button onClick={gotoBack} style={{ backgroundColor: '#555454', color: '#fff', marginLeft: '200px', marginTop: '20px' }}>
                        <img src='/img/뒤로가기.png' alt='뒤로가기' width='20px' />
                    </button>
                </div>
            </div>
            {/* Loading state */}
            {loading && <p>Loading...</p>}

            <table className="rounded-table" style={{ width: '1100px', marginBottom: '100px' }}>
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>이름</th>
                        <th>지역</th>
                        <th>공약 수</th>
                        <th>완료</th>
                        <th>시행 중</th>
                        <th>발전도</th>
                        <th>이행률</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {topFive.map((data, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.region}</td>
                            <td>
                                <Minus onClick={() => handleCount('minus', index, 'planNum')} />
                                <input
                                    type="text"
                                    style={{ width: '25px' }}
                                    value={data.planNum}
                                    onChange={(e) => handleInputChange(index, 'planNum', e.target.value)}
                                />
                                <Plus onClick={() => handleCount('plus', index, 'planNum')} />
                            </td>
                            <td>
                                <Minus onClick={() => handleCount('minus', index, 'completeNum')} />
                                <input
                                    type="text"
                                    style={{ width: '25px' }}
                                    value={data.completeNum}
                                    onChange={(e) => handleInputChange(index, 'completeNum', e.target.value)}
                                />
                                <Plus onClick={() => handleCount('plus', index, 'completeNum')} />
                            </td>
                            <td>
                                <Minus onClick={() => handleCount('minus', index, 'tryNum')} />
                                <input
                                    type="text"
                                    style={{ width: '25px' }}
                                    value={data.tryNum}
                                    onChange={(e) => handleInputChange(index, 'tryNum', e.target.value)}
                                />
                                <Plus onClick={() => handleCount('plus', index, 'tryNum')} />
                            </td>
                            <td>
                                <Minus onClick={() => handleCount('minus', index, 'regionDev')} />
                                <input
                                    type="text"
                                    style={{ width: '25px' }}
                                    value={data.regionDev}
                                    onChange={(e) => handleInputChange(index, 'regionDev', e.target.value)}
                                />
                                <Plus onClick={() => handleCount('plus', index, 'regionDev')} />
                            </td>

                            <td>{data.fulfillment}%</td>
                            <td>
                                <button className="submit-deny2" onClick={() => handleSave(index)}>
                                    수정
                                </button>

                            </td>
                            <td>
                                <button className="submit-deny" onClick={() => handleDelete(data.region)}>
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );

    function handleInputChange(index, key, value) {
        setTopFive((prevTopFive) => {
            const newTopFive = [...prevTopFive];
            newTopFive[index] = { ...newTopFive[index], [key]: value };
            return newTopFive;
        });
    }


};

export default Fullfillment;