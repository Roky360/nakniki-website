import {Badge} from "react-bootstrap";
import Icon from "./Icon";

function CategoryBadge({name, onEditPressed, onDeletePressed}) {
    const iconStyle = {fontSize: '13pt'};
    const iconPadding = '3pt';
    return (
        <Badge className="cat-badge">
            {name}
            {(onEditPressed || onDeletePressed) &&
                <span className="p-1"/>
            }
            {onEditPressed &&
                <Icon icon="edit" style={iconStyle} padding={iconPadding} onClick={onEditPressed}/>
            }
            {onDeletePressed &&
                <Icon icon="delete" style={iconStyle} padding={iconPadding} onClick={onDeletePressed}/>
            }
        </Badge>
    );
}

export default CategoryBadge;
