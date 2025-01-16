import React from 'react';

class Alert extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // define the state
        this.state = {
            visible: true,
        };

        // function timout, the alert will show up for a few seconds
        setTimeout(() => {
            this.setState({ visible: false });
        }, 4000);
    }

    render() {
        // get the message, alert type and visible
        const { message, type } = this.props;
        const { visible } = this.state;

        // define the alert style according to type
        const alertStyle = {
            success: { backgroundColor: '#13b407', color: 'black' },
            error: { backgroundColor: '#a20a0a', color: 'white' },
            warning: { backgroundColor: '#c7c709', color: 'black' },
            info: { backgroundColor: '#A9A9A9', color: 'black' },
        }

        // get the alert type
        const alertType = alertStyle[type] || alertStyle.info;

        // define the fade
        const fadeStyle = {
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease-out',
        };

        // return the alert
        return (
            <div
                style={{
                    ...alertType,
                    padding: '10px 20px',
                    borderRadius: '5px',
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '10px',
                    zIndex: 1000,
                    ...fadeStyle,
                }}
            >
                <span>{message}</span>
            </div>
        );

    }
}

export default Alert;