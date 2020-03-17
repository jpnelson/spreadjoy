import firebase from "./firebase";

export default async function getMessageStats() {
  const messageStats = await firebase
    .firestore()
    .collection("/stats")
    .doc("messageStats")
    .get();

  return {
    unread: messageStats.data()?.unread ?? 0,
    total: messageStats.data()?.total ?? 0
  };
}
