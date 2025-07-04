# DriveDesk - Car Agency Website

A sleek, dark-themed car agency website built with Angular, featuring modern UI/UX, car browsing functionality, and showroom booking system.

## 🚗 Features

### Core Functionality
- **Homepage with Hero Gallery**: Full-width rotating carousel of luxury/exotic cars
- **Car Catalog**: Grid layout with filtering by category (All, Luxury, Exotic, Sports)
- **Search Functionality**: Real-time search across car inventory
- **Booking System**: Date/time picker for showroom appointments
- **Authentication**: Login and registration pages with form validation
- **About Us**: Team bios, mission statement, and showroom information
- **Contact Page**: Contact form, location details, and social media links

### Design Features
- **Dark Theme**: Black backgrounds with vibrant accent colors (neon blue, red, orange)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects, transitions, and carousel animations
- **Sticky Navigation**: Fixed header with smooth scrolling
- **Modern Typography**: High-contrast text with gradient effects
- **Interactive Elements**: Hover states, form validation, and loading states

## 🛠️ Technology Stack

- **Frontend**: Angular 18+ with TypeScript
- **Styling**: SCSS with custom CSS variables
- **UI Framework**: Bootstrap 5 for responsive grid system
- **Icons**: Font Awesome for consistent iconography
- **Build Tool**: Angular CLI with Webpack
- **Development Server**: Angular Dev Server with hot reload

## 📁 Project Structure

```
car-agency-website/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/          # Navigation header
│   │   │   └── footer/          # Site footer
│   │   ├── pages/
│   │   │   ├── home/            # Homepage with hero gallery
│   │   │   ├── catalog/         # Car catalog with filtering
│   │   │   ├── about/           # About us page
│   │   │   ├── contact/         # Contact form and info
│   │   │   ├── login/           # User login
│   │   │   └── register/        # User registration
│   │   ├── services/
│   │   │   ├── car.service.ts   # Car data management
│   │   │   ├── booking.service.ts # Booking functionality
│   │   │   └── auth.service.ts  # Authentication
│   │   ├── models/
│   │   │   └── car.model.ts     # Car data interface
│   │   └── app.routes.ts        # Application routing
│   ├── assets/
│   │   └── images/              # Car images and assets
│   └── styles.scss              # Global styles and theme
├── angular.json                 # Angular configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v18 or higher)

### Installation

1. **Clone or extract the project**
   ```bash
   cd car-agency-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
# Build the project
ng build --prod

# The build artifacts will be stored in the `dist/` directory
```

## 🎨 Customization

### Theme Colors
The website uses CSS custom properties for easy theme customization. Edit `src/styles.scss`:

```scss
:root {
  --primary-bg: #0a0a0a;        // Main background
  --secondary-bg: #111111;      // Card backgrounds
  --tertiary-bg: #1a1a1a;      // Input backgrounds
  --accent-blue: #00d4ff;       // Primary accent
  --accent-red: #ff3366;        // Secondary accent
  --accent-orange: #ff6b35;     // Tertiary accent
  --text-primary: #ffffff;      // Primary text
  --text-secondary: #cccccc;    // Secondary text
  --border-color: #333333;      // Border color
}
```

### Car Data
Update the car inventory in `src/app/services/car.service.ts`:

```typescript
private cars: Car[] = [
  {
    id: 1,
    name: 'Lamborghini Huracán',
    brand: 'Lamborghini',
    model: 'Huracán',
    year: 2024,
    price: 248000,
    category: 'exotic',
    image: 'assets/images/catalog/lamborghini-huracan.jpg',
    specs: {
      horsepower: 630,
      acceleration: '0-60 mph in 2.9s',
      topSpeed: '202 mph'
    }
  }
  // Add more cars...
];
```

### Images
Replace placeholder images in `src/assets/images/`:
- `hero/` - Hero carousel images
- `catalog/` - Car catalog images
- `showroom/` - Showroom photos
- `team/` - Team member photos

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Available Scripts

```bash
# Development server
ng serve

# Build for production
ng build --prod

# Run unit tests
ng test

# Run end-to-end tests
ng e2e

# Code linting
ng lint

# Generate new component
ng generate component component-name

# Generate new service
ng generate service service-name
```

## 📋 Features Checklist

- ✅ **Homepage (Hero)**: Full-width dark background with rotating gallery
- ✅ **Car Catalog**: Grid layout with filtering and search
- ✅ **Booking Flow**: Date/time picker with form validation
- ✅ **About Us**: Team bios and showroom information
- ✅ **Contact**: Form, map placeholder, and contact details
- ✅ **Authentication**: Login and register pages
- ✅ **Responsive Design**: Mobile, tablet, and desktop support
- ✅ **Dark Theme**: Black backgrounds with vibrant accents
- ✅ **Animations**: Smooth transitions and hover effects
- ✅ **Form Validation**: Client-side validation for all forms

## 🎯 Future Enhancements

- **Backend Integration**: Connect to real API for car data
- **Payment Processing**: Integrate payment gateway for purchases
- **User Dashboard**: Customer account management
- **Advanced Search**: Filters by price, year, mileage, etc.
- **Car Comparison**: Side-by-side car comparison tool
- **Virtual Tours**: 360° car interior/exterior views
- **Live Chat**: Customer support integration
- **SEO Optimization**: Meta tags and structured data
- **PWA Features**: Offline support and push notifications

## 🐛 Troubleshooting

### Common Issues

1. **Port 4200 already in use**
   ```bash
   ng serve --port 4201
   ```

2. **Node modules issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Angular CLI not found**
   ```bash
   npm install -g @angular/cli
   ```

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## 🤝 Support

For questions or support, please contact the development team or refer to the Angular documentation at https://angular.io/docs.

---

**Built with ❤️ using Angular and modern web technologies**

