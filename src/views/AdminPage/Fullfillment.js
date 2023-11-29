import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const Fullfillment = () => {
    const [topFive, setTopFive] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [newItem, setNewItem] = useState({
        region: '',
        name: '',
        planNum: '',
        completeNum: '',
        tryNum: '',
        regionDev: '',
        fulfillment: '',
    });

    const handleEdit = (index) => {
        setEditIndex(index);
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
                setTopFive(response.data.list);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching top five data:', error);
                setLoading(false);
            });
    };

    const handleCancel = () => {
        setEditIndex(null);
    };

    const handlePopupOpen = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handlePopupSave = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const newItemData = {
            name: newItem.name,
            region: newItem.region,
            planNum: newItem.planNum,
            completeNum: newItem.completeNum,
            tryNum: newItem.tryNum,
            regionDev: newItem.regionDev,
        };

        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/fulfillment/regist', newItemData, config)
            .then(response => {
                console.log('New item registered:', response.data);

                // After successful registration, reload the data
                reloadData();
                setShowPopup(false); // Close the popup
            })
            .catch(error => {
                console.error('Error registering new item:', error);
            });
    };

    const handlePopupInputChange = (key, value) => {
        setNewItem((prevNewItem) => ({ ...prevNewItem, [key]: value }));
    };

    useEffect(() => {
        axios
            .get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/fulfillment/findAll')
            .then((response) => {
                setTopFive(response.data.list);
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

    const initialFill = {
        name: newItem.name,
        region: newItem.region,
        planNum: newItem.planNum,
        completeNum: newItem.completeNum,
        tryNum: newItem.tryNum,
        regionDev: newItem.regionDev,
    };

    const [fill, setFill] = useState([initialFill]);

    const handleInput = (index, event) => {
        const { name, value } = event.target;
        const newFill = [...fill];
        newFill[index][name] = value;
        setFill(newFill);
    };

    const handleAddFullfillSet = () => {
        setFill((prevFill) => [...prevFill, { ...initialFill }]);
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
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handlePopupClose}>
                            &times;
                        </span>
                        <h3>새로운 항목 추가</h3>
                        <div className='thisSet'>
                        <label style={{ fontSize: '15px', marginRight: '10px' }}>이름:</label>
                        <input type="text" style={{ width: '50px' }} value={newItem.name} onChange={(e) => handlePopupInputChange('name', e.target.value)} />
                        <label style={{ fontSize: '15px', marginRight: '10px' }}>지역:</label>
                        <input type="text" style={{ width: '50px' }} value={newItem.region} onChange={(e) => handlePopupInputChange('region', e.target.value)} />
                        <label style={{ fontSize: '15px', marginRight: '10px' }}>공약 수:</label>
                        <input type="text" style={{ width: '50px' }} value={newItem.planNum} onChange={(e) => handlePopupInputChange('planNum', e.target.value)} />
                        <label style={{ fontSize: '15px', marginRight: '10px' }}>완료:</label>
                        <input type="text" style={{ width: '50px' }} value={newItem.completeNum} onChange={(e) => handlePopupInputChange('completeNum', e.target.value)} />
                        <label style={{ fontSize: '15px', marginRight: '10px' }}>시행 중:</label>
                        <input type="text" style={{ width: '50px' }} value={newItem.tryNum} onChange={(e) => handlePopupInputChange('tryNum', e.target.value)} />
                        <label style={{ fontSize: '15px', marginRight: '10px' }}>지역 발전도:</label>
                        <input type="text" style={{ width: '50px' }} value={newItem.regionDev} onChange={(e) => handlePopupInputChange('regionDev', e.target.value)} />
                        <button className="submit-deny3" onClick={handlePopupSave}>확인</button>
                        </div>

                        <button className="submit-deny3" onClick={handleAddFullfillSet} style={{ marginLeft: '15px' }}>
                            추가
                        </button>
                    </div>
                </div>
            )}

            <h3 className="member-heading" style={{ color: 'white' }}>
                이행률 관리
            </h3>

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
                        <th>지역 발전도</th>
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
                            <td>{editIndex === index ? <input type="text" style={{ width: '25px' }} value={data.planNum} onChange={(e) => handleInputChange(index, 'planNum', e.target.value)} /> : data.planNum}</td>
                            <td>{editIndex === index ? <input type="text" style={{ width: '25px' }} value={data.completeNum} onChange={(e) => handleInputChange(index, 'completeNum', e.target.value)} /> : data.completeNum}</td>
                            <td>{editIndex === index ? <input type="text" style={{ width: '25px' }} value={data.tryNum} onChange={(e) => handleInputChange(index, 'tryNum', e.target.value)} /> : data.tryNum}</td>
                            <td>{editIndex === index ? <input type="text" style={{ width: '25px' }} value={data.regionDev} onChange={(e) => handleInputChange(index, 'regionDev', e.target.value)} /> : data.regionDev}</td>
                            <td>{data.fulfillment}%</td>
                            <td style={{ width: '120px' }}>
                                {editIndex === index ? (
                                    <>
                                        <button className="submit-deny2" onClick={() => handleSave(index)}>
                                            저장
                                        </button>
                                        <button className="submit-deny2" onClick={handleCancel}>
                                            취소
                                        </button>
                                    </>
                                ) : (
                                    <button className="submit-deny2" onClick={() => handleEdit(index)}>
                                        수정
                                    </button>
                                )}
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
        </div>
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
