# AI Marketing Campaign Generator

A sophisticated web application that generates AI-powered marketing campaigns tailored to specific customer personas. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Persona-Driven Campaigns**: Generate campaigns for "Budget-Conscious Students," "Luxury Tech Enthusiasts," and "Eco-Friendly Families"
- **Multi-Channel Content**: Create email campaigns, social media posts, and ad visuals
- **Quality Scoring**: AI-powered quality scores for each piece of content
- **One-Click Copying**: Easy clipboard functionality for all generated content
- **Dark/Light Mode**: Toggle between themes for comfortable viewing

### User Interface
- **Tabbed Navigation**: Organized content display across Email Campaign, Social Media, and Ad Visuals tabs
- **Interactive Sidebar**: Marketing-focused navigation with campaign management tools
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Professional Styling**: Clean, modern interface designed for marketing professionals

### Campaign Content Types

#### Email Campaigns
- Subject line optimization
- Personalized email body content
- Quality scoring for effectiveness

#### Social Media
- Platform-specific content (Instagram, Facebook, LinkedIn, TikTok)
- Hashtag optimization
- Engagement-focused messaging

#### Ad Visuals
- AI-generated visual concepts
- Quality assessment scores
- Platform-optimized formats

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/balu1305/market-campain-llm.git
cd market-campain-llm
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🎯 Usage

### Selecting a Persona
1. Use the dropdown in the top bar to select your target audience
2. Choose from pre-defined personas or create custom ones

### Generating Content
1. Navigate through the tabs (Email Campaign, Social Media, Ad Visuals)
2. Review AI-generated content for your selected persona
3. Use the "Copy" button to copy content to your clipboard
4. Check quality scores to optimize your campaigns

### Theme Customization
- Toggle between dark and light modes using the theme button
- Interface adapts automatically for optimal viewing

## 📊 Campaign Personas

### Budget-Conscious Students
- Focus on affordability and value
- Casual, relatable messaging
- Student discount emphasis

### Luxury Tech Enthusiasts
- Premium positioning and exclusivity
- Professional, sophisticated tone
- Innovation and quality focus

### Eco-Friendly Families
- Sustainability and family values
- Warm, community-focused messaging
- Environmental impact emphasis

## 🎨 Design System

The application uses a comprehensive design system with:
- Consistent color palette for light and dark modes
- Typography hierarchy for content organization
- Interactive states and animations
- Accessible contrast ratios and navigation

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Top navigation
│   ├── Sidebar.tsx     # Marketing navigation
│   └── PromoBar.tsx    # Promotional banner
├── pages/              # Page components
│   ├── Index.tsx       # Main campaign generator
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── styles/             # Global styles
```

## 🚀 Deployment

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

Built with ❤️ for marketing professionals who want to leverage AI for better campaigns.
