# Vishal Ghanghav's Portfolio

Welcome to my personal portfolio website, built with React and deployed on GitHub Pages. This project showcases my work, skills, and experience.

## 🚀 Live Demo

Check out the live site: [https://vishalghanghav.github.io/VishalPortfolio/](https://vishalghanghav.github.io/VishalPortfolio/)

## 🛠️ Technologies Used

- React.js
- Create React App
- GitHub Pages
- HTML5 & CSS3
- JavaScript (ES6+)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VishalGhanghav/VishalPortfolio.git
   cd VishalPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🚀 Deployment

This project is deployed using GitHub Pages. Here's how to deploy your own copy:

1. **Update the homepage in package.json**
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name"
   ```

2. **Install gh-pages**
   ```bash
   npm install --save gh-pages
   ```

3. **Add deploy scripts to package.json**
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

4. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings" > "Pages"
   - Select the `gh-pages` branch as the source
   - Click "Save"

## 🔄 Updating the Site

1. Make your changes
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. Deploy the changes:
   ```bash
   npm run deploy
   ```

## 📂 Project Structure

```
VishalPortfolio/
├── public/          # Static files
├── src/             # Source files
│   ├── components/  # React components
│   ├── assets/      # Images, fonts, etc.
│   ├── App.js       # Main App component
│   └── index.js     # Entry point
├── package.json     # Project dependencies
└── README.md        # This file
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by Vishal Ghanghav
