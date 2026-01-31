# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

🎯 Overview
Your objective is to build SEO-friendly News Gallery using Nuxt 3. 
Solution should demonstrates understanding of the SSR lifecycle, state management, and modern web performance patterns.

We are not looking for a perfect UI. 
You can use already implemented tailwind if you are familiar with (optional). Tailwind usage is not part of evaluation.

Tech Stack: Nuxt 3 (Composition API), Pinia (suggested), TypeScript.


🏗️ Core Requirements
1. The Infinite News Feed
   Infinite Scrolling: Implement a gallery that fetches and appends news articles as the user scrolls.

    API: Use the news API domain and endpoint provided in the codebase.

2. Multi-User Favorites
   Identify by Name: Users can "log in" simply by entering a username (e.g., "Alice"). No OAuth/Backend is required.

    Personalization: Each user must have a private "Favorites" list associated with their name.

    Seamless Switching: Switching between users should instantly update the UI to show that specific user's favorites.

3. State & Persistence
   Runtime Storage: Application data (active user and their favorites) must be stored and accessible in the runtime.

    Persistence: The active user session and their favorites list must be preserved even after a hard browser refresh.

4. Search Engine Ready (SEO)
   Full Indexability: The application must be SEO friendly. Even though the gallery is an infinite scroll.

    SSR Stability: ...

📝 Note

The provided starter point is merely a reference. 
You are encouraged to refactor, delete, or restructure the codebase as you see fit. 
We are interested in your ability to build a production-grade application that balances user experience with technical robustness.

The app has to be able build and run
- npm run build
- npm run preview

Use AI with understanding :-]


