import { Route, Redirect } from "react-router-dom";

export const AdminRoute =  ({ 
    isAuthenticated,
    isAdmin, 
    component: Component,
    ...rest
 }) => {


  return (
    <Route {...rest} 
      component={(props) => (
        (isAuthenticated && isAdmin)
         ? (<Component {...props} />)
         : (<Redirect to="/login" />)
      )}
      />
  );

}