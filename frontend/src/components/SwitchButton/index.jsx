import React, { useEffect, useState } from "react";
import "./style.css";

export default function SwitchButton(props) {
  const [userType, setUserType] = useState("Freelancer");

  useEffect(() => {
    const dataToSend = {
      userType: userType,
    };
    props.onData(dataToSend);
  }, [userType, props]);

  return (
    <div>
      <input
        type="checkbox"
        className="theme-checkbox"
        onChange={(e) => {
          setUserType(e.target.checked ? "Customer" : "Freelancer");
        }}
      ></input>
    </div>
  );
}
