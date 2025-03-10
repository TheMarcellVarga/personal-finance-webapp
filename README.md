# Personal Finance Assistant 🌍💰

A personal project that combines interactive 3D visualization with practical financial tools. Built with Next.js, Three.js, and TypeScript, this web application helps users explore global tax systems through an engaging interface.

<!-- ![Application Screenshot]
[Add a screenshot or GIF of your application in action] -->

## Project Overview

This project was built to demonstrate:
- Modern React patterns and TypeScript implementation
- Complex UI state management
- Interactive 3D visualization using Three.js
- Real-time calculations and currency conversions
- Responsive design principles

## Key Features

### Interactive World Globe 🌐
- Stunning 3D visualization using Three.js
- Smooth country selection and camera transitions
- Dynamic light/dark mode adaptation
- Auto-rotation animation
- Hover effects and country highlighting

### Tax Calculator 📊
- Support for multiple countries and tax systems
- Real-time tax bracket breakdown
- Multi-currency support with live conversions
- Effective tax rate visualization
- Social security calculations where applicable

### Modern UI/UX ✨
- Clean, responsive design
- Dark mode support
- Intuitive country selection
- Real-time updates
- Mobile-friendly interface

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **3D Rendering:** Three.js (react-globe.gl)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn / Radix UI
- **State Management:** Zustand

## Local Development

```bash
# Clone the repository
git clone https://github.com/TheMarcellVarga/personal-finance-webapp.git

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

- **Automated Checks**: Every push and pull request to the main branches triggers linting and build checks
- **Node.js**: The pipeline runs on the latest LTS version of Node.js
- **Workflow File**: Located at `.github/workflows/ci.yml`

To view the CI/CD status, check the Actions tab in the GitHub repository.

## Project Structure Highlights

```
personal-finance-webapp/
├── components/
│   ├── TaxCalculator.tsx    # Tax calculation logic and UI
│   ├── WorldMap.tsx         # 3D globe visualization
│   └── ...
├── utils/
│   └── currencyMappings.ts  # Currency data and conversions
└── store/
    └── taxStore.ts          # Tax calculation state management
```

## Learning Outcomes

Through this project, I:
- Implemented complex 3D visualizations in React
- Managed global state with Zustand
- Handled real-time calculations and currency conversions
- Created responsive layouts with Tailwind CSS
- Built reusable React components with TypeScript

## Future Enhancements

- [ ] Add more countries and tax systems
- [ ] Implement historical tax data visualization
- [ ] Add more financial calculators
- [ ] Integrate with external APIs for live currency rates
- [ ] Add more interactive 3D features

## 🔗 Connect With Me

- [Portfolio](https://marcellvarga.com)
- [LinkedIn](https://www.linkedin.com/in/marcellvarga/)
- [GitHub](https://github.com/TheMarcellVarga)

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [React Globe.gl](https://github.com/vasturiano/react-globe.gl)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)


---

*This is a personal project built for learning and demonstration purposes.*