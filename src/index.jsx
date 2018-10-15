import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { sessionService } from './_packages/redux-react-session';
import { store } from './_helpers';
import {App} from "./app";
import { Scrollbars } from 'react-custom-scrollbars';
import windowDimensions from 'react-window-dimensions';

// Init the session service
const options = { driver: 'COOKIES'};
sessionService.initSessionService(store, options);

ReactDOM.render((
    <Provider store={store}>
        	<App />
    </Provider>
), document.getElementById('index'));
