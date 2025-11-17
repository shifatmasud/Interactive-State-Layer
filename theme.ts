
import type { CSSProperties } from 'react';

// TIER 2: DESIGN SYSTEM

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

// Achromatic Grayscale + Feedback Color System (Semantic Tokens)
const colors = {
    light: {
        'Color/Base/Surface/1': '#FFFFFF',
        'Color/Base/Surface/2': '#F0F0F0',
        'Color/Base/Surface/3': '#E0E0E0',
        'Color/Base/Content/1': '#1A1A1A',
        'Color/Base/Content/2': '#4D4D4D',
        'Color/Base/Content/3': '#808080',
        'Color/Feedback/Focus/1': '#3B82F6', // Blue
    },
    dark: {
        'Color/Base/Surface/1': '#121212',
        'Color/Base/Surface/2': '#1E1E1E',
        'Color/Base/Surface/3': '#2C2C2C',
        'Color/Base/Content/1': '#E0E0E0',
        'Color/Base/Content/2': '#BDBDBD',
        'Color/Base/Content/3': '#888888',
        'Color/Feedback/Focus/1': '#60A5FA', // Light Blue
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

export const createTheme = (mode: 'light' | 'dark') => ({
    colors: colors[mode],
    space,
    time,
    typography,
});
