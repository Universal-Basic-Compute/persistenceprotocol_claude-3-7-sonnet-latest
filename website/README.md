# Persistence Protocol Website

This is the frontend website for the Persistence Protocol project, built with Next.js and deployed on Render.com.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This website is configured to deploy automatically on Render.com using the `render.yaml` configuration file.

### Environment Variables

The following environment variables are used:

- `NODE_ENV`: Set to `production` for production builds
- `NEXT_PUBLIC_API_URL`: URL for the API endpoints

## Project Structure

- `app/`: Next.js App Router pages and layouts
- `components/`: Reusable React components
- `lib/`: Utility functions and API clients
- `public/`: Static assets
- `types/`: TypeScript type definitions

## Features

- Responsive design with Tailwind CSS
- Dark mode support
- API integration with SWR for data fetching
- Animations with Framer Motion
