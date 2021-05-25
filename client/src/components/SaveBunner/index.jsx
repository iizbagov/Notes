import React, { useEffect } from "react";

function SaveBunner(props) {
  useEffect(() => {
    setTimeout(() => {
      props.onClose();
    }, 3000);
  }, []);
  return <div className="save__bunner">Your data was successfully saved</div>;
}

export default SaveBunner;
