import { ref, get, set, onValue, off } from 'firebase/database';
import { db } from './firebase';

const USER_ID = 'demoUser';
const TRACK_ID = 'defaultTrack';
const LS_KEY = `progress:${USER_ID}:${TRACK_ID}`;

const progressRef = () => ref(db, `/users/${USER_ID}/progress/${TRACK_ID}`);

function readLocal() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : { completedUnitIds: [] };
  } catch {
    return { completedUnitIds: [] };
  }
}

function writeLocal(data) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    // ignore quota or privacy mode errors
  }
}

export async function getProgress() {
  try {
    const snap = await get(progressRef());
    if (!snap.exists()) {
      // If remote is empty/missing, clear local mirror so the app starts fresh
      writeLocal({ completedUnitIds: [] });
      return { completedUnitIds: [] };
    }
    const val = snap.val();
    // mirror remotely-fetched progress to local for offline continuity
    writeLocal(val);
    return val;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[Progress] getProgress failed; using local fallback', err?.code || err?.message || err);
    return readLocal();
  }
}

export async function setProgress(data) {
  try {
    await set(progressRef(), data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[Progress] setProgress failed; persisting to local fallback only', err?.code || err?.message || err);
  }
  // Always keep local in sync for offline / denied rules
  writeLocal(data);
}

export function subscribeProgress(cb) {
  const r = progressRef();
  const handler = (snap) => {
    const val = snap.exists() ? snap.val() : { completedUnitIds: [] };
    // keep local mirror in sync with RTDB (including clearing when missing)
    writeLocal(val);
    cb(val);
  };
  const errorHandler = (err) => {
    // eslint-disable-next-line no-console
    console.warn('[Progress] subscribeProgress permission error; using local fallback', err?.code || err?.message || err);
    cb(readLocal());
  };
  onValue(r, handler, errorHandler);
  // Also surface initial local value quickly while RTDB connects
  if (typeof window !== 'undefined') {
    Promise.resolve().then(() => cb(readLocal()));
  }
  return () => off(r, 'value', handler);
}

export function isUnitUnlocked(completedUnitIds, unitIndex) {
  // unitIndex is 1-based; unlock first incomplete unit
  if (unitIndex === 1) return true;
  const prevId = unitIndex - 1;
  return completedUnitIds?.includes(prevId);
}

export function allUnitsComplete(completedUnitIds, totalUnits) {
  return (completedUnitIds?.length || 0) >= totalUnits;
}

// Optional helper to reset progress everywhere
export async function resetProgress() {
  try {
    await set(progressRef(), { completedUnitIds: [] });
  } finally {
    writeLocal({ completedUnitIds: [] });
  }
}
