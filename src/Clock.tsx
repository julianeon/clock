import React, { useState, useEffect } from 'react';
import './clock.css';

const Clock: React.FC = () => {
    const [isMilitary, setIsMilitary] = useState<boolean>(false); 

    const getCurrentTimeString = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        if (!isMilitary) {
            hours = hours % 12;
            hours = hours ? hours : 12; 
            return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
        }

        return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    };

    const [time, setTime] = useState<string>(getCurrentTimeString());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getCurrentTimeString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isMilitary]);

    const toggleView = () => {
        setIsMilitary(!isMilitary);
    };

    return (
        <div id="clock" onClick={toggleView} style={{ color: isMilitary ? 'yellow' : '#7CB9E8' }}>
            {time}
        </div>
    );
};

export default Clock;
