import React from 'react';
import { useUser } from '../services/UserContext';
import AvatarCircle from "./AvatarCircle";
import { useNavigate } from 'react-router-dom';

const UserPopupContent = () => {
    const { user, saveUser } = useUser();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        // navigate to home page
        await navigate('/');

        setTimeout(() => saveUser(null), 100);
    };

    return (
        <div style={{width:'400px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{marginRight: '20px'}}>
                    <AvatarCircle src={user.profile_pic} radius="65px"/>
                </div>
                <div>
                    <p className={"paragraph"}
                       style={{margin: '0', fontSize: '26px', marginTop: '-15px'}}><strong>{user.username}</strong></p>
                    <p className={"paragraph"} style={{margin: '0', fontSize: '16px'}}>{user.email}</p>
                </div>
                <div>
                    <p
                        className={"btn-main"}
                        onClick={handleLogOut}
                        style={{
                            cursor: 'pointer',
                            marginLeft: '35px',
                            marginTop: '15px'
                        }}
                    >
                        Logout
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserPopupContent;
