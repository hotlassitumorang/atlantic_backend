import * as admin from "firebase-admin";
import path from "path";

// 1. Import your downloaded service account key
//    Make sure the path is correct
const serviceAccountPath = path.join(
    __dirname,
    "../config/firebase_config.json"
);

// 2. Initialize the Firebase Admin SDK
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
        // ❗️ Find this in your Firebase Console -> Realtime Database
        databaseURL: "https://ph-monitor-5bd12-default-rtdb.asia-southeast1.firebasedatabase.app/"
    });
    console.log("Firebase Admin SDK initialized.");
} catch (error: any) {
    if (!/already exists/.test(error.message)) {
        console.error("Firebase Admin SDK initialization error:", error);
    }
}

// This interface defines the data we'll send to Firebase
export interface FirebaseSensorData {
    energy: number;
    water_temperature: number;
    humidity: number;
    ph: number;
    nutrient_ppm: number;
}

/**
 * Updates the latest sensor readings in Firebase Realtime Database.
 * @param data - The sensor data to update.
 */
export const updateFirebaseRealtimeData = async (data: FirebaseSensorData): Promise<void> => {
    console.log("Updating Firebase with data:", data);

    try {
        // 3. Get a reference to your database
        const db = admin.database();

        // 4. Set the 'latest_readings' path to the new data
        //    .ref() is the path in your database
        //    .set() will overwrite data at that path
        const ref = db.ref("latest_readings");
        await ref.set(data);

        console.log("Firebase data updated successfully.");
    } catch (error) {
        console.error("Error updating Firebase:", error);
    }
};