import React, {useRef} from 'react';
import Popup from 'reactjs-popup';
import Icon from "./Icon";

const DefaultPopup = React.forwardRef((props, ref) => {
    const {triggerElement, content, modal = false, position = {}, showCloseButton = true} = props;
    const defaultRef = useRef(null);
    const popupRef = ref || defaultRef;

    return (
        <Popup
            position={position}
            ref={popupRef}
            trigger={triggerElement}
            modal={modal}
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