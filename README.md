<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Harmony - Service Provider Platform

A modern React application for booking services like Poojari and Plumber services.

View your app in AI Studio: https://ai.studio/apps/drive/1ju_ctHp91HtBEnJvE4P_2WJtya8WSNyR

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Git** (for version control and deployment)

## Run Locally

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repository-url>
   cd Harmony-Ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional):
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
   > **Note:** This is optional. The app will work without it, but some features may require the API key.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the app**:
   Open your browser and navigate to `http://localhost:3000`

   The development server will automatically reload when you make changes to the code.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run deploy` - Build and deploy to GitHub Pages

## Deploy to GitHub Pages

This project is configured to deploy to GitHub Pages. Follow these steps:

### Step 1: Push Your Code to GitHub

1. **Initialize git repository** (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Add your GitHub repository as remote**:
   ```bash
   git remote add origin https://github.com/yourusername/Harmony-Ai.git
   ```

3. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```
   > Replace `main` with your default branch name if different (e.g., `master`)

### Step 2: Configure Base Path (if needed)

If your GitHub repository name is **different** from `Harmony-Ai`, update the base path in `vite.config.ts`:

```typescript
base: '/Your-Repository-Name/', // Update this line
```

### Step 3: Deploy to GitHub Pages

Run the deploy command:
```bash
npm run deploy
```

This will:
- Build your app for production
- Create/update the `gh-pages` branch
- Deploy your app to GitHub Pages

### Step 4: Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository on GitHub.com
2. Click on **Settings** (in the repository navigation bar)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **Deploy from a branch**
5. Choose:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
6. Click **Save**

### Step 5: Access Your Deployed App

After deployment (which may take a few minutes), your app will be available at:
```
https://yourusername.github.io/Harmony-Ai/
```

> Replace `yourusername` with your GitHub username and `Harmony-Ai` with your repository name if different.

## Important Notes

- **HashRouter**: This app uses `HashRouter` from React Router, which works perfectly with GitHub Pages (no server-side routing configuration needed).

- **Environment Variables**: Environment variables (like `GEMINI_API_KEY`) set in `.env.local` are only available in local development. For production on GitHub Pages, you'll need to use GitHub Secrets with GitHub Actions if you need environment variables.

- **Base Path**: The base path in `vite.config.ts` must match your repository name for GitHub Pages to work correctly.

- **Automatic Deployment**: Every time you run `npm run deploy`, it will rebuild and redeploy your app. Make sure to commit and push your changes to GitHub first.

## Project Structure

```
Harmony-Ai/
├── components/          # Reusable React components
│   ├── Footer.tsx
│   └── Navbar.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── PoojariList.tsx
│   ├── PlumberList.tsx
│   ├── ServiceDetail.tsx
│   ├── Checkout.tsx
│   └── Profile.tsx
├── App.tsx             # Main app component with routing
├── index.tsx           # Entry point
├── types.ts            # TypeScript type definitions
├── constants.tsx       # App constants
├── mockData.ts         # Mock data for development
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies and scripts
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can change it in `vite.config.ts`:
```typescript
server: {
  port: 3001, // Change to any available port
}
```

### GitHub Pages Not Loading
- Verify the `base` path in `vite.config.ts` matches your repository name
- Check that GitHub Pages is enabled in repository settings
- Wait a few minutes after deployment for changes to propagate
- Clear your browser cache

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript errors: Review the terminal output
- Ensure Node.js version is compatible (v18+ recommended)

## License

This project is private and proprietary.
