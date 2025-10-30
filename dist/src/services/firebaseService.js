"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFirebaseRealtimeData = void 0;
const admin = __importStar(require("firebase-admin"));
const path_1 = __importDefault(require("path"));
// 1. Import your downloaded service account key
//    Make sure the path is correct
const serviceAccountPath = path_1.default.join(__dirname, "../config/firebase_config.json");
// 2. Initialize the Firebase Admin SDK
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
        // ❗️ Find this in your Firebase Console -> Realtime Database
        databaseURL: "https://ph-monitor-5bd12-default-rtdb.asia-southeast1.firebasedatabase.app/"
    });
    console.log("Firebase Admin SDK initialized.");
}
catch (error) {
    if (!/already exists/.test(error.message)) {
        console.error("Firebase Admin SDK initialization error:", error);
    }
}
/**
 * Updates the latest sensor readings in Firebase Realtime Database.
 * @param data - The sensor data to update.
 */
const updateFirebaseRealtimeData = async (data) => {
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
    }
    catch (error) {
        console.error("Error updating Firebase:", error);
    }
};
exports.updateFirebaseRealtimeData = updateFirebaseRealtimeData;
