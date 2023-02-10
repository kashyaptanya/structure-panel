import React from "react";
import { Login, Forgot, Verify, ResetPassword } from "../screens/auth/index"
import { PanelContainer } from "../Dashboard/Panel";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux"
const AppRouter = () => {
    let token = (useSelector((state) => state.auth.token) && localStorage.getItem('token'))
    return (
        <>

            {token ? <Route path="/PanelContainer" exact component={PanelContainer} /> 
            :
                <Router>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/Forgot" exact component={Forgot} />
                        <Route path="/Verify" exact component={Verify} />
                        <Route path="/ResetPassword" exact component={ResetPassword} />
                    </Switch>
                </Router>
            }
        </>
    );
}
export default AppRouter;