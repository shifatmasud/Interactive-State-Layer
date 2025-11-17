
import React, { useState } from 'react';
import type { CSSProperties, MouseEvent, TouchEvent } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, useMotionValue } from 'framer-motion';

// ====================================================================================
// TIER 2: DESIGN SYSTEM (THEME)
// Merged from theme.ts
// ====================================================================================

const createTheme = (mode: 'light' | 'dark') => {
    // 4pt Baseline Grid System
    const BASE_GRID = 4;
    const space = {
        '4xs': `${BASE_GRID * 1}px`, // 4px
        '3xs': `${BASE_GRID * 2}px`, // 8px
        '2xs': `${BASE_GRID * 3}px`, // 12px
        'xs': `${BASE_GRID * 4}px`,  // 16px
        's': `${BASE_GRID * 6}px`,  // 24px
        'm': `${BASE_GRID * 8}px`,  // 32px
        'l': `${BASE_GRID * 12}px`, // 48px
        'xl': `${BASE_GRID * 16}px`,// 64px
    };

    // 100ms Fluid Motion System
    const BASE_MOTION = 100;
    const time = {
        'short': `${BASE_MOTION * 2 / 1000}s`,  // 200ms
        'medium': `${BASE_MOTION * 3 / 1000}s`, // 300ms (Root)
        'long': `${BASE_MOTION * 5 / 1000}s`,   // 500ms
    };

    // Achromatic Grayscale + Feedback Color System
    const colors = {
        light: {
            'Color/Base/Surface/1': '#FFFFFF',
            'Color/Base/Surface/2': '#F0F0F0',
            'Color/Base/Surface/3': '#E0E0E0',
            'Color/Base/Content/1': '#1A1A1A',
            'Color/Base/Content/2': '#4D4D4D',
            'Color/Base/Content/3': '#808080',
            'Color/Feedback/Focus/1': '#3B82F6',
        },
        dark: {
            'Color/Base/Surface/1': '#121212',
            'Color/Base/Surface/2': '#1E1E1E',
            'Color/Base/Surface/3': '#2C2C2C',
            'Color/Base/Content/1': '#E0E0E0',
            'Color/Base/Content/2': '#BDBDBD',
            'Color/Base/Content/3': '#888888',
            'Color/Feedback/Focus/1': '#60A5FA',
        },
    };

    // Google Material Design Type Scale
    const typography: { [key: string]: { [key: string]: CSSProperties } } = {
        display: {
            l: { fontFamily: "'Bebas Neue', sans-serif", fontSize: '96px', lineHeight: '100px', fontWeight: 400, letterSpacing: '-1.5px' },
            m: { fontFamily: "'Bebas Neue', sans-serif", fontSize: '60px', lineHeight: '64px', fontWeight: 400, letterSpacing: '-0.5px' },
            s: { fontFamily: "'Bebas Neue', sans-serif", fontSize: '48px', lineHeight: '52px', fontWeight: 400, letterSpacing: '0px' },
        },
        headline: {
            l: { fontFamily: "'Inter', sans-serif", fontSize: '34px', lineHeight: '40px', fontWeight: 700, letterSpacing: '0.25px' },
            m: { fontFamily: "'Inter', sans-serif", fontSize: '24px', lineHeight: '32px', fontWeight: 700, letterSpacing: '0.15px' },
            s: { fontFamily: "'Inter', sans-serif", fontSize: '20px', lineHeight: '28px', fontWeight: 700, letterSpacing: '0.1px' },
        },
        title: {
            l: { fontFamily: "'Inter', sans-serif", fontSize: '20px', lineHeight: '28px', fontWeight: 500, letterSpacing: '0.15px' },
            m: { fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: '24px', fontWeight: 500, letterSpacing: '0.15px' },
            s: { fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: '20px', fontWeight: 500, letterSpacing: '0.1px' },
        },
        label: {
            l: { fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: '20px', fontWeight: 500, letterSpacing: '0.1px' },
            m: { fontFamily: "'Inter', sans-serif", fontSize: '12px', lineHeight: '16px', fontWeight: 500, letterSpacing: '0.5px' },
            s: { fontFamily: "'Inter', sans-serif", fontSize: '11px', lineHeight: '16px', fontWeight: 500, letterSpacing: '0.5px' },
        },
        body: {
            l: { fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: '24px', fontWeight: 400, letterSpacing: '0.5px' },
            m: { fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: '20px', fontWeight: 400, letterSpacing: '0.25px' },
            s: { fontFamily: "'Inter', sans-serif", fontSize: '12px', lineHeight: '16px', fontWeight: 400, letterSpacing: '0.4px' },
        },
        quote: {
            m: { fontFamily: "'Comic Neue', sans-serif", fontSize: '24px', lineHeight: '32px', fontWeight: 700, letterSpacing: '0.15px' },
        }
    };
    
    return {
        colors: colors[mode],
        space,
        time,
        typography,
    };
};


// ====================================================================================
// CORE COMPONENT: InteractiveContainer
// Merged from components/Core/InteractiveContainer.tsx
// ====================================================================================

interface InteractiveContainerProps {
    hoverColor: string;
}

const InteractiveContainer: React.FC<InteractiveContainerProps> = ({ hoverColor }) => {
    // State to track if the cursor/touch is inside the container.
    const [isActive, setIsActive] = useState(false);
    
    // Using Framer Motion's `useMotionValue` to track cursor coordinates.
    // This is a performance optimization: it allows us to update the position
    // of the motion component without triggering React re-renders on every mouse move.
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // --- Mouse Event Handlers ---
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        // Update the motion values with the latest cursor position.
        x.set(e.clientX);
        y.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        // Set initial position immediately on enter to prevent the circle
        // from jumping from its previous position (or 0,0).
        x.set(e.clientX);
        y.set(e.clientY);
        setIsActive(true);
    };

    const handleMouseLeave = () => {
        setIsActive(false);
    };

    // --- Touch Event Handlers (for mobile support) ---
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
        cursor: 'none', // Hide the system cursor for a cleaner look
        overflow: 'hidden', // Ensures the expanding circle is clipped by the container bounds
    };

    // Calculate the largest possible radius needed to cover the screen from any corner.
    // This is the hypotenuse of the screen's width and height.
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);
    const maxDiameter = maxRadius * 2;

    return (
        <div
            style={containerStyle}
            // Bind mouse events
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            // Bind touch events
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
                    // Bind motion values directly to style properties for smooth tracking
                    top: y,
                    left: x,
                }}
                // Animate width and height based on the `isActive` state
                animate={{
                    width: isActive ? maxDiameter : 0,
                    height: isActive ? maxDiameter : 0,
                }}
                // Use a spring transition for a natural, fluid motion
                transition={{
                    type: 'spring',
                    stiffness: 100, // How "stiff" the spring is
                    damping: 20,    // How much opposition the spring has
                    mass: 1,        // The mass of the object, affecting momentum
                }}
            />
        </div>
    );
};

// ====================================================================================
// APPLICATION ROOT: App
// Merged from App.tsx
// ====================================================================================

const App: React.FC = () => {
    // For this demonstration, we default to a dark theme.
    // A full implementation could use a theme switcher.
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
    const theme = createTheme(themeMode);

    const appStyle: CSSProperties = {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors['Color/Base/Surface/1'],
        color: theme.colors['Color/Base/Content/1'],
        fontFamily: theme.typography.body.l.fontFamily,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: theme.space.m,
        userSelect: 'none', // Prevent text selection
    };

    const textContainerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.space.s,
        maxWidth: '600px',
        // This is crucial: it makes the text layer "transparent" to mouse events,
        // so the hover effect on the background container is not blocked.
        pointerEvents: 'none', 
    };
    
    const heroStyle: CSSProperties = {
        ...theme.typography.display.l,
        color: theme.colors['Color/Base/Content/1'],
    };

    const bodyStyle: CSSProperties = {
        ...theme.typography.body.l,
        color: theme.colors['Color/Base/Content/2'],
    };
    
    return (
        <div style={appStyle}>
            <InteractiveContainer 
                hoverColor={theme.colors['Color/Base/Surface/2']}
            />
            <div style={textContainerStyle}>
                <h1 style={heroStyle}>State Layer</h1>
                <p style={bodyStyle}>
                    Move your cursor across the screen. This demonstrates the "State Layer" principle from Tier 2 of the design system. The interaction feels fluid and directly responsive to user input.
                </p>
            </div>
        </div>
    );
};

// ====================================================================================
// RENDER LOGIC
// Merged from index.tsx
// ====================================================================================

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
