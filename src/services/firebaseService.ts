import * as admin from "firebase-admin";
import path from "path";
import { ServiceAccount } from "firebase-admin/app";

// This will hold our credential config
let serviceAccount: string | ServiceAccount;

// 1. Check if we are in production (on Vercel)
if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {

    // We are in production: parse the JSON string directly
    console.log("Loading Firebase credentials from JSON environment variable.");

    // NO MORE BASE64: We just parse the text from the variable
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON) as ServiceAccount;

} else {
    // We are in local development: use the file path
    console.log("Loading Firebase credentials from local file.");
    serviceAccount = path.join(
        __dirname,
        "../config/firebase_config.json" // Your local path
    );
}

// 2. Initialize the Firebase Admin SDK
try {
    admin.initializeApp({
        // This 'serviceAccount' variable works for both cases
        credential: admin.credential.cert(serviceAccount),

        // 3. IMPORTANT: Use an environment variable for your URL
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    console.log("Firebase Admin SDK initialized.");
} catch (error: any) {
    if (!/already exists/.test(error.message)) {
        console.error("Firebase Admin SDK initialization error:", error);
    }
}

// This interface defines the data we'll send to Firebase
export interface FirebaseSensorData {
    // PZEM Sensors
    voltage: number;
    current: number;
    power: number;
    energy: number;

    // Plant Sensors
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