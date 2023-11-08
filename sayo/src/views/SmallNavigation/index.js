import React from "react";
import { Link } from "react-router-dom";

export default function SmallNavigation() {

    return (
      
      <div>
          <div style={{fontSize: '20px',fontWeight:'bolder', marginLeft: '230px'}}>
          <Link to="/Info" style={{textDecoration: 'none',  margin: '0px 150px 0px 0px', color: '#B9B9B9'}}>
              정보
          </Link>
          <Link to="/Promise"style={{textDecoration: 'none',  margin: '0px 150px 0px 0px', color: '#B9B9B9'}}>공약</Link>
          <Link to="/News"style={{textDecoration: 'none',  margin: '0px 150px 0px 0px', color: '#B9B9B9'}}>관련기사</Link>
          </div>
      </div>
      
        );
}
