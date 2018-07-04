import store from '../store/store';
import React from 'react';
import { Route, Redirect } from "react-router-dom";

function isLoggedIn(user) {
    if(!user.name && !user.email && !user.user_type) {
        return false;
    } else {
        return true;
    }
}

function PrivateRoute({ component: Component, condition, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                condition ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                        pathname: "/home",
                        state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export default {
    isLoggedIn: isLoggedIn,
    PrivateRoute: PrivateRoute
};