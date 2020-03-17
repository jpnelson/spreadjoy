import React, { FunctionComponent } from "react";
import Layout from "../layout/Layout";
import ShareMessage from "../components/ShareMessage";
import { Link } from "react-router-dom";

type Props = {};

const Share: FunctionComponent<Props> = () => {
  return (
    <Layout
      header={<h1>Share</h1>}
      cta={<ShareMessage />}
      secondaryCta={<Link to="/">Read more messages</Link>}
    >
      <p>
        Share something that you're thankful for. Research shows that being
        thankful can{" "}
        <a href="https://www.health.harvard.edu/healthbeat/giving-thanks-can-make-you-happier">
          make you happier!
        </a>{" "}
        This will be public and shared with one other person.
      </p>
    </Layout>
  );
};

export default Share;
