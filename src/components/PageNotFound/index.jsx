import React from "react";
import { Empty } from "antd";

function PageNotFound(props) {
  return (
    <>
      <Empty
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        description={<span>No Page Found!</span>}
      />
    </>
  );
}

export default PageNotFound;
