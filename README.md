
# Interactive State Layer

This project is a React application demonstrating an advanced, human-centered UI interaction pattern known as a "state layer." It adheres to a strict, modular, and scalable design system.

## ELI10 TLDR

When you move your mouse over the screen, a circle appears and follows it. When you stop moving the mouse and leave the area, the circle disappears. It's a fancy visual effect that makes the UI feel more alive and responsive to you.

## Features

- **Full-Viewport Interaction**: The entire screen is a canvas for the effect.
- **Cursor-Aware Animation**: The state layer originates precisely from the cursor or touch point.
- **Fluid Motion**: Animations are handled by Framer Motion, following a 100ms-based timing system for a smooth, natural feel.
- **CSS-in-JS**: All styling is handled within JavaScript objects, ensuring components are self-contained.
- **Design Token System**: The project includes a theme system providing consistent values for colors, typography, and spacing.
- **Self-Contained**: All logic is now contained within a single file (`statelayer.tsx`) for easy reference.

## Directory Tree

```
.
├── README.md
├── assets/
│   └── (empty)
├── bugReport.md
├── index.html
├── importmap.js
├── metadata.json
├── noteBook.md
└── statelayer.tsx
```

## How to Run

1.  Ensure you have a local web server that can serve static files.
2.  Serve the root directory of this project.
3.  Open the served URL in your browser.