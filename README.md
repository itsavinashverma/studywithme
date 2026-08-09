# 🎧 Study With Me

> A minimal, aesthetic workspace for **studying, focusing, and chilling**.

🌐 **Live Website:** https://itsavinashverma.github.io/studywithme/

Study With Me is a simple productivity dashboard that brings everything you need for a focused study session into one beautiful interface — **Pomodoro timer, to-do list, clock, and music player**.

## ✨ Features

* ⏱️ **Pomodoro Timer**

  * Work, Short Break, and Long Break modes
  * Customizable timer duration
  * Start, pause, reset, and skip controls

* 🎵 **Music Player**

  * Play music directly from YouTube
  * Previous / Next controls
  * Shuffle mode
  * Custom playlist support

* ✅ **To-Do List**

  * Add tasks
  * Mark tasks as completed
  * Delete tasks
  * Tasks are saved in your browser using `localStorage`

* 🕐 **Clock & Date**

  * Live time and date display

* 🪟 **Liquid Glass UI**

  * Minimal interface
  * Background artwork
  * Glassmorphism / translucent panels
  * Responsive layout

---

## 🛠️ Tech Stack

* **React 19**
* **Vite**
* **JavaScript (ES6+)**
* **CSS3**
* **Lucide React** — icons
* **React YouTube** — YouTube player integration
* **YouTube** — music source
* **ytmusicapi** — extracting YouTube Music playlist information
* **GitHub Pages** — deployment

---

## 🎵 Changing the Music Playlist

You can use **any public YouTube Music playlist** as your music source.

### 1. Choose a playlist

Open YouTube Music and select the playlist you want to use.

Copy its **Playlist ID** from the URL.

For example:

```text
https://music.youtube.com/playlist?list=PLxxxxxxxxxxxxxxxx
                                      ↑
                                Playlist ID
```

### 2. Open Google Colab

Create a new Google Colab notebook and run:

```python
!pip install ytmusicapi

from ytmusicapi import YTMusic
import json

playlist_id = "YOUR_PLAYLIST_ID"

yt = YTMusic()
playlist = yt.get_playlist(playlist_id, limit=None)

songs = []

for track in playlist["tracks"]:
    if not track.get("videoId"):
        continue

    artists = track.get("artists", [])
    artist = artists[0]["name"] if artists else "Unknown"

    songs.append({
        "title": track["title"],
        "artist": artist,
        "youtubeId": track["videoId"]
    })

with open("playlist.json", "w", encoding="utf-8") as f:
    json.dump(songs, f, indent=2, ensure_ascii=False)

print(f"Saved {len(songs)} songs to playlist.json")
```

Replace:

```python
YOUR_PLAYLIST_ID
```

with your playlist ID.

### 3. Download `playlist.json`

After running the code, Colab will create:

```text
playlist.json
```

Download it and replace the existing:

```text
src/data/playlist.json
```

in the project.

That's it. 🎶

The website will automatically use the new playlist.

---

## 🚀 Run Locally

Clone the repository:

```bash
git clone https://github.com/itsavinashverma/studywithme.git
cd studywithme
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

---

## 🌐 Deploy to GitHub Pages

The project uses `gh-pages` for deployment.

After making changes:

```bash
npm run deploy
```

The updated website will be published to:

**https://itsavinashverma.github.io/studywithme/**

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Clock/
│   ├── MusicPlayer/
│   ├── Pomodoro/
│   └── Todo/
│
├── data/
│   └── playlist.json
│
├── App.jsx
├── App.css
└── index.css
```

---

## 💡 Why I Built This

I wanted a **simple study environment without unnecessary distractions** — something I could open in a browser and immediately start studying with music, a timer, and a small task list.

**Study. Focus. Chill. Repeat. ☕🎧📚**

---

## 📄 License

Feel free to explore, modify, and build upon the project.
