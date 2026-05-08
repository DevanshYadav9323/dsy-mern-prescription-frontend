import React from "react";
import PropTypes from "prop-types";
import { AuthProvider } from "./userContext";

export const MainProvider = ({ children })=>{
    return (
        <AuthProvider>{children}</AuthProvider>
    )
};

MainProvider.propTypes = {
    children:PropTypes.any
}