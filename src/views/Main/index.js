import React from "react";
import PopUPModal from "../PopUpModal";
import Map from "../Map"
import { useLocation } from 'react-router-dom';

export default function Main() {

    // const location = useLocation();
    // const memberInfo = location.state.memberInfo;

    return (
        <div>
        <div style={{ marginTop:'20px' }}>
            <PopUPModal/>
        </div>
            <Map/>
        </div>
        );
}