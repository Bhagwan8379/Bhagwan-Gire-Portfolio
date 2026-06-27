# Themed Toast Notifications

## Overview
The application now features **theme-aware toast notifications** that automatically adapt their styling based on the selected layout/theme. Each theme has its own unique visual identity and animations.

## Theme Styles

### Layout1 - Professional Theme
- **Style**: Clean gradient (Purple to Violet)
- **Animation**: Smooth slide-in from right
- **Design**: Modern, professional with subtle shadows
- **Font**: Medium weight, 14px
- **Border**: Subtle white border with backdrop blur

### Layout2 - Gradient Theme  
- **Style**: Vibrant multi-gradient (Purple → Violet → Pink)
- **Animation**: Bouncy slide-in with scale effect
- **Design**: Eye-catching with enhanced glow effects
- **Font**: Semi-bold, 15px
- **Border**: Prominent white border with strong shadows

### Layout3 - Hacker Theme
- **Style**: Matrix-style terminal (Dark green background)
- **Animation**: Glitch effect with color shifts
- **Design**: Retro terminal with monospace font
- **Font**: Courier New, 13px
- **Border**: Green border with text shadow and glow
- **Special**: Prefix with `> ` and flickering icon

### Layout6 - Obsidian Codex Theme
- **Style**: Dark academia (Deep obsidian black background)
- **Animation**: Smart slide-in from right
- **Design**: Minimalist terminal/book style with gold accents
- **Font**: Space Mono, 13px
- **Border**: Thin gold border with subtle gold outer glow
- **Special**: Match color theme of obsidian panels

### Layout7 - Aura Glassmorphism Theme
- **Style**: Ultra-frosted glass with ambient colored shadows
- **Animation**: Scale slide-in from right
- **Design**: Rounded modern glassy cards
- **Font**: Outfit, 14px
- **Border**: 1px translucent border with blur saturator
- **Special**: Immersive backdrop blur (20px)

## Toast Types & Colors

### Success Toasts
- **Layout1**: Green gradient (#10b981 → #059669)
- **Layout2**: Vibrant green gradient with highlights
- **Layout3**: Bright green (#00ff41) terminal style
- **Layout6**: Sleek green text/border with black background
- **Layout7**: Frosted glass green card (#10b981 tint) with success glow

### Error Toasts
- **Layout1**: Red gradient (#ef4444 → #dc2626)
- **Layout2**: Vibrant red gradient with highlights
- **Layout3**: Bright red (#ff0000) terminal style
- **Layout6**: Sleek red text/border with black background
- **Layout7**: Frosted glass red card (#ef4444 tint) with error glow

### Info Toasts
- **Layout1**: Blue gradient (#3b82f6 → #2563eb)
- **Layout2**: Vibrant blue gradient with highlights
- **Layout3**: Cyan (#00d4ff) terminal style
- **Layout6**: Sleek gold text/border with black background
- **Layout7**: Frosted glass purple card (#8b5cf6 tint) with violet glow

### Warning Toasts
- **Layout1**: Orange gradient (#f59e0b → #d97706)
- **Layout2**: Vibrant orange gradient with highlights
- **Layout3**: Yellow (#ffff00) terminal style
- **Layout6**: Sleek orange text/border with black background
- **Layout7**: Frosted glass amber card (#f59e0b tint) with warning glow

## Usage Examples

```javascript
import { toast } from 'sonner';

// Success notification
toast.success("✅ Message sent successfully!");

// Error notification
toast.error("❌ Something went wrong!");

// Info notification
toast.info("ℹ️ Please wait...");

// Warning notification
toast.warning("⚠️ Are you sure?");
```

## Features

### Automatic Theme Detection
The toast styling automatically updates when the user switches themes via the navbar dropdown. No manual configuration needed.

### Animations
- **Professional**: Smooth slide-in
- **Gradient**: Bouncy entrance with pulse effect on icon
- **Hacker**: Glitch effect with color shifts and flickering icon

### Responsive Design
Toast notifications automatically adjust their size and padding on mobile devices for optimal viewing.

### Close Button
Each toast includes a styled close button that matches the theme:
- Hover effects with scale animation
- Theme-specific colors (especially for hacker theme)

## Technical Implementation

### Files Created
1. `src/utils/ThemedToaster.jsx` - Main component with theme logic
2. `src/utils/ThemedToaster.css` - Custom styling and animations

### Integration
The `ThemedToaster` component is integrated at the app level in `App.jsx`, replacing the default Sonner `Toaster` component.

### Redux Integration
Uses Redux state (`state.auth.layout`) to determine the current theme and apply appropriate styling.

## Customization

To modify toast behavior for a specific theme, edit the `getThemeConfig()` function in `ThemedToaster.jsx`:

```javascript
case 'Layout1':
    return {
        position: 'top-right',
        toastOptions: {
            style: {
                // Your custom styles here
            },
            duration: 4000, // Adjust duration
        },
    };
```

## Browser Compatibility
- Modern browsers with CSS backdrop-filter support
- Graceful degradation for older browsers
- Mobile-responsive design

---

**Note**: The toast notifications now perfectly complement the particle cursor colors, creating a cohesive visual experience across all themes!
