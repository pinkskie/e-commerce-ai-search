# 🛍️ AI-Enhanced E-commerce Platform

## Overview

This is an enhanced e-commerce platform featuring **AI-powered smart product search** using natural language processing. Users can now search for products using conversational queries like "Show me running shoes under $100 with good reviews".

## 🚀 How to Run the App

### Prerequisites

- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Create environment file:
   ```bash
   cp api/config/config.env.example .env
   ```
4. Update the `.env` file with your configuration
5. Start the development server:
   ```bash
   npm start
   ```

### Running Individual Services

- **Frontend only**: `npm run client`
- **Backend only**: `npm run server`
- **Both**: `npm start` (uses concurrently)

## 🤖 AI Feature Implemented

### Smart Product Search (NLP)

- **Natural Language Processing**: Users can search using conversational queries
- **Price Filtering**: "under $50", "over $100", "cheap", "expensive"
- **Category Recognition**: "electronics", "shoes", "jewelry", "clothing"
- **Rating Filtering**: "good reviews", "high rating"
- **Semantic Search**: Understands context and intent

### Example Queries

- "Show me running shoes under $100 with good reviews"
- "electronics under $50"
- "women's clothing with high rating"
- "cheap jewelry"
- "expensive electronics"

## 🛠️ Tools/Libraries Used

### Frontend

- **React 18.2.0** - UI framework
- **Redux Toolkit** - State management
- **React Router DOM** - Navigation
- **Bootstrap** - UI components
- **React Hot Toast** - Notifications
- **React Loading Skeleton** - Loading states

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB/Mongoose** - Database
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Cloudinary** - Image storage

### AI Implementation

- **Natural Language Processing** - Query parsing
- **Semantic Search** - Context understanding
- **Mock OpenAI API** - Simulated AI responses

## 🎯 Notable Assumptions

1. **Mock AI Implementation**: Currently uses a simulated AI service. In production, this would integrate with OpenAI API or similar NLP services.

2. **Product Data**: Uses FakeStore API for demonstration. In production, this would be your own product database.

3. **Search Logic**: Implements basic NLP patterns. A real implementation would use more sophisticated language models.

4. **Performance**: Simulates AI processing delay (1 second) for realistic UX.

## 🔮 Blockchain Integration Potential

### Token-Gated Pricing

- Implement NFT-based access to premium products
- Loyalty tokens for exclusive discounts
- Dynamic pricing based on user's token holdings

### On-Chain User Preferences

- Store user preferences on blockchain for privacy
- Decentralized identity management
- Cross-platform preference sharing

### Smart Contract Loyalty

- Automated loyalty rewards via smart contracts
- Transparent reward distribution
- Decentralized governance for loyalty programs

## 📱 Features

- ✅ Basic filtering by category
- ✅ AI-powered natural language search
- ✅ Price and rating filtering
- ✅ Responsive design
- ✅ Add to cart functionality
- ✅ Product details pages

## 🎨 UI/UX Enhancements

- Modern card-based product layout
- AI search interface with examples
- Loading states and animations
- Toast notifications for user feedback
- Clear search results with easy reset

## 🔧 Development

The project uses a monorepo structure with:

- `/src` - React frontend
- `/api` - Node.js backend
- Shared configuration and dependencies

## 📝 License

This project is for demonstration purposes as part of an AI Developer Test.
