import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import "../../styles/Dashbord.css"; 

const InfoCard = ({ title, value, unit, change, status }) => {
    const isUp = status === 'up';
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        let startValue = 0;
        let endValue = value;
        let duration = window.innerWidth >= 2560 ? 600 : 300; // longer animation for 2K/4K
        let stepTime = 4;

        const increment = (endValue - startValue) / (duration / stepTime);

        const interval = setInterval(() => {
            startValue += increment;
            if (startValue >= endValue) {
                clearInterval(interval);
                setAnimatedValue(endValue);
            } else {
                setAnimatedValue(Math.round(startValue));
            }
        }, stepTime);

        return () => clearInterval(interval);
    }, [value]);

    return (
        <div className="info-card">
            <div className={`vertical-bar ${isUp ? 'up' : 'down'}`}></div>

            <div className="info-content">
                <div className="info-header">
                    <div className="info-title">{title}</div>
                </div>

                <div className="info-value">
                    {animatedValue}
                    <span className="info-unit">{unit}</span>
                </div>

                <div className={`info-change ${isUp ? 'positive' : 'negative'}`}>
                    {isUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    <span className="change-value">{change}</span>
                    <span className="change-text">Since Yesterday</span>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;