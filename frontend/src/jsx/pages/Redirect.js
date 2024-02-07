import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  var navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  });
  return <></>;
};

export default Redirect;
