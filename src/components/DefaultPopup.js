import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../style/index.css';

const DefaultPopup = React.forwardRef((props, ref) => {
    const { triggerElement, content, modal = false } = props;

    return (
        <Popup ref={ref} trigger={triggerElement} modal={modal}>
            <div className="default-popup-inner">
                {content} {}
            </div>
        </Popup>
    );
});

export default DefaultPopup;