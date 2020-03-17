import firebase from "./firebase";

// let docs:
//   | firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
//   | undefined = undefined;

export default async function getMessage() {
  //   if (docs) {
  //     return docs;
  //   }
  const messages = await firebase
    .firestore()
    .collection("/messages")
    .where("read", "==", false)
    .get();
  //   docs = messages.docs;
  return messages.docs;
  //   return docs;
}
