/**
 * store
 *
 * @package                SafeHealth
 * @subpackage             store
 * @category               Helper
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for creating and exporting store
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

export const store = createStore(
        rootReducer, 
        undefined, 
        compose(
                applyMiddleware(
                    thunkMiddleware,
                    loggerMiddleware
                )
            )
       );