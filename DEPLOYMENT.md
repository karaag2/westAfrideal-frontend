# WestAfrideal Frontend - Deployment Guide

## 🚀 Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel
- Backend API deployed on Render

### Environment Variables

Configure these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Production
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/scrape/
BACKEND_API_KEY=your_secure_api_key_here
NODE_ENV=production
```

### Deployment Steps

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Production ready deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

4. **Add Environment Variables**
   - Add all variables from `.env.example`
   - Set for Production, Preview, and Development

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)

### Post-Deployment

1. **Verify Deployment**
   - Visit your Vercel URL
   - Test search functionality
   - Check browser console for errors

2. **Custom Domain** (Optional)
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records

3. **Performance Monitoring**
   - Enable Vercel Analytics
   - Monitor Core Web Vitals
   - Set up error tracking

## 🔒 Security Checklist

- [x] Environment variables configured
- [x] Security headers enabled
- [x] HTTPS enforced
- [x] API keys not exposed in client code
- [x] CORS configured properly
- [x] Rate limiting on API routes

## 📊 Performance Optimization

- [x] Image optimization with Next.js Image
- [x] Code splitting and lazy loading
- [x] Client-side caching (10 min expiry)
- [x] Infinite scroll pagination
- [x] Optimized bundle size

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (18.x or higher)
- Verify all dependencies are installed
- Check for TypeScript errors

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is deployed and running
- Verify CORS settings on backend

### Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Rebuild after adding new variables
- Check Vercel dashboard for correct values

## 📱 Preview Deployments

Every push to a branch creates a preview deployment:
- Unique URL for each branch
- Test changes before merging
- Share with team for review

## 🔄 Continuous Deployment

Automatic deployments on:
- Push to `main` → Production
- Push to other branches → Preview
- Pull requests → Preview with comments

## 📈 Monitoring

### Vercel Analytics
- Real User Monitoring (RUM)
- Core Web Vitals
- Visitor analytics

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- PostHog for product analytics

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Custom domain added (optional)
- [ ] Analytics enabled
- [ ] Error tracking setup
- [ ] Performance monitoring active
- [ ] SEO meta tags configured
- [ ] Social media preview images
- [ ] Sitemap generated
- [ ] robots.txt configured
