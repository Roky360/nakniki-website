import React, {useRef} from 'react';
import Popup from 'reactjs-popup';
import Icon from "./Icon";
// import {usePopup} from "../services/PopupContext";

const DefaultPopup = React.forwardRef((props, ref) => {
    const {triggerElement, content, modal = false, position = {}, onOpen, showCloseButton = true} = props;
    const defaultRef = useRef(null);
    const popupRef = ref || defaultRef;

    // const {openPopup, closePopup, activePopup} = usePopup();
    // const handleOpenPopup = (e) => {
    //     // e.stopPropagation();
    //     openPopup(popupRef); // close previous popup and set this as active
    // };
    //
    // const handleClosePopup = () => {
    //     if (activePopup === popupRef) {
    //         closePopup(popupRef);
    //     }
    // };

    return (
        <Popup
            position={position}
            ref={popupRef}
            trigger={triggerElement}
            modal={modal}
            onOpen={onOpen}
        >
            <div className="popup">
                {/* close button */}
                {showCloseButton &&
                    <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                        <button className="btn" onClick={() => popupRef.current.close()}>
                            <Icon icon="close"/>
                        </button>
                    </div>
                }
                {content}
            </div>
        </Popup>

    );
});

export default DefaultPopup;