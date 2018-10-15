import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { configConstants } from '../_constants';

const AdminRoute = ({ component, exact = false, path, authenticated, user }) => (
    <Route
        exact={exact}
        path={path}
        render={props => (
                authenticated && user.user_type == configConstants.USER_TYPE_ADMIN? (
                React.createElement(component, props)
            ) : (
                <Redirect to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}/>
            )
        )}
    />
);

const { object, bool, string, func } = PropTypes;

AdminRoute.propTypes = {
    component: func.isRequired,
    exact: bool,
    path: string.isRequired,
    authenticated: bool.isRequired,
    location: object
};

export default AdminRoute;
