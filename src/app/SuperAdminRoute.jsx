import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';

const SuperAdminRoute = ({ component, exact = false, path, authenticated }) => (
    <Route
        exact={exact}
        path={path}
        render={props => (
                authenticated && utilityHelper.getUserInfo().user_type == configConstants.USER_TYPE_SUPERADMIN? (
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

SuperAdminRoute.propTypes = {
    component: func.isRequired,
    exact: bool,
    path: string.isRequired,
    authenticated: bool.isRequired,
    location: object
};

export { SuperAdminRoute };
