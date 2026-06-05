# MahByMe — Custom Mahjong Tile Generator

## How to Deploy (no coding required)

### Step 1 — Upload to GitHub
1. Go to github.com and create a new repository called `mahbyme`
2. Click "uploading an existing file"
3. Drag in ALL files from this folder (index.html, package.json, and the `api` folder)
4. Commit

### Step 2 — Connect to Vercel
1. Go to vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Select your `mahbyme` repository
4. Click "Deploy" (don't change any settings)

### Step 3 — Add Your API Key (IMPORTANT)
1. In Vercel, go to your project → Settings → Environment Variables
2. Add a new variable:
   - Name: `REPLICATE_API_KEY`
   - Value: your r8_... key
3. Redeploy (Deployments tab → ... → Redeploy)

### Done!
Your generator is live. The API key stays hidden on the server —
customers never see it.

## What's Included
- `index.html` — the customer-facing tile generator
- `api/generate.js` — serverless function that talks to Replicate (hides your key)
- `package.json` — project config
