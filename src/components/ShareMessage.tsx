import React, { FunctionComponent, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import firebase from "../utils/firebase";

import "./ShareMessage.css";

const Layout: FunctionComponent = () => {
  const [message, setMessage] = useState("");
  const [buttonMessage, setButtonMessage] = useState<undefined | string>(
    undefined
  );

  useEffect(() => {
    setTimeout(() => {
      setButtonMessage(undefined);
    }, 2000);
  }, [buttonMessage === undefined]);

  const buttonContents = buttonMessage ? (
    buttonMessage
  ) : (
    <>
      <span role="img" aria-label="Mail emoji">
        💌
      </span>{" "}
      Share message
    </>
  );

  return (
    <div>
      <div className="ShareMessage_TextArea">
        <Form.Control
          as="textarea"
          rows="3"
          value={message}
          onChange={e => setMessage((e.target as any).value)}
          placeholder="Today, I am thankful for..."
        />
      </div>
      <Button
        disabled={message.length === 0}
        title={message.length === 0 ? "Write a message first!" : undefined}
        variant="primary"
        onClick={async () => {
          await firebase
            .firestore()
            .collection("/messages")
            .add({
              message,
              read: false
            });

          setMessage("");
          setButtonMessage("✅ Shared!");
        }}
      >
        {buttonContents}
      </Button>
    </div>
  );
};

export default Layout;
