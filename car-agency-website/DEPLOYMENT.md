# Deployment Guide - EliteAuto Car Agency Website

This guide provides instructions for deploying the EliteAuto car agency website to various hosting platforms.

## 🚀 Quick Deployment Options

### 1. Netlify (Recommended for Static Hosting)

1. **Build the project**
   ```bash
   ng build --prod
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist/car-agency-website` folder
   - Or connect your Git repository for automatic deployments

3. **Configure redirects** (Create `_redirects` file in `dist/car-agency-website/`)
   ```
   /*    /index.html   200
   ```

### 2. Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   ng build --prod
   cd dist/car-agency-website
   vercel --prod
   ```

### 3. GitHub Pages

1. **Install Angular GitHub Pages**
   ```bash
   npm install -g angular-cli-ghpages
   ```

2. **Deploy**
   ```bash
   ng build --prod --base-href "https://yourusername.github.io/car-agency-website/"
   npx angular-cli-ghpages --dir=dist/car-agency-website
   ```

### 4. Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "dist/car-agency-website",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   ng build --prod
   firebase deploy
   ```

### 5. AWS S3 + CloudFront

1. **Build the project**
   ```bash
   ng build --prod
   ```

2. **Upload to S3**
   - Create an S3 bucket
   - Enable static website hosting
   - Upload contents of `dist/car-agency-website/`

3. **Configure CloudFront**
   - Create CloudFront distribution
   - Set error pages to redirect to `/index.html`

## 🔧 Production Optimizations

### Angular Build Optimizations

```bash
# Production build with optimizations
ng build --prod --aot --build-optimizer

# Analyze bundle size
npm install -g webpack-bundle-analyzer
ng build --prod --stats-json
npx webpack-bundle-analyzer dist/car-agency-website/stats.json
```

### Performance Optimizations

1. **Enable Gzip Compression**
   ```nginx
   # Nginx configuration
   gzip on;
   gzip_types text/css application/javascript application/json image/svg+xml;
   ```

2. **Set Cache Headers**
   ```nginx
   # Cache static assets
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **Preload Critical Resources**
   ```html
   <!-- Add to index.html -->
   <link rel="preload" href="styles.css" as="style">
   <link rel="preload" href="main.js" as="script">
   ```

## 🌐 Custom Domain Setup

### Netlify Custom Domain

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS records:
   ```
   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

### Cloudflare Setup (Optional)

1. Add your domain to Cloudflare
2. Update nameservers
3. Enable SSL/TLS encryption
4. Configure page rules for caching

## 🔒 Security Considerations

### Content Security Policy

Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  script-src 'self';
">
```

### HTTPS Enforcement

```nginx
# Nginx redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

## 📊 Monitoring and Analytics

### Google Analytics Setup

1. **Add tracking code to `index.html`**
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_TRACKING_ID');
   </script>
   ```

### Error Monitoring

Consider integrating:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Hotjar** for user behavior analytics

## 🚨 Troubleshooting Deployment Issues

### Common Issues

1. **404 on page refresh**
   - Ensure server redirects all routes to `index.html`
   - Check routing configuration

2. **Assets not loading**
   - Verify `base-href` is set correctly
   - Check asset paths in build output

3. **Build failures**
   ```bash
   # Clear cache and rebuild
   ng cache clean
   rm -rf node_modules package-lock.json
   npm install
   ng build --prod
   ```

### Environment-Specific Builds

Create environment files:

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com',
  googleMapsKey: 'your-maps-api-key'
};
```

Build with specific environment:
```bash
ng build --configuration=production
```

## 📋 Pre-Deployment Checklist

- [ ] All images optimized and compressed
- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] Custom domain configured
- [ ] Analytics tracking implemented
- [ ] Error monitoring setup
- [ ] Performance testing completed
- [ ] Cross-browser testing done
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags added
- [ ] Sitemap generated
- [ ] robots.txt configured

## 🔄 Continuous Deployment

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: ng build --prod
      - uses: netlify/actions/cli@master
        with:
          args: deploy --dir=dist/car-agency-website --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

**Need help with deployment? Contact the development team or refer to the hosting platform's documentation.**

