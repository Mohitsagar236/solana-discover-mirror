# Axiom Trade - Improved Version

![Axiom Trade](https://img.shields.io/badge/version-2.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite)

> **The Gateway to DeFi** - A modern, improved trading platform for the Solana ecosystem.

This is an enhanced version of [axiom.trade](https://axiom.trade/), featuring improved UI/UX, better performance, and comprehensive trading features.

## 🚀 What's New in v2.0

### ✨ Enhanced Components
- **Hero Section**: Added smooth animations, better CTAs, and gradient effects
- **Navigation**: Improved navbar with active state indicators and smooth transitions
- **Features**: Enhanced feature cards with hover effects and better iconography
- **Rewards System**: Linked reward cards with proper routing
- **Footer**: Added social media links (Twitter, Discord) and improved layout
- **Integration Showcases**: New component for Hyperliquid and MarginFi integrations

### 📄 Improved Pages
- **Home (/)**: Complete redesign with all sections from axiom.trade
- **Discover (/discover)**: Enhanced token discovery with filtering by category
- **Perpetuals (/perpetuals)**: Professional trading interface showcase
- **Yield (/yield)**: Comprehensive yield farming options
- **Trading (/trading)**: Advanced trading dashboard
- **All other pages**: Consistent styling and improved navigation

### 🎨 Design Improvements
- Consistent color scheme with primary/accent gradients
- Better spacing and typography
- Smooth transitions and hover effects
- Responsive design for all screen sizes
- Accessibility improvements

### 🔧 Technical Enhancements
- Upgraded to v2.0.0
- Better code organization
- TypeScript best practices
- React Router v6 integration
- shadcn/ui component library
- Tailwind CSS for styling

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack React Query 5.83.0
- **Icons**: Lucide React

## 📁 Project Structure

```
solana-discover-mirror/
├── public/
│   ├── images/
│   │   └── landing-page/     # Landing page assets
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── CTA.tsx
│   │   ├── FAQ.tsx
│   │   ├── FeatureDetail.tsx
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── IntegrationShowcase.tsx
│   │   ├── Navbar.tsx
│   │   ├── NavLink.tsx
│   │   └── Rewards.tsx
│   ├── pages/
│   │   ├── Index.tsx         # Home page
│   │   ├── Discover.tsx      # Token discovery
│   │   ├── Trading.tsx       # Trading dashboard
│   │   ├── Perpetuals.tsx    # Perps trading
│   │   ├── Yield.tsx         # Yield farming
│   │   ├── Portfolio.tsx     # User portfolio
│   │   ├── Wallet.tsx        # Wallet management
│   │   ├── RewardsPage.tsx   # Rewards program
│   │   ├── Referrals.tsx     # Referral system
│   │   ├── Leaderboard.tsx   # Trading leaderboard
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Docs.tsx
│   │   ├── Privacy.tsx
│   │   ├── Terms.tsx
│   │   └── NotFound.tsx
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## 🎯 Features

### Trading Features
- **Spot Trading**: Trade tokens with deep liquidity
- **Perpetuals**: Leverage trading up to 50x (powered by Hyperliquid)
- **Yield Farming**: Earn up to 15% APY (powered by MarginFi)
- **Portfolio Tracking**: Monitor your assets in real-time
- **Wallet Integration**: Non-custodial wallet with Turnkey security

### Advanced Features
- **Order Execution Engine**: Land orders in ≤ 1 block
- **Migration Sniper**: Buy/sell migrating tokens instantly
- **MEV Protection**: Frontrunning and sandwiching protection
- **Auto-Strategies**: One-click trading strategies

### Rewards & Gamification
- **Trading Rewards**: Earn SOL from trading
- **Rank System**: Progress through ranks for higher rewards
- **Referral Program**: Earn from your network
- **Axiom Points**: Quest and trading rewards

## 🔐 Security

- Non-custodial architecture
- Powered by Turnkey's key management
- Audited smart contracts
- MEV-resistant execution paths

## 🌐 Integrations

- **Hyperliquid**: Perpetual futures trading
- **MarginFi**: Yield generation
- **Coinbase**: Fiat on-ramp (up to $500/week, no-KYC)
- **Turnkey**: Secure wallet infrastructure

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1280px - 1919px)
- Tablet (768px - 1279px)
- Mobile (320px - 767px)

## 🚦 Development

### Branch Strategy
- `main`: Production-ready code
- `improved-site`: Enhanced version with v2.0 improvements

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## 📈 Performance

- Vite for lightning-fast HMR
- Code splitting for optimal loading
- Lazy loading for routes
- Optimized images and assets

## 🤝 Contributing

This is a mirror/improved version of the original axiom.trade. For contributions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

© 2025 Axiom. All rights reserved.

## 🔗 Links

- **Original Site**: [axiom.trade](https://axiom.trade/)
- **Documentation**: [docs.axiom.trade](https://docs.axiom.trade/)
- **Twitter**: [@axiomexchange](https://x.com/axiomexchange)
- **Discord**: [axiomtrade](https://discord.gg/axiomtrade)
- **Backed by**: [Y Combinator](https://www.ycombinator.com/)

---

Built with ❤️ using React, TypeScript, and Vite.
