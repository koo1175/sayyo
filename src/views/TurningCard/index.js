import React from "react";
import './style.css';

export default function TurningCard() {
    return (
        <div style={{marginTop:'90%'}}>
            <div>
            <div className="card2" style={{marginLeft:-500}}>
                <div className="content2">
                    <div className="front">
                        Front
                        {/*<img src="" alt=""/>*/}
                    </div>
                    <div className="back">
                        Back!
                    </div>
                </div>
            </div>
            </div>
            <div>
            <div className="card2">
                <div className="content2">
                    <div className="front">
                        Front
                        {/*<img src="" alt=""/>*/}
                    </div>
                    <div className="back">
                        Back!
                    </div>
                </div>
            </div>
            </div>
            <div>
            <div className="card2" style={{marginLeft: 200}}>
                <div className="content2">
                    <div className="front">
                        Front
                        {/*<img src="" alt=""/>*/}
                    </div>
                    <div className="back">
                        Back!
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}