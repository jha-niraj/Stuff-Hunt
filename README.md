# 🛍️ StuffHunt

**AI-Powered E-Commerce Marketplace**

StuffHunt is a modern, full-featured e-commerce platform that combines intelligent product discovery with seamless shopping experiences. Built with Next.js 15, it offers AI-enhanced search capabilities, comprehensive seller tools, and a robust marketplace infrastructure.

<div align="center">
  <img src="./public/stuffhunt.jpeg" alt="StuffHunt Logo" width="200" height="200" />
</div>

## ✨ Key Features

### 🔍 **AI-Powered Search**
- **Smart Product Discovery** - Natural language search with AI interpretation
- **Image Upload Search** - Visual product matching (coming soon)
- **Intelligent Filters** - AI-generated category and attribute suggestions
- **Search Analytics** - Track and optimize search performance

### 🛒 **Complete E-Commerce Solution**
- **Multi-Vendor Marketplace** - Support for individual sellers and businesses
- **Product Management** - Rich product listings with variants, images, and descriptions
- **Shopping Cart & Checkout** - Seamless purchasing flow with multiple payment options
- **Order Management** - Complete order tracking and status updates
- **Reviews & Ratings** - Customer feedback system

### 👤 **User Experience**
- **Role-Based Access** - User, Seller, and Admin roles
- **Profile Management** - Customizable user profiles and preferences
- **Wishlist & Favorites** - Save products for later
- **Address Management** - Multiple shipping and billing addresses
- **Order History** - Track past purchases and reorder easily

### 🏪 **Seller Dashboard**
- **Product Upload** - Rich product creation with multiple images
- **Inventory Management** - Stock tracking and alerts
- **Order Processing** - Streamlined fulfillment workflow
- **Analytics Dashboard** - Sales performance and insights
- **Business Profile** - KYC verification and business information

### 🔐 **Security & Authentication**
- **NextAuth.js Integration** - Secure authentication with multiple providers
- **Google OAuth** - Easy social login
- **Email Verification** - Secure account activation
- **Password Reset** - Secure password recovery
- **Role-based Authorization** - Protected routes and features

### 📱 **Modern UI/UX**
- **Responsive Design** - Mobile-first approach
- **Dark Mode Support** - Theme switching capabilities
- **Framer Motion** - Smooth animations and transitions
- **Accessible Components** - WCAG compliant UI elements
- **Modern Design System** - Consistent and beautiful interface

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or later
- **npm**, **yarn**, or **pnpm** package manager
- **PostgreSQL** database (or other supported database)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shunyatech/stuffhunt.git
   cd stuffhunt
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you encounter peer dependency issues
   npm install --legacy-peer-deps
   
   # alternatively, use yarn or pnpm
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/stuffhunt"
   # For Neon (recommended for production):
   # DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/stuffhunt?sslmode=require"
   
   # Authentication Configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-jwt-secret-key-here"
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_SECRET_ID="your-google-client-secret"
   
   # Email Service (Resend)
   RESEND_API_KEY="your-resend-api-key"
   
   # AI Services (OpenAI)
   OPENAI_API_KEY="your-openai-api-key"
   
   # Cloudinary for Image Management
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
   CLOUDINARY_API_KEY="your-cloudinary-api-key"
   CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Apply database migrations
   npx prisma db push
   
   # Optional: Seed the database with sample data
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Access the application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Tech Stack

### **Frontend**
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### **Backend & Database**
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[NextAuth.js v5](https://next-auth.js.org/)** - Authentication library
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### **State Management**
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **React Server Components** - Server-side state handling

### **Services & Integrations**
- **[OpenAI](https://openai.com/)** - AI-powered search and recommendations
- **[Cloudinary](https://cloudinary.com/)** - Image and video management
- **[Resend](https://resend.com/)** - Email delivery service
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

### **Development Tools**
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Git](https://git-scm.com/)** - Version control

## 📁 Project Structure

```
stuffhunt/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 (admin)/            # Admin dashboard
│   ├── 📁 (auth)/             # Authentication pages
│   ├── 📁 (main)/             # Main application
│   ├── 📁 (merchant)/         # Seller dashboard
│   ├── 📁 api/                # API routes
│   ├── 📁 providers/          # Context providers
│   ├── 📄 globals.css         # Global styles
│   ├── 📄 layout.tsx          # Root layout
│   └── 📄 page.tsx            # Homepage
├── 📁 actions/                # Server actions
├── 📁 components/             # Reusable components
│   ├── 📁 ui/                 # Base UI components
│   ├── 📁 auth/               # Authentication components
│   ├── 📁 product/            # Product-related components
│   └── 📁 usercomponents/     # Feature components
├── 📁 hooks/                  # Custom React hooks
├── 📁 lib/                    # Utility libraries
├── 📁 prisma/                 # Database schema and migrations
├── 📁 public/                 # Static assets
├── 📁 stores/                 # Zustand stores
├── 📁 types/                  # TypeScript type definitions
├── 📄 auth.ts                 # NextAuth configuration
├── 📄 middleware.ts           # Next.js middleware
└── 📄 package.json            # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

The application requires several environment variables for full functionality:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXTAUTH_URL` | Application URL | ✅ |
| `NEXTAUTH_SECRET` | JWT secret for NextAuth | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ❌ |
| `GOOGLE_SECRET_ID` | Google OAuth client secret | ❌ |
| `RESEND_API_KEY` | Resend email service API key | ✅ |
| `OPENAI_API_KEY` | OpenAI API key for AI features | ❌ |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |

### Database Configuration

The application supports multiple database providers through Prisma. The default configuration uses PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

For other databases, update the `prisma/schema.prisma` file accordingly.

### Authentication Providers

Currently configured providers:
- **Email/Password** - Custom credentials with email verification
- **Google OAuth** - Social login integration

To add more providers, update the `auth.ts` configuration file.

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Deployment Platforms

#### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 👥 For Team Members & Interns

### Getting Started Guide

Welcome to the StuffHunt development team! Follow these steps to get started:

#### 1. **Prerequisites Setup**
- Install [Node.js](https://nodejs.org/) (v18 or later)
- Install [Git](https://git-scm.com/)
- Install [VS Code](https://code.visualstudio.com/) (recommended)
- Set up a [PostgreSQL](https://www.postgresql.org/) database or use [Neon](https://neon.tech/)

#### 2. **Repository Access**
```bash
# Clone the repository
git clone https://github.com/shunyatech/stuffhunt.git
cd stuffhunt

# Create a new branch for your work
git checkout -b feature/your-feature-name
```

#### 3. **Development Environment**
```bash
# Install dependencies
npm install --legacy-peer-deps

# Copy environment template
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

#### 4. **Code Standards**
- Use TypeScript for all new code
- Follow existing naming conventions
- Write tests for new features
- Use Prettier for code formatting
- Follow the existing component structure

#### 5. **Common Tasks**

**Adding a new page:**
```bash
# Create page in appropriate app directory
touch app/(main)/new-page/page.tsx
```

**Adding a new component:**
```bash
# Create component file
touch components/your-component.tsx
```

**Database changes:**
```bash
# Update prisma/schema.prisma
# Then run:
npx prisma db push
npx prisma generate
```

**Running tests:**
```bash
npm run test
```

#### 6. **Helpful Resources**
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints

### Product Endpoints
- `GET /api/products` - List products with filtering
- `POST /api/products` - Create new product (sellers only)
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Search Endpoints
- `POST /api/search` - AI-powered search
- `GET /api/search/suggestions` - Search suggestions

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests if applicable**
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style Guidelines

- Use TypeScript for all new code
- Follow the existing component patterns
- Use descriptive variable and function names
- Add JSDoc comments for complex functions
- Ensure responsive design for all UI components

### Reporting Issues

If you find a bug or have a feature request:
1. Check existing issues first
2. Create a detailed issue description
3. Include steps to reproduce (for bugs)
4. Add relevant labels

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ShunyaTech Team** - For the amazing development experience
- **Open Source Community** - For the incredible tools and libraries
- **Contributors** - For making this project better

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: Contact the development team for urgent matters

## 🗺️ Roadmap

- [ ] **Image Search** - Visual product discovery
- [ ] **Mobile App** - React Native implementation
- [ ] **Advanced Analytics** - Seller and buyer insights
- [ ] **Multi-language Support** - Internationalization
- [ ] **Advanced AI Features** - Personalized recommendations
- [ ] **Blockchain Integration** - Crypto payments and NFTs

---

<div align="center">
  <p><strong>Built with ❤️ by the ShunyaTech Team</strong></p>
  <p>🌟 If this project helped you, please consider giving it a star on GitHub! 🌟</p>
</div>
