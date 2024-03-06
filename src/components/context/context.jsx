import { createContext, useContext } from "react";

export const AppContext = createContext({
  navigate: () => {},
  showToast: () => {},
  setLoading: () => {},
  loading: false,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
