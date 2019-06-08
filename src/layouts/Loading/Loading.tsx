import * as React from "react";

interface LoadingPropsInterface { }

import "./Loading.scss"

const Loading: React.SFC<LoadingPropsInterface> = () => (
    <div className="loading">
        <div className="loading-container">
            <span className="loading-circle"></span>
        </div>
    </div>
)

export default Loading;
export { Loading }