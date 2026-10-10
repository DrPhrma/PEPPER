# OSINT Platform

Clean, client-side OSINT toolkit. Dark minimal UI. Runs fully in the browser. No API keys.

---

## Deploy to GitHub Pages (easiest way)

### 1. Create a new repo on GitHub
- Name it `osint-platform` (or any name you like)
- Make it **Public**
- Do **not** add README, .gitignore, or license

### 2. Upload the files
- Download the zip of this project
- Unzip it
- Drag **everything inside** the folder into the new GitHub repo
- Click **Commit changes**

### 3. Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, choose **GitHub Actions**
3. Save

### 4. Wait about 1 minute
GitHub will automatically build and deploy the site.

Your site will be live at:
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

Example: if your username is `john` and the repo is `osint-platform`, the URL is:
`https://john.github.io/osint-platform/`

---

## Run locally (optional)

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## What’s included

- Home page
- Tools catalog (filterable)
- Working tools: Entity Extractor, Image EXIF Viewer, Hash Generator
- All other tools are listed and ready to be built
- Dark mode only
- Fully static — no backend, no secrets
