import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { AppContext } from "../Context";

function AuthenticatedRoute(props: RouteProps) {
  const context = useContext(AppContext);
  const isAuthenticated = context.state.isAuthenticated;
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Route exact={props.exact} path={props.path} render={props.render} />;
}

export default AuthenticatedRoute;
