import React, { FunctionComponent, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import firebase from "../utils/firebase";
import getMessages from "../utils/getMessages";

import "./ReadMessage.css";
import getMessageStats from "../utils/getMessageStats";

type MessageDocument = firebase.firestore.DocumentSnapshot<{
  read: boolean;
  message: string;
}>;

function getRandomMessage(
  docs: Array<MessageDocument>
): MessageDocument | undefined {
  const unreadDocuments = docs.filter(doc => {
    const data = doc.data();
    if (!data) {
      return false;
    }
    return data.read === false;
  });
  return unreadDocuments[Math.ceil(Math.random() * unreadDocuments.length) - 1];
}

const Layout: FunctionComponent<{ onRead?(): void }> = ({ onRead }) => {
  const [message, setMessage] = useState("");
  const [recentlyRead, setRecentlyRead] = useState(0);
  const [clicked, setClicked] = useState(false);

  const [unread, setUnread] = useState<number | undefined>(undefined);
  useEffect(() => {
    async function asyncGetMessageStats() {
      const messageStats = await getMessageStats();
      setUnread(messageStats.unread);
    }

    asyncGetMessageStats();
  });

  // We let people read more at once if more are available, or 5, whichever is greater
  const cooldown = Math.max(
    unread === undefined ? 0 : Math.floor(unread / 10),
    5
  );

  const isOnCooldown = recentlyRead > cooldown;
  const effectiveUnread = unread === undefined ? unread : unread - recentlyRead;

  return (
    <div>
      <p
        className="ReadMessage_Message"
        style={{
          transform:
            message.length === 0 ? "translateX(-100vw)" : "translateX(0)"
        }}
      >
        {message}
      </p>
      <div
        style={
          effectiveUnread === 0 || effectiveUnread === undefined
            ? { display: "none" }
            : {}
        }
      >
        <Button
          disabled={isOnCooldown}
          title={isOnCooldown ? "Please share some more messages first!" : ""}
          onClick={async () => {
            const docs = await getMessages();
            setClicked(true);
            const messageToReadDocument = getRandomMessage(
              docs as MessageDocument[]
            );
            if (!messageToReadDocument) {
              setMessage(
                "It seems as though there are no messages, why not share one first?"
              );
              return;
            }

            const messageToRead =
              messageToReadDocument.data()?.message ??
              "Something went wrong! Please try again later";

            setMessage(messageToRead);
            setRecentlyRead(recentlyRead + 1);
            onRead && onRead();

            await messageToReadDocument.ref.update({
              read: true
            });
          }}
        >
          <span role="img" aria-label="Sparkles">
            ✨
          </span>{" "}
          Read {clicked ? "another" : ""} message
        </Button>
      </div>
    </div>
  );
};

export default Layout;
