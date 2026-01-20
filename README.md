# StreamX - Astro Streaming UI Starter

A high-performance, static-only Streaming App UI Starter built with **Astro** and **TailwindCSS**.  
Designed for speed, low resource usage, and mobile-first experience.

## 🚀 Features

- **Zero-JS Runtime** (mostly): Pure HTML/CSS output for maximum performance.
- **Mobile First Design**: Bottom navigation for mobile, standard navbar for desktop.
- **Production Grade UI**: Components for cards, heros, players, and forms.
- **Theme System**: Dark-mode first using CSS variables and Tailwind.
- **Placeholder Data System**: Integrated mock data generator for prototyping.

## 🛠 Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Icons**: SVG (Lucide-style)
- **Deployment**: Static (Nginx, Vercel, Netlify, etc.)

## 📂 Project Structure

```bash
src/
├── components/
│   ├── ui/          # Base UI (Button, Input, Badge)
│   ├── media/       # Media specific (Card, Player, Hero)
│   ├── layout/      # Navbars, Footers
│   └── common/      # Shared utilities
├── layouts/         # Page layouts (Main, Auth)
├── pages/           # Route definitions
│   ├── auth/        # Login/Register
│   ├── detail/      # Movie details ([id])
│   ├── watch/       # Video player ([id])
│   └── ...
├── data/            # Mock data generators
└── styles/          # Global CSS & Theme vars
```

## ⚡ Quick Start

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```
    Output will be in `dist/`.

## 🎨 Customization

### Colors
Edit `src/styles/global.css` to change the theme variables:

```css
:root {
  --color-accent: #e50914; /* Change this to your brand color */
  --color-bg-base: #0f0f0f;
}
```

### Data
Modify `src/data/placeholder.ts` to change the mock data or replace it with a real API fetch in the `getStaticPaths` functions.

## 📱 Mobile Optimization

The app includes a specialized `BottomNav.astro` component that only appears on mobile screens (< 768px), providing a native-app feel.