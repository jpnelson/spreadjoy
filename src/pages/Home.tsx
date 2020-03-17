import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import ReadMessage from "../components/ReadMessage";
import MessageStats from "../components/MessageStats";
import "./Home.css";

type Props = {};

const Home: FunctionComponent<Props> = () => {
  const [recentlyRead, setRecentlyRead] = useState(0);
  return (
    <Layout
      header={<h1>Let's spread joy!</h1>}
      cta={<ReadMessage onRead={() => setRecentlyRead(recentlyRead + 1)} />}
      secondaryCta={<Link to="/share">Share your own message</Link>}
    >
      <p>
        Let's spread joy by reading and sharing anonymous messages of gratitude.
        Things might be rough, but there's still so much to be thankful for.
      </p>
      <div className="Home_MessageStatsWrapper">
        <MessageStats recentlyRead={recentlyRead} />
      </div>
    </Layout>
  );
};

export default Home;
