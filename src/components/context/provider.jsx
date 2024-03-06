import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./context";

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState();

  const navigate = useNavigate();

  const contextValues = {
    navigate,
    showToast,
    setShowToast,
    setLoading,
    loading,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
