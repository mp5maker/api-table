import * as React from "react";

import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";

import thunk from 'redux-thunk';

import loadable from "@loadable/component";

// @ts-ignore
import { Loading } from "Layouts/Loading/Loading";

// @ts-ignore
import { RootReducer } from "Reducers/RootReducer";

import "./index.scss";

const store = createStore(RootReducer, applyMiddleware(thunk));

const rendering = () => {
    // @ts-ignore
    const App = loadable(() => import("App/App"))
    ReactDOM.render(
        <Provider store={store}>
            {App ? <App /> : <Loading />}
        </Provider>,
        document.getElementById("root")
    );
};

rendering();