import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../config/routes";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useNavigate();
    const hasToken = Boolean(localStorage.getItem("token"));

    useEffect(() => {
      if (!hasToken) {
        router(ROUTES.AUTH);
      }
    }, [hasToken, router]);

    if (!hasToken) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
