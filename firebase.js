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
  apiKey: "AIzaSyBe0vmFHNb5u8zfEc8osdQ_CS45NWJWiH8",
  authDomain: "kobechec.firebaseapp.com",
  projectId: "kobechec",
  storageBucket: "kobechec.firebasestorage.app",
  messagingSenderId: "35098984421",
  appId: "1:35098984421:web:fed9f7adde0e98be8db90c",
  measurementId: "G-JH7Y3P59WC",
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
