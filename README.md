# DevHunt

DevHunt is a platform for developers to share and discover projects that are still in development. It's similar to Product Hunt, but specifically focused on projects that are work-in-progress, allowing developers to get early feedback, find collaborators, and showcase their work.

## Features

- **Project Showcase**: Share your development projects with the community
- **Upvoting System**: Projects can be upvoted by the community
- **Comments**: Get feedback through comments on your projects
- **Forums**: Discuss development topics with other developers
- **News Section**: Stay updated with the latest development trends and announcements
- **User Authentication**: Sign up, sign in, and manage your profile
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM with SQLite (can be easily switched to PostgreSQL, MySQL, etc.)
- **Authentication**: NextAuth.js with multiple providers (Email/Password, GitHub, Google)
- **Styling**: Tailwind CSS for responsive and modern UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/devhunt.git
   cd devhunt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Optional: GitHub OAuth
   # GITHUB_ID=""
   # GITHUB_SECRET=""
   
   # Optional: Google OAuth
   # GOOGLE_ID=""
   # GOOGLE_SECRET=""
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
devhunt/
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── api/         # API routes
│   │   ├── auth/        # Authentication pages
│   │   ├── projects/    # Project-related pages
│   │   ├── forum/       # Forum pages
│   │   ├── news/        # News pages
│   │   └── ...
│   ├── components/      # React components
│   │   ├── layout/      # Layout components
│   │   ├── ui/          # UI components
│   │   └── ...
│   ├── lib/             # Utility libraries
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
└── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Product Hunt
- Built with Next.js and Tailwind CSS
