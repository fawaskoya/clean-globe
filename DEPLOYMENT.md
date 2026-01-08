# Deployment Guide for GoDaddy cPanel

## Important Notes

⚠️ **Next.js requires Node.js hosting**. Traditional cPanel hosting may not support Next.js applications. You may need to:
1. Use GoDaddy's Node.js hosting feature (if available)
2. Use a static export (already included in the `out/` folder)
3. Consider alternative hosting like Vercel, Netlify, or a VPS

## Option 1: Static Export (Recommended for cPanel)

The project has been built as a static export in the `out/` folder. You can upload the contents of the `out/` folder directly to your cPanel's `public_html` directory.

**Steps:**
1. Extract the zip file
2. Upload all files from the `out/` folder to your `public_html` directory
3. Ensure your domain points to the `public_html` directory
4. The site should work immediately

**Note:** The contact form API route (`/api/contact`) will NOT work with static export. You'll need to set up a serverless function or use a third-party form service.

## Option 2: Full Next.js Deployment (Requires Node.js)

If your hosting supports Node.js:

1. **Upload the entire project** to your server (excluding `node_modules`)

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file with:
   ```
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Start the production server:**
   ```bash
   npm start
   ```

6. **Set up PM2 or similar process manager** to keep the server running:
   ```bash
   npm install -g pm2
   pm2 start npm --name "clean-globe" -- start
   pm2 save
   pm2 startup
   ```

## Environment Variables Required

- `RESEND_API_KEY`: Your Resend API key for the contact form email functionality

## File Structure

- `src/` - Source code
- `public/` - Static assets (images, fonts, etc.)
- `out/` - Static export build (ready to deploy)
- `package.json` - Dependencies and scripts
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration

## Contact Form Setup

The contact form requires a Resend API key. If you're using static export, you'll need to:
1. Use a third-party form service (Formspree, Netlify Forms, etc.)
2. Or set up a serverless function on a platform like Vercel

## Support

For Next.js deployment issues, refer to:
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Static Export Guide](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

