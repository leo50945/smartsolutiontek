import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  doc,
  getFirestore,
  increment,
  onSnapshot,
  serverTimestamp,
  setDoc,
  addDoc,
  collection,
  limit,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2jDVX1-_TZJkOLqUJs7NQUJZnPW9ZoIA",
  authDomain: "damekob-69b90.firebaseapp.com",
  projectId: "damekob-69b90",
  storageBucket: "damekob-69b90.firebasestorage.app",
  messagingSenderId: "1047314759653",
  appId: "1:1047314759653:web:ce5ab09f8c2e17e99eb90c",
  measurementId: "G-QCN717Q50F",
};

const db = getFirestore(initializeApp(firebaseConfig));
const overviewRef = doc(db, "analytics", "overview");

export async function recordMetric(metric) {
  try {
    await setDoc(overviewRef, { [metric]: increment(1), updatedAt: serverTimestamp() }, { merge: true });
  } catch (error) {
    console.warn("Firebase analytics unavailable:", error);
  }
}

export async function recordFeedback(reason) {
  try {
    await Promise.all([
      setDoc(overviewRef, { feedbackSubmitted: increment(1), updatedAt: serverTimestamp() }, { merge: true }),
      addDoc(collection(db, "feedback"), { reason: reason || "Non précisé", createdAt: serverTimestamp() }),
    ]);
  } catch (error) {
    console.warn("Firebase feedback unavailable:", error);
  }
}

export function subscribeToOverview(callback) {
  return onSnapshot(overviewRef, (snapshot) => callback(snapshot.exists() ? snapshot.data() : {}), (error) => {
    console.warn("Firebase dashboard unavailable:", error);
    callback({});
  });
}

export function subscribeToFeedback(callback) {
  const recentFeedback = query(collection(db, "feedback"), orderBy("createdAt", "desc"), limit(12));
  return onSnapshot(recentFeedback, (snapshot) => {
    callback(snapshot.docs.map((item) => item.data()));
  }, (error) => {
    console.warn("Firebase feedback list unavailable:", error);
    callback([]);
  });
}
