import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Warn from '../img/warning.png';

const NotFoundPage = () => {
    
    return (
        <div style={{ alignItems:'center', justifyContent : 'center', display: 'flex', marginTop: '100px', width: '670px', border: '1px solid lightgray', borderRadius: '20px'}}>
            <div style={{ alignItems:'center', textAlign:'center'}}>
                <img src={Warn} />
                <p>존재하지 않는 페이지입니다.</p>
                <Link to="/Main" style={{ textDecoration: 'none', color: '#444444', fontWeight: 'bolder' }}>메인으로 돌아가기</Link>

            </div>
        </div>
    );
}
export default NotFoundPage;