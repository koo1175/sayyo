import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

export default function PopUPModal() {
    const [isModalOpen, setModalOpen] = useState(true);
    const [doNotShowAgain, setDoNotShowAgain] = useState(false);

    useEffect(() => {
        const storedValue = localStorage.getItem('doNotShowAgain');
        if (storedValue) {
            setDoNotShowAgain(JSON.parse(storedValue));
        }
    }, []);

    const customStyles = {
        content: {
            width: '500px',
            height: '440px',
            margin: '0 auto',
        },
    };

    const centerImageStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const handleDoNotShowAgain = () => {
        setDoNotShowAgain(!doNotShowAgain);
        setModalOpen(false);
        localStorage.setItem('doNotShowAgain', JSON.stringify(!doNotShowAgain));
    };

    const navigate = useNavigate();

    const goSecretPage = () => {
        setModalOpen(false); // 팝업 창을 닫음
        navigate('/MockElectionComponent');
    };

    return (
        <div>
            <Modal
                isOpen={isModalOpen && !doNotShowAgain}
                onRequestClose={() => setModalOpen(false)}
                style={customStyles}
            >
                <button
                    onClick={() => setModalOpen(false)}
                    style={{
                        display: 'block',
                        height: '30px',
                        width: '30px',
                        backgroundColor: '#D9D9D9',
                        borderRadius: '20%',
                        border: 'none',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        cursor: 'pointer',
                    }}
                >
                    x
                </button>

                <img
                    alt="popup"
                    src="/img/popup.png"
                    style={{ width: '100%' }}
                />

<div style={centerImageStyle}>
    <button
        onClick={goSecretPage} // 버튼 클릭 시 이 이벤트를 처리
        style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer'
        }}
    >
        <img
            alt="popup_checkup_btn"
            src="/img/popup_checkup_btn.png"
            style={{ width: '30%' }}
        />
    </button>
</div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={doNotShowAgain}
                            onChange={handleDoNotShowAgain}
                        />
                        이 창 다시 보지 않기
                    </label>
                </div>
            </Modal>
        </div>
    );
}
