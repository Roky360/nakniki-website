import {useEffect, useState} from 'react';
import Icon from "./Icon";

function ThemeSwitcherButton() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.body.className = theme;
        updateTheme(savedTheme);
    }, [theme]);

    // update theme stylesheet
    const updateTheme = (newTheme) => {
        const themeLink = document.getElementById('theme-stylesheet');
        themeLink.href = `/styles/${newTheme}.css`;
    }

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.body.className = newTheme;
        setTheme(newTheme);
        updateTheme(newTheme);
    };

    return (
        <Icon className="pressable" icon={`${theme === 'light' ? 'dark' : 'light'}_mode`} onClick={toggleTheme}/>
    );
}

export default ThemeSwitcherButton;
