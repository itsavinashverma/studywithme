# Study With Me Dashboard

A personalized productivity dashboard featuring a customizable Pomodoro timer, clock, and YouTube-powered Lo-Fi music player, styled with a beautiful liquid glass UI.

## How to Deploy Updates

Whenever you make changes to the code (like adding a new song to the playlist or tweaking the colors), follow these exact steps to push your updates live to your GitHub Pages site.

### Step 1: Save your changes to GitHub (Optional but recommended)
It's always a good idea to save your source code changes so you don't lose them. Run these commands in your terminal:
```bash
git add .
git commit -m "Describe what you changed here (e.g. Added a new song)"
git push
```
*Note: If `git push` gives an error about "remote contains work", run `git pull` first, then `git push` again.*

### Step 2: Build and Deploy to GitHub Pages
To actually update the live website, you just need to run one simple command. This will build your React app and push the finished files to the special `gh-pages` branch.

Run this in your terminal:
```bash
npm run deploy
```

### Step 3: Wait and Refresh
1. After the command finishes successfully (you will see the word `Published`), wait about **1 to 2 minutes**. GitHub takes a little time to process the update behind the scenes.
2. Go to your live website: [https://itsavinashverma.github.io/studywithme/](https://itsavinashverma.github.io/studywithme/)
3. Do a **Hard Refresh** to clear your browser's cache so it doesn't load the old version:
   - **Windows:** `Ctrl` + `Shift` + `R`
   - **Mac:** `Cmd` + `Shift` + `R`

That's it! Your updates are now live on the internet!
