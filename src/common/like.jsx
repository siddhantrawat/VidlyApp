import React from "react";
const Like = props => {
  return (
    <i
      className={"fa fa-heart" + (props.liked === true ? "" : "-o")}
      aria-hidden="true"
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
