# 🚀 Deployment Guide - Clareia

## Production Checklist ✅

All production-ready features have been implemented:

### SEO & Metadata
- ✅ Full OpenGraph tags for social sharing
- ✅ Twitter card metadata
- ✅ Search engine optimization (keywords, description)
- ✅ Robots meta tags for indexing
- ✅ Portuguese locale (pt_BR)

### Performance & UX
- ✅ Loading states with animated spinner
- ✅ Error boundary with recovery options
- ✅ PWA support with manifest.json
- ✅ Theme color for mobile browsers

### Features
- ✅ Daily tutor limit (10 questions/day)
- ✅ All 80+ video lessons with real YouTube IDs
- ✅ Gamification system with points and ranking
- ✅ Profile and progress tracking
- ✅ Search functionality
- ✅ Pomodoro timer

---

## Deploy to Vercel

### Option 1: Automatic (Recommended)

Since the repository is already connected to Vercel, every push to `main` branch will trigger automatic deployment.

**Check deployment status:**
1. Visit: https://vercel.com/dashboard
2. Select the `clareia` project
3. View latest deployment

### Option 2: Manual via CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

**During deployment, set environment variable:**
- `GROQ_API_KEY` = your_groq_api_key_here

---

## Environment Variables

Required for full functionality:

```
GROQ_API_KEY=your_groq_api_key_here
```

**How to set in Vercel:**
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add `GROQ_API_KEY` with your key from https://console.groq.com
4. Redeploy the project

---

## Post-Deployment

### 1. Test Core Features
- [ ] Home page loads
- [ ] Video lessons play correctly
- [ ] Quizzes work
- [ ] AI Tutor responds (requires GROQ_API_KEY)
- [ ] Profile saves data
- [ ] Search returns results
- [ ] Mobile responsive

### 2. PWA Installation
- [ ] Open site on mobile
- [ ] "Add to Home Screen" prompt appears
- [ ] App installs and opens in standalone mode

### 3. SEO Verification
- [ ] Check meta tags in browser DevTools
- [ ] Test social sharing preview (Twitter, Facebook)
- [ ] Submit to Google Search Console

---

## Domain Configuration (Optional)

To use a custom domain:

1. In Vercel dashboard, go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as shown
4. Update metadata URL in `app/layout.tsx`:

```typescript
openGraph: {
  url: "https://your-domain.com",
  // ...
}
```

---

## Monitoring

### Check Deployment Status
```bash
vercel ls clareia
```

### View Logs
```bash
vercel logs clareia
```

---

## Troubleshooting

### AI Tutor Not Working
- Check if `GROQ_API_KEY` is set in Vercel
- Verify API key is valid at https://console.groq.com

### Videos Not Loading
- Verify YouTube video IDs in `lib/data.ts`
- Check if videos are available in your region

### Build Fails
- Check build logs in Vercel
- Run `npm run build` locally to reproduce

---

## 📊 Expected Performance

- **Lighthouse Score:** 90+ (Performance, SEO, Accessibility)
- **First Load JS:** ~87 KB (excellent)
- **Build Time:** ~30-45 seconds
- **Static Pages:** 8 (pre-rendered)
- **Dynamic Routes:** 4 (on-demand)

---

## 🎉 You're Live!

The Clareia platform is now production-ready with:
- ✨ 80+ educational video lessons
- 🤖 AI tutor powered by Groq
- 🏆 Gamification system
- 📱 Full PWA support
- 🔍 SEO optimized
- 🎨 Beautiful UI/UX

**Live URL:** https://clareia-theta.vercel.app

Share with students and start making education better! 🎓
