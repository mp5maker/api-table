import * as React from "react";

import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";

import thunk from 'redux-thunk';

// import loadable from "@loadable/component";
// @ts-ignore
import { Routes } from 'Routes/Routes'

// @ts-ignore
import { Loading } from "Layouts/Loading/Loading";

// @ts-ignore
import { RootReducer } from "Reducers/RootReducer";

import "./index.scss";

const store = createStore(RootReducer, applyMiddleware(thunk));

const rendering = () => {
    // @ts-ignore
    ReactDOM.render(
        <Provider store={store}>
            {Routes ? <Routes /> : <Loading />}
        </Provider>,
        document.getElementById("root")
    );
};

rendering();