# Octofit Tracker frontend

This Vite React app renders the Octofit Tracker data model through a routed dashboard.

## Environment configuration

Define VITE_CODESPACE_NAME in a local environment file before running the app with a GitHub Codespace endpoint:

```bash
cp .env.local.example .env.local
```

Example:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When VITE_CODESPACE_NAME is set, the frontend will call:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If it is not set, the app falls back to the local backend at http://127.0.0.1:8000/api.
