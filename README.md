# ING Case Study - Lit Elements

A modern web components library built with Lit Element and TypeScript.

## Features

- 🚀 Built with Lit Element for fast, lightweight web components
- 📦 TypeScript support with full type definitions
- 🎨 Modern styling with CSS custom properties
- 🔧 ESLint and Prettier for code quality
- ⚡ Vite for fast development and building
- 🧪 Web Test Runner for testing

## Components

### MyElement
A basic greeting component with a counter.

```html
<my-element name="World"></my-element>
```

### MyButton
A customizable button component with different variants.

```html
<my-button variant="primary">Click me!</my-button>
<my-button variant="secondary" disabled>Disabled</my-button>
```

### MyCard
A card component with slots for flexible content.

```html
<my-card>
  <h2 slot="title">Card Title</h2>
  <p>Card content goes here.</p>
  <div slot="footer">Footer content</div>
</my-card>
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/          # Lit Element components
│   ├── my-element.ts   # Basic element with counter
│   ├── my-button.ts    # Button component
│   └── my-card.ts      # Card component
├── index.ts            # Library exports
└── main.ts             # Demo application entry
```

## Building Components

This project follows Lit Element best practices:

1. Use TypeScript decorators for properties and element registration
2. Define styles using the `static styles` property
3. Use the `render()` method to define templates
4. Handle events with private methods
5. Emit custom events for component communication

## Browser Support

Modern browsers with ES2020 support:
- Chrome 80+
- Firefox 72+
- Safari 14+
- Edge 80+

## License

MIT License
