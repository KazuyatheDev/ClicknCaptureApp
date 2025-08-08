# Camera Rental System

A Next.js application for camera rental services with customer and admin interfaces.

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.local` and update with your actual values
   - Set `ADMIN_PASSWORD` for admin access
   - Configure Vercel KV if using database storage

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the customer interface.
Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin).

### Build

```bash
npm run build
npm start
```

## Features

- Customer camera browsing and rental
- Date-based availability filtering
- Admin panel for camera and rental management
- Responsive design
- API routes for data management

## Deployment

This app is configured for Vercel deployment with the included `vercel.json` configuration.