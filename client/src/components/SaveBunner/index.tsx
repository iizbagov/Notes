import { useEffect } from "react";

export interface SaveBunnerProps {
  onClose: () => void;
}

function SaveBunner(props: SaveBunnerProps) {
  useEffect(() => {
    setTimeout(() => {
      props.onClose();
    }, 3000);
  }, []);
  return <div className="save__bunner">Your data was successfully saved</div>;
}

export default SaveBunner;
