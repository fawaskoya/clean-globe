# Clean Globe Consultancy (CGC) Website

A modern, high-performance marketing website for Clean Globe Consultancy built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI components.
  - `ui`: Basic atoms (Button, Card).
  - `layout`: Header, Footer.
  - `sections`: Large page sections (Hero, CTA).
- `src/lib`: Utilities, constants, and data helpers.
- `src/content`: MDX blog posts.

## Configuration

### Environment Variables
For the contact form to send emails, configure the following in a `.env.local` file:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**Getting your Resend API Key:**
1. Sign up for a free account at [resend.com](https://resend.com)
2. Go to API Keys in your dashboard
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

**Resend Free Tier:**
- 3,000 emails per month
- 100 emails per day
- Perfect for contact forms

**Note:** 
- Emails will be sent to `operations@thecleanglobe.com` (as specified in `src/lib/constants.ts`)
- Initially, emails will be sent from `onboarding@resend.dev` (for testing)
- To use your own domain, verify it in Resend and update the `from` field in `src/app/api/contact/route.ts`
- If the API key is not configured, the form will return an error message asking users to contact the company directly.

### Brand Colors & Fonts
- Colors are defined in `tailwind.config.ts`.
- Fonts are configured in `src/app/layout.tsx` using `next/font/google` as proxies for the brand fonts (Oak Sans / Astoria).

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Push code to GitHub.
2.  Import project in Vercel.
3.  Add Environment Variables.
4.  Deploy.
