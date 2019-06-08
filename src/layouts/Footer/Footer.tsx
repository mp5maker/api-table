import  * as React from "react";

import "./Footer.scss"

interface FooterPropsInterface {
    me: any
}

export const Footer: React.SFC<FooterPropsInterface> = (): JSX.Element =>  {
    return (
        <footer>
            <div>
                &copy; { new Date().getFullYear() } All Rights Reserved, Photon Development
            </div>
        </footer>
    )
}