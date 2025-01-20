import React from 'react';
import Popup from 'reactjs-popup';

const DefaultPopup = React.forwardRef((props, ref) => {
    const {triggerElement, content, modal = false} = props;

    return (
        <Popup
            ref={ref}
            trigger={triggerElement}
            modal={modal}
        >
            <div className="popup">
                {content}
            </div>
        </Popup>
    );
});

export default DefaultPopup;