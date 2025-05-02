# VO Project

A modern web application built with Next.js and React.

## Overview

This project is a full-featured web application with both client-facing pages and an admin dashboard. It uses Next.js for server-side rendering and routing, React for the UI components, and Supabase for backend services.

## Features

- **Modern UI**: Built with React 19 and styled with Tailwind CSS
- **Admin Dashboard**: Complete admin interface for managing content
- **Responsive Design**: Works on desktop and mobile devices
- **Authentication**: User login and authentication system
- **Content Management**: Create, edit, and manage posts and categories

## Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Context API
- **Data Fetching**: TanStack Query
- **Backend Services**: Supabase
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or pnpm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/shubhamdixena/vo.git
   cd vo
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

- `/app` - Next.js app router pages
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and shared code
- `/public` - Static assets
- `/src` - Source code including components and pages
- `/styles` - Global CSS and styling

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## License

This project is private and not licensed for public use.
