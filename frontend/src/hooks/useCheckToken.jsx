import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;

      const isTokenExpired = payload ? payload.exp < Date.now() / 1000 : true;

      if (isTokenExpired || token === null) {
        if (isTokenExpired || token === null) {
          localStorage.removeItem("token");
        }
        navigate("/overview");
      }
    } catch (error) {
      console.error(error);
      navigate("/overview");
      localStorage.removeItem("token");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthWrapper;
