import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Navigation() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '200px', marginTop: '10px' }}>
                <Link to="/">
                    <img
                        alt="sayoLogo"
                        src="/img/sayoLogo.png"
                        height={80}
                        onClick={() => handleClick('/Map')}
                    />
                </Link>
            </div>
            <div style={{ margin: '-57px 0px 0px 0px', fontSize: '20px', marginLeft: '400px' }}>
                <Link to="/OrganizationChart" style={{ textDecoration: 'none', margin: '0px 250px 0px 0px', color: '#444444', fontWeight: 'bolder' }} onClick={() => handleClick('/OrganizationChart')}>조직도</Link>
                <Link to="/Board" style={{ textDecoration: 'none', margin: '0px 250px 0px 0px', color: '#444444', fontWeight: 'bolder' }} onClick={() => handleClick('/Board')}>게시판</Link>
                <Link to="/Community" style={{ textDecoration: 'none', margin: '0px 250px 0px 0px', color: '#444444', fontWeight: 'bolder' }} onClick={() => handleClick('/Community')}>커뮤니티</Link>
                <Link to="/AboutUs" style={{ textDecoration: 'none', margin: '0px 250px 0px 0px', color: '#444444', fontWeight: 'bolder' }} onClick={() => handleClick('/AboutUs')}>AboutUs</Link>
            </div>
        </div>
    );
}

export default Navigation;