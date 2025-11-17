import React, { useState } from 'react';
import type { CSSProperties, MouseEvent, TouchEvent } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface InteractiveContainerProps {
    hoverColor: string;
}

const InteractiveContainer: React.FC<InteractiveContainerProps> = ({ hoverColor }) => {
    const [isActive, setIsActive] = useState(false);
    
    // Using motion values to avoid re-renders on mouse/touch move for performance
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // --- Mouse Event Handlers ---
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        x.set(e.clientX);
        y.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        // Set initial position on enter to avoid jump from (0,0)
        x.set(e.clientX);
        y.set(e.clientY);
        setIsActive(true);
    };

    const handleMouseLeave = () => {
        setIsActive(false);
    };

    // --- Touch Event Handlers ---
    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (e.touches[0]) {
            x.set(e.touches[0].clientX);
            y.set(e.touches[0].clientY);
        }
    };

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        if (e.touches[0]) {
            x.set(e.touches[0].clientX);
            y.set(e.touches[0].clientY);
        }
        setIsActive(true);
    };

    const handleTouchEnd = () => {
        setIsActive(false);
    };

    const containerStyle: CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        cursor: 'none',
        overflow: 'hidden', // Clip the expanding circle
    };

    // The largest possible radius needed to cover the screen from any corner
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);
    const maxDiameter = maxRadius * 2;

    return (
        <div
            style={containerStyle}
            // Mouse events
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            // Touch events
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    backgroundColor: hoverColor,
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    // Bind motion values directly to style props for smooth tracking
                    top: y,
                    left: x,
                }}
                animate={{
                    width: isActive ? maxDiameter : 0,
                    height: isActive ? maxDiameter : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                }}
            />
        </div>
    );
};

export default InteractiveContainer;