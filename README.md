# NasDash — Vending Button Starter

A static React + TypeScript launcher for your existing NAS web services.

## Install

1. Extract this ZIP **into** `D:\00_Software_Projects\10_Mine\NasDash`.
   It contains replacements for `src/App.tsx`, `src/App.css`, `src/index.css`,
   `src/ServiceButton.tsx`, and `vite.config.ts`, plus a few new files.
2. In PowerShell, from that project folder:

   ```powershell
   npm.cmd install -D vite-plugin-singlefile
   npm.cmd run dev
   ```

3. Open the URL Vite prints (usually http://localhost:5173).

No extra icon or sound dependencies are needed.

## Customize

- `src/services.ts`: Add/rename buttons, change their URLs, icons and backlight colors.
- `src/ServiceButton.tsx`: Button interaction/markup.
- `src/ServiceButton.css`: Physical button appearance.
- `src/App.tsx` and `src/App.css`: Cabinet and overall layout.
- `src/utils/feedback.ts`: Click sound and haptic feedback.
- `src/hooks/useServiceReachability.ts`: Periodic best-effort network probes.

## Single-file static build

```powershell
npm.cmd run build
```

Open `dist/index.html` on a desktop by double-clicking it. The compiled interface
is a standalone HTML file; you do not need to run a server for it. Buttons still
require access to your NAS at 10.0.0.169.

For a normal **phone home-screen web app**, mobile browsers generally need an HTTPS
origin to install/add the page as an app; static hosting (e.g. GitHub Pages) is one
way to do that without hosting NasDash on the NAS.

## Important limitation: online/offline indication

The browser's `fetch(..., { mode: 'no-cors' })` response is opaque: the app cannot
read HTTP status codes. A completed request (even an HTTP error) makes a button
light up. A failed request may be a stopped container, a timeout, or a browser
security restriction, so the UI says **Not verified** rather than **Offline**.

This implementation is a useful visual prototype, not a Docker health monitor.
A precise per-container health status would require a small health-reporting
endpoint or another explicit service with permission to answer those requests.

## React concepts in this version

- **Components:** `App`, `ServiceButton`, `ServiceIcon`
- **Props:** `service`, `status`, `soundEnabled`
- **State:** pressed animation, sound preference, reachability results
- **Hooks:** `useState`, `useCallback`, `useEffect`
- **Rendering arrays:** `services.map(...)`
- **CSS variables:** `--accent` customizes each button backlight
