// scripts/seedFirebase.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');

// Firebase config
const firebaseConfig = {
  // Your firebase config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedUsers() {
  try {
    // Sample user data
    const users = [
      { id: 1, username: 'fisher123', email: 'fisher@example.com', isBanned: false, reports: 2 },
      { id: 2, username: 'angler456', email: 'angler@example.com', isBanned: true, reports: 5 },
      { id: 3, username: 'catchmaster', email: 'master@example.com', isBanned: false, reports: 0 },
    ];

    console.log('Seeding users...');
    for (const user of users) {
      await setDoc(doc(db, 'users', user.id.toString()), user);
      console.log(`Added user: ${user.username}`);
    }

    // Sample reports
    const reports = [
      { id: 1, userId: 1, message: "Posted inappropriate content", date: "2025-01-15" },
      { id: 2, userId: 1, message: "Sharing fake fishing locations", date: "2025-02-20" },
      { id: 3, userId: 2, message: "Harassment in comments", date: "2025-01-10" },
      { id: 4, userId: 2, message: "Spamming fishing forums", date: "2025-01-12" },
      { id: 5, userId: 2, message: "Posting misleading information", date: "2025-02-01" },
      { id: 6, userId: 2, message: "Creating multiple accounts", date: "2025-02-15" },
      { id: 7, userId: 2, message: "Selling items against terms", date: "2025-03-01" }
    ];

    console.log('Seeding reports...');
    for (const report of reports) {
      await setDoc(doc(db, 'reports', report.id.toString()), report);
      console.log(`Added report: ${report.id}`);
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seedUsers();