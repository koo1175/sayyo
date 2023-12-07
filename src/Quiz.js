import { Link } from 'react-router-dom';

export default function Quiz() {
    return (
        <div style={{display: 'flex', flexDirection: 'column',backgroundColor:'#E4F7BA', height: '100vh', width: '1900px',marginLeft:'-310px', display: 'flex', justifyContent: 'center', alignItems: 'center',color:'black'}}>
            <h1 style={{fontSize:'50px'}}>Are You Ready?</h1>
            <img src="/img/loading-unscreen.gif" alt="Loading..." style={{marginTop: '-100px'}}/>
            <Link to="/quizpage">
                <img src="/img/btn_start.png" alt="startbutton" style={{width: '150px', height: '75px',marginTop: '-70px'}} />
            </Link>
       </div>
    );
}