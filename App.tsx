import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import InteractiveContainer from './components/Core/InteractiveContainer.tsx';
import { createTheme } from './theme.ts';

const App: React.FC = () => {
    // For demonstration, we'll use a dark theme. A full implementation could use a theme switcher.
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
        userSelect: 'none',
    };

    const textContainerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.space.s,
        maxWidth: '600px',
        // Make text immune to the hover effect
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

export default App;