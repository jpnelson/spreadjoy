import React, { FunctionComponent } from "react";
import "./Layout.css";

type Props = {
  header: JSX.Element;
  cta: JSX.Element | null;
  secondaryCta: JSX.Element;
};

const Layout: FunctionComponent<Props> = ({
  children,
  header,
  cta,
  secondaryCta
}) => {
  return (
    <div className="App">
      <div className="Header">{header}</div>
      <div className="Body">{children}</div>
      <div className="Cta">{cta}</div>
      <div className="SecondaryCta">{secondaryCta}</div>
    </div>
  );
};

export default Layout;
