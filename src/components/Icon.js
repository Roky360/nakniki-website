function Icon({className="", icon, color="white", padding="5pt", border=false, onClick=null}) {
    return (
        <span className={`material-icons ${className}`}
              style={{color: color, padding: padding, outline: border ? `1px solid ${color}` : 'none'}}
              onClick={onClick}
        >
            {icon}
        </span>
    );
}

export default Icon;
