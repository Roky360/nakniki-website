import {useEffect, useState} from 'react';
import Icon from "./Icon";

function ThemeSwitcherButton() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const initTheme = document.documentElement.getAttribute('data-theme');
        setTheme(initTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <Icon className="pressable" icon={`${theme === 'light' ? 'dark' : 'light'}_mode`} onClick={toggleTheme}/>
    );
}

export default ThemeSwitcherButton;
