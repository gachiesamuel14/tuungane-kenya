# Tuungane

Location-based matchmaking for people in Kenya. This repository is a deployable front-end prototype for Netlify.

## What works in this version

- Registration and login (saved in the browser)
- Profile setup with photo upload, county, town, mode, tribe, religion, and interests
- GPS permission plus haversine distance, with county fallback if location is denied
- Filters: county, distance, age, tribe, religion, lifestyle mode, interests
- Swipe, like, pass, and mutual match
- Chat stored on this device, with a short demo reply
- In-app notifications
- Report and block
- Premium screen with an M-Pesa-style checkout (demo only — no real charge)

## What a production version still needs

Real accounts, photo storage, a database, websockets for chat, push notifications, a maps provider, moderation, age verification, and a Daraja / M-Pesa integration. Do not treat this prototype as a live dating service.

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

## Netlify

Publish the repository root. `netlify.toml` already sets the publish directory and SPA fallback.
