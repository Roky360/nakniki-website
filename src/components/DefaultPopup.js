import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../style/index.css'

const DefaultPopup = ({ triggerElement, content, position = "right center", modal = false }) => {
    return (
        <Popup trigger={triggerElement} position={position} modal={modal} nested>
            <div className="default-popup-inner">
                {content}
            </div>
        </Popup>
    );
};

export default DefaultPopup;