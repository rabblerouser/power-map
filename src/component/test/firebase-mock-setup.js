import * as firebasemock from "firebase-mock";

export const mockAuth = new firebasemock.MockAuthentication();
export const mockDB = new firebasemock.MockFirebase();
export const mockFirestore = new firebasemock.MockFirestore();
export const mockStorage = new firebasemock.MockStorage();
export const mockMessaging = new firebasemock.MockMessaging();
export const mocksdk = new firebasemock.MockFirebaseSdk(
    // use null if your code does not use RTDB
    (path) => {
        return path ? mockDB.child(path) : mockDB;
    },
    // use null if your code does not use AUTHENTICATION
    () => {
        return null;
    },
    // use null if your code does not use FIRESTORE
    () => {
        return null;
    },
    // use null if your code does not use STORAGE
    () => {
        return null;
    },
    // use null if your code does not use MESSAGING
    () => {
        return null;
    }
);