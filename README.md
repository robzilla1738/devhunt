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
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: NextAuth.js with multiple providers (Email/Password, GitHub, Google)
- **Styling**: Tailwind CSS for responsive and modern UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

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
   DATABASE_URL="postgresql://user:password@localhost:5432/devhunt"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Optional: GitHub OAuth
   # GITHUB_ID=""
   # GITHUB_SECRET=""
   
   # Optional: Google OAuth
   # GOOGLE_ID=""
   # GOOGLE_SECRET=""
   
   # Application Settings
   APP_NAME="DevHunt"
   APP_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Seed the database with initial data (optional):
   ```bash
   npm run prisma:seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

### Production Setup

1. Set up your production environment variables:
   ```
   DATABASE_URL="your-production-database-url"
   NEXTAUTH_SECRET="your-production-nextauth-secret"
   NEXTAUTH_URL="https://your-domain.com"
   
   # OAuth credentials
   GITHUB_ID="your-github-oauth-id"
   GITHUB_SECRET="your-github-oauth-secret"
   GOOGLE_ID="your-google-oauth-id"
   GOOGLE_SECRET="your-google-oauth-secret"
   
   # Application Settings
   APP_NAME="DevHunt"
   APP_URL="https://your-domain.com"
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Start the production server:
   ```bash
   npm start
   ```

### Deployment Script

A deployment script is included in the repository to simplify the deployment process:

```bash
./deploy.sh
```

This script will:
- Pull the latest changes from the repository
- Install dependencies
- Generate the Prisma client
- Run database migrations
- Build the application
- Restart the application (requires configuration)

### Hosting Options

DevHunt can be deployed to various hosting platforms:

1. **Traditional VPS/Dedicated Server**:
   - Set up Node.js, PostgreSQL, and a process manager like PM2
   - Use Nginx or Apache as a reverse proxy
   - Use the deployment script for updates

2. **Docker**:
   - Build a Docker image using the included Dockerfile
   - Deploy with Docker Compose or Kubernetes

3. **Platform as a Service (PaaS)**:
   - Deploy to platforms like Heroku, Railway, or Render
   - Connect to a managed PostgreSQL database

4. **Serverless**:
   - Deploy to platforms that support Next.js serverless functions
   - Use a managed PostgreSQL service

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
