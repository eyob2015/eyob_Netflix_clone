# Project Structure Overview

This Netflix Clone project follows professional clean code standards and organized folder structure.

## Directory Structure

```
src/
├── assets/                 # Static assets
│   └── images/            # Image files (logos, etc.)
│
├── components/            # Reusable React components
│   ├── Banner/           # Banner component with featured movie
│   │   ├── Banner.js
│   │   └── Banner.css
│   ├── Nav/              # Navigation bar component
│   │   ├── Nav.js
│   │   └── Nav.css
│   ├── Row/              # Movie row component (horizontally scrollable)
│   │   ├── Row.js
│   │   └── Row.css
│   └── Footer/           # Footer component
│       ├── Footer.js
│       └── Footer.css
│
├── pages/                # Page components
│   └── LoginPage.js      # Authentication page (incomplete)
│
├── services/             # API services and business logic
│   ├── api.js           # Axios instance configuration
│   └── movieService.js  # Movie API methods
│
├── constants/            # Application constants
│   └── apiConstants.js  # API endpoints and configuration
│
├── utils/                # Utility functions
│   └── stringUtils.js   # String manipulation utilities
│
├── styles/               # Global styles
│   ├── index.css        # Global CSS
│   └── App.css          # App container styles
│
├── App.js               # Main App component
├── index.js             # React entry point
└── .env                 # Environment variables (API keys)
```

## Key Features

### 1. **Separation of Concerns**
- Components are isolated with their own styles
- API logic is centralized in services
- Constants are managed in dedicated files

### 2. **Scalability**
- Easy to add new components in `components/` folder
- New API endpoints can be added to `movieService.js`
- Utility functions are reusable and well-documented

### 3. **Clean Code Principles**
- Functions have JSDoc comments
- Descriptive variable and function names
- Error handling in all async operations
- No console logs in production code

### 4. **Security**
- API key stored in `.env` file
- Never hardcoded sensitive information
- Environment variables properly managed

## Component Documentation

### Banner
Displays a featured Netflix original with background image, title, and description.

### Nav
Fixed navigation bar with Netflix logo and user avatar. Background darkens after scrolling.

### Row
Horizontally scrollable row of movie/show posters. Supports both standard and large poster sizes. Includes trailer playback functionality.

### Footer
Footer section with links to various Netflix resources.

## Services

### API Service (`services/api.js`)
Configured Axios instance for TMDB API calls.

### Movie Service (`services/movieService.js`)
Centralized methods for all movie-related API calls with built-in error handling.

## Running the Application

```bash
# Install dependencies
npm install

# Create .env file with API key
echo "REACT_APP_API_KEY=your_api_key_here" > .env

# Start development server
npm start

# Build for production
npm build
```

## Getting an API Key

1. Visit [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)
2. Create an account or login
3. Generate an API key
4. Add it to your `.env` file

## Future Enhancements

- [ ] Complete LoginPage implementation
- [ ] User authentication system
- [ ] Favorites/watchlist feature
- [ ] Search functionality
- [ ] Responsive design improvements
- [ ] Unit tests
- [ ] Integration tests

## Best Practices Applied

✅ Single Responsibility Principle - Each component/service has one reason to change  
✅ DRY (Don't Repeat Yourself) - Shared logic extracted to utils and services  
✅ Component Composition - Small, focused components  
✅ Environment Variables - Sensitive data secured  
✅ Error Handling - Try-catch blocks in async operations  
✅ Code Documentation - Comments explaining complex logic  
✅ Naming Conventions - Clear, descriptive names  
