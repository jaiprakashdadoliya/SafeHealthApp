import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';

const UserRoute = ({ component, exact = false, path, authenticated, allowuser }) => (
    <Route
        exact={exact}
        path={path}
        render={props => (
                authenticated && utilityHelper.inArray(utilityHelper.getUserInfo().user_type, allowuser) ? (
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

UserRoute.propTypes = {
    component: func.isRequired,
    exact: bool,
    path: string.isRequired,
    authenticated: bool.isRequired,
    location: object
};

export { UserRoute };
