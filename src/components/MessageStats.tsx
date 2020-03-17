import React, { FunctionComponent, useState, useEffect } from "react";
import getMessageStats from "../utils/getMessageStats";

const Layout: FunctionComponent<{ recentlyRead?: number }> = ({
  recentlyRead
}) => {
  const [unread, setUnread] = useState<number | undefined>(undefined);
  const [total, setTotal] = useState<number | undefined>(undefined);
  useEffect(() => {
    async function asyncGetMessageStats() {
      const messageStats = await getMessageStats();
      setUnread(messageStats.unread);
      setTotal(messageStats.total);
    }

    asyncGetMessageStats();
  }, []);

  if (total === undefined || unread === undefined) {
    return <p>...</p>;
  }

  const effectiveUnread = unread - (recentlyRead || 0);

  if (total === 0) {
    return <p>No messages have been shared yet. You should share one!</p>;
  }
  if (effectiveUnread === 0) {
    return (
      <p>
        <strong>{total}</strong> messages of joy have been shared, and they've
        all been read! You should share some more!
      </p>
    );
  }
  return (
    <p>
      <strong>{total}</strong> messages of joy have been shared total, and{" "}
      <strong>{effectiveUnread}</strong> of them are unread! How exciting! You
      should read {effectiveUnread === 1 ? "it." : "one of them."}
    </p>
  );
};

export default Layout;
