import React from 'react';
import { useUser } from '../services/UserContext';
import AvatarCircle from "./AvatarCircle";

const UserPopupContent = () => {
    const { user, logOut } = useUser();

    const handleLogOut = () => {
        logOut();
    };

    return (
        <div style={{width:'400px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{marginRight: '20px'}}>
                    <AvatarCircle src={user.profile_pic} radius="65px"/>
                </div>
                <div>
                    <p className={"title-1"}
                       style={{margin: '0', fontSize: '26px', marginTop: '-15px'}}>{user.username}</p>
                    <p className={"title-1"} style={{margin: '0', fontSize: '16px'}}>{user.email}</p>
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
