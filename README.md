 Nova.Tech

A premium, full-stack e-commerce platform for cutting-edge electronics, and automatic updated Blog for news powered by AI , built with React, Vite, Tailwind CSS, and serverless Neon Postgres.

![Nova.Tech Banner](https://i.pinimg.com/1200x/9b/d2/ff/9bd2fffa88c86c8f519144fb786f5403.jpg?auto=format&fit=crop&w=1200&q=80)

## ✨ Features

- **Modern UI/UX**: Beautiful glassmorphism design, smooth animations (Framer Motion), and fully responsive layout.
- **Dynamic Blog**: Real-time tech news fetching integrated with the GNews API, featuring a custom AI text expander.
- **Authentication**: Secure and seamless login via Email/Password, Google, and GitHub using `better-auth`.
- **State Management**: Fully functional shopping cart, wishlist, and product comparison systems using React Context and `localStorage`.
- **Database**: Serverless Postgres database via **Neon**, managed with **Drizzle ORM**.
- **Deployment**: Frontend and backend API routes deployed together on **Vercel**.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React + React Icons

### Backend & Database
- **API**: Vercel Serverless Functions
- **Database**: Neon (Serverless Postgres)
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- `pnpm` package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Da94-St/nova-tech.git
   cd nova-tech
Install dependencies:

bash
pnpm install
Set up environment variables:
Create a .env.local file in the root directory and add the following:

env
# Database (Neon)
DATABASE_URL="your_pooled_neon_url"
DATABASE_URL_UNPOOLED="your_direct_neon_url"

# Auth
BETTER_AUTH_SECRET="your_32_char_secret"
BETTER_AUTH_URL="http://localhost:5173"

# OAuth (Google & GitHub)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# APIs
VITE_GNEWS_API_KEY="your_gnews_api_key"
Run database migrations:

bash
pnpm drizzle-kit push
Start the development server:

bash
pnpm dev
☁️ Deployment
This project is optimized for Vercel.

Push your code to GitHub.

Import the repository into Vercel.

Add all the Environment Variables from your .env.local file into the Vercel project settings.

Deploy!

Built with ❤️ Muhammad Alshwikh
Portfolio Link 
https://muhammad-alshwikh.vercel.app/
