import React from "react";
import {Login,Forgot, Verify, ResetPassword } from "../screens/auth/index"
import { PanelContainer } from "../Dashboard/Panel";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

const AppRouter = () => {

    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/Forgot" exact component={Forgot} />
                    <Route path="/Verify" exact component={Verify} />
                    <Route path="/ResetPassword" exact component={ResetPassword} />
                    <Route path="/PanelContainer" exact component={PanelContainer } />
                </Switch>
            </Router>
        </>
    );
}
export default AppRouter;