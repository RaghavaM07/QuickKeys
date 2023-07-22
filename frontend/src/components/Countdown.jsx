import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ deadline, setFlag }) => {
    const calculateTimeRemaining = () => {
        const now = new Date().getTime();
        const targetTime = deadline.getTime();
        const timeRemaining = targetTime - now;

        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        return {
            minutes,
            seconds,
        };
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = calculateTimeRemaining();
            setTimeRemaining(remaining);

            if (remaining.minutes === 0 && remaining.seconds === 0) {
                clearInterval(timer);
                setFlag(false); // Set the flag state to true after the countdown finishes
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [deadline, setFlag]);

    return (
            <div className="p-5 h-1/3 flex justify-around items-center border-2 rounded-t-lg bg-white">
                <p className="font-semibold text-4xl">{`${timeRemaining.minutes.toString().padStart(2, '0')}:${timeRemaining.seconds.toString().padStart(2, '0')}`} seconds to start the Game...</p>
            </div>
    );
};

export default CountdownTimer;
