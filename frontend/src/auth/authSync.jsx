import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useDispatch } from "react-redux";

function AuthSync({children }) {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.id_token) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: auth.user.profile,
          token: auth.user.id_token,
        },
      });
    }
  }, [auth.isAuthenticated]);

  return children;
}

export default AuthSync;