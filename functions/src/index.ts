import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

// now use the SDK in the body of the function

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const documentWriteListener = functions.firestore
  .document("messages/{message}")
  .onWrite((change, context) => {
    let totalChange = 0;
    let unreadChange = 0;
    if (change.after.exists && !change.before.exists) {
      // New document
      totalChange = 1;
      if (change.after.data()?.read === false) {
        unreadChange = 1;
      }
    } else if (!change.after.exists && change.before.exists) {
      // Removed document
      totalChange = -1;
      if (change.before.data()?.read === false) {
        unreadChange = -1;
      }
    } else {
      // Updated document
      if (
        change.before.data()?.read === true &&
        change.after.data()?.read === false
      ) {
        unreadChange = 1;
      } else if (
        change.before.data()?.read === false &&
        change.after.data()?.read === true
      ) {
        unreadChange = -1;
      }
    }

    return admin
      .firestore()
      .collection("stats")
      .doc("messageStats")
      .update({
        total: admin.firestore.FieldValue.increment(totalChange),
        unread: admin.firestore.FieldValue.increment(unreadChange)
      });
  });
