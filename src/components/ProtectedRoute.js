import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({ component: Comp, authedUser, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return authedUser 
            ? <Comp {...props} /> 
            : <Redirect to={{
                pathname: '/',
                state: {from: props.location.pathname}
            }}/>;
        }}
      />
    );
  };
export default ProtectedRoute;