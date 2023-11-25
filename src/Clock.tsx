import React, { useState, useEffect } from 'react';
import './clock.css';

const Clock: React.FC = () => {
    const [isMilitary, setIsMilitary] = useState<boolean>(false); // State to track view mode

    // Function to get the current time string based on the view mode
    const getCurrentTimeString = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        if (!isMilitary) {
            // Convert to 12-hour format without AM/PM
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
        }

        // 24-hour format
        return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    };

    const [time, setTime] = useState<string>(getCurrentTimeString());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getCurrentTimeString());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [isMilitary]);

    // Function to toggle the view mode
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
