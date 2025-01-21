import {Badge} from "react-bootstrap";
import Icon from "./Icon";
import DefaultPopup from "./DefaultPopup";
import CreateCategory from "../screens/CreateCategory";
import {sendDelete} from "../services/RequestSender";
import {useUser} from "../services/UserContext";
import {useRef} from "react";

function CategoryBadge({name: category, showControls = false, onEdit, onDelete}) {
    const {user} = useUser();
    const popupRef = useRef(null);
    const iconStyle = {fontSize: '13pt'};
    const iconPadding = '3pt';

    const onDeleteClicked = async () => {
        await sendDelete(`/categories/${category._id}`, user.token)
            .then(res => {
                if (res.status === 204) {
                    if (onDelete) {
                        onDelete();
                    }
                }
            })
            .catch()
    }

    return (
        <Badge className="cat-badge" style={{cursor: 'default'}}>
            {category.name}
            {showControls &&
                <>
                    <span className="p-1"/>
                    <DefaultPopup
                        modal
                        ref={popupRef}
                        triggerElement={
                            <Icon icon="edit" style={iconStyle} padding={iconPadding}/>
                        }
                        content={<CreateCategory
                            category={category}
                            onComplete={onEdit}
                            closePopup={() => popupRef.current.close()}
                        />}
                    />

                    <Icon icon="delete" style={iconStyle} padding={iconPadding} onClick={onDeleteClicked}/>
                </>
            }
        </Badge>
    );
}

export default CategoryBadge;
