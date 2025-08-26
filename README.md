# Edi Student Track (Innovpreneur Mini‑Track)

A functional learning track (think Duolingo’s path) built with React + Bootstrap. Progress is persisted to Firebase Realtime Database. Unit content is mock data so we can focus on track mechanics and design fidelity.

This doc covers setup, login credentials, Firebase configuration, data model, routing/guards, Easter Egg, and acceptance checks.

## Quick start (Windows PowerShell)

1) Install dependencies

```powershell
npm install
```

2) Configure environment variables (copy example to real .env)

```powershell
Copy-Item -Path .env.example -Destination .env -Force
```

Open `.env` and check/fill values from your Firebase Console (Project settings → Your apps → Web app):

```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_DATABASE_URL=https://<projectId>-default-rtdb.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=<projectId>
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
REACT_APP_FIREBASE_MEASUREMENT_ID=... # optional
```

3) Start the app

```powershell
npm start
```

Open http://localhost:3000

## Login credentials

Authentication is mocked for this task. Use the following dummy credentials on the Login screen:

- Email: `test@edinova.com`
- Password: `password123`

Notes:
- Registered email list (for validation copy): `test@edinova.com`, `admin@edinova.com`, `user@edinova.com`.
- Only `test@edinova.com` + `password123` logs in successfully.
- After the success alert, navigate to the track via the sidebar “My Journey” or by visiting http://localhost:3000/units.

## What you’ll build (implemented)

- Continuous flow of units under collapsible headings (single path UI).
- Gating: only Unit 1 is unlocked initially; completing a unit unlocks only the next unit.
- Persistence: progress saved to Firebase; app resumes where you left off on reload.
- Guards: locked units cannot be opened via UI or direct URL.
- Navbar shows the track name and live progress (e.g., `3 / 4 complete`).
- Easter Egg: hidden until all units complete; then visible on Unit 3 as a special redo‑only unit.
- Accessibility: collapsible headings are keyboard operable with proper `aria-expanded`; visible focus; responsive layout.

## Firebase setup

This project uses Realtime Database (not Firestore). Create a DB and use rules suited for development. For a quick start (scoped, no auth):

```json
{
	"rules": {
		"users": {
			"demoUser": {
				"progress": {
					"defaultTrack": {
						".read": true,
						".write": true
					}
				}
			}
		}
	}
}
```

Security note: The above is for local/dev only. Do not ship to production without authentication and proper rules.

## Data model

- Track definition (mock): `src/lib/track.js`
	- `track.sections[]` each with `units[]` containing `{ id, title, description, order }`
- Progress path in Realtime Database: `/users/demoUser/progress/defaultTrack`
	- Schema: `{ completedUnitIds: number[] }`
	- Unlocked unit is derived: first unit id not in `completedUnitIds`.

## Routing and guards

- Track list: `/units` — continuous path with collapsible headings
- Unit detail: `/units/:unitId`
- Unit 1 Module 1: `/units/1/hyew`
- Unit 1 Module 2: `/units/1/hyew2`
- Easter Egg (appears when track complete): `/units/:unitId/easter-egg` (shown on Unit 3)

Direct URL access to a locked unit is blocked with a friendly message and redirect back to `/units`.

## Feature details

### Navigation bar
- File: `src/components/Navigation/Navbar.jsx`
- Shows track title and live progress: `X / Y complete`.

### Track UI (single continuous path)
- File: `src/components/Units/Units.jsx`
- Collapsible section headers (`aria-expanded`, keyboard Space/Enter supported).
- Each unit card shows Locked/Unlocked/Completed state; locked units have disabled buttons.

### Unit detail
- Files: `src/components/UnitDetail/UnitDetail.jsx`, `src/pages/UnitDetail/UnitDetail.js`
- Mock content + controls: Start Module 1/2, Show/Hide Transcript, Mark Module Complete.
- Completed state immediately unlocks the next unit.

### Persistence helpers
- File: `src/lib/progress.js`
- Functions: `getProgress`, `setProgress`, `subscribeProgress`, `isUnitUnlocked`, `allUnitsComplete`.
- Includes a localStorage fallback so the UI still works offline or when rules temporarily deny access.

### Easter Egg
- Hidden until all units complete; then an “Open Easter Egg” appears on Unit 3.
- Route: `/units/:unitId/easter-egg` — redo‑only, doesn’t alter main completion.

## Acceptance criteria: how to verify

1) First load: Go to `/units`. Only Unit 1 is unlocked; headings are expanded by default.
2) Sequential unlock: Open a unit; click “Mark Module Complete.” Unit N+1 unlocks and navbar progress updates.
3) Resume flow: Refresh the page or restart the app; you land with previous progress applied; locked/unlocked states preserved.
4) No skipping: Try to open a locked unit via UI or direct `/units/:unitId`; you’ll get a friendly block and redirect.
5) Collapsible headings: Toggle any heading; path layout updates without changing gating; current unit remains visible/reachable.
6) Easter Egg: Complete all units; an Easter Egg control appears on Unit 3; opening it does not change main completion.
7) Design fidelity: Components use project tokens/themes; spacing/colours can be fine‑tuned against Figma if needed.

## Design assumptions & deviations

- Routes use `/units` and `/units/:unitId` instead of `/track/:trackId/unit/:unitId` for simplicity. Track id is fixed in code as `defaultTrack`.
- Authentication is mocked (no Firebase Auth). A fixed user id `demoUser` is used for persistence; this is documented here and in code.
- Storage bucket and Analytics are configured but not required for core features; measurementId is optional.

## Troubleshooting

- “Realtime Database URL is missing”: ensure `.env` has `REACT_APP_FIREBASE_PROJECT_ID` and `REACT_APP_FIREBASE_DATABASE_URL`, then restart `npm start`.
- “Permission denied”: adjust Realtime Database rules (see above). The UI will gracefully fall back to localStorage until rules allow writes.
- Source map warning for Firebase: harmless in dev; safe to ignore.

## Scripts

```powershell
# install
npm install

# start (dev)
npm start

# build (prod)
npm run build
```

## Repo structure (select)

- `src/lib/firebase.js` – Firebase initialization (Realtime Database)
- `src/lib/progress.js` – Progress read/write/subscribe helpers
- `src/lib/track.js` – Mock track definition (sections + units)
- `src/components/Navigation/Navbar.jsx` – Sidebar + live progress
- `src/pages/Units/Units.js` + `src/components/Units/Units.jsx` – Continuous path with collapsible headings
- `src/pages/UnitDetail/UnitDetail.js` + `src/components/UnitDetail/UnitDetail.jsx` – Unit detail + completion controls
- `src/pages/HYEW/HYEW.js`, `src/pages/HYEW2/HYEW2.js` – Module pages
- `src/pages/EasterEgg3/EasterEgg3.js` – Easter Egg experience

## License

For evaluation purposes only.

