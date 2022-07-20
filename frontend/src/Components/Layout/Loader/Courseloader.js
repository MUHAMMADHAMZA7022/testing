
import SyncLoader from "react-spinners/FadeLoader";

import React from "react";
import { css } from "@emotion/react";
import "./Loader.css";
const Loader = () => {
    const override = css`
    color: red;
  margin:auto;
  border-color: red;
`;
  return (
      <div className="s">
       
          <SyncLoader  size={30} color='black'  css={override} />
      </div>
  );
};

export default Loader;