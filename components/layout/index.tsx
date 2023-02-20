import {memo, ReactElement } from "react";
import type { FC } from "react";
import Footer from "../footer";
import NavBar from "../navbar";
export interface IProps {
    children?: ReactElement;
}


const Layout: FC<IProps> =memo(function(props) {
    const { children } = props;
    return (
        <div className="Layout">
            {/* NavBar */}
            <NavBar></NavBar>

            {/* 页面内容：page */}
            {children}

            {/* Footer */}
            <Footer></Footer>
        </div>
    );
}) ;

export default Layout;
Layout.displayName ="Layout";
