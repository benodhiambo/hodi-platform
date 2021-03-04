import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    NavLink as RRNavLink, //React Router NavLink
    Route,
    Switch,
    withRouter
} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import IBSAlarmsDateContainer from './date/IBSAlarmsDateContainer';
import IBSAlarmsSeverityContainer from './severity/IBSAlarmsSeverityContainer';
import IBSAlarmsStatusContainer from './status/IBSAlarmsStatusContainer';
import IBSAlarmsTypeContainer from './type/IBSAlarmsTypeContainer';

class IBSAlarmsNav extends Component {
    /**
     * controls:
     * 1. navbar toggle
     * 2. paths chosen for default url
     * 3. the css active classes chosen by default
     * 4. the module name for the current chosen submodule
     */
    nav = {
        isOpen: false,
        setIsOpen: false,
        defaultPaths: ["/ibs/alarms/date", "/ibs/alarms", "/ibs", "/"],
        defaultActive: "s-mod-fxn", //css highlighting,
        subModule: "All Alarms"
    }

    setSubModuleName(name) {
        this.nav.subModule = name
    }

    toggleMenu() {
        this.nav.setIsOpen(!this.nav.isOpen);
    }

    /**
     * Used to get the name of
     * the sub module chosen 
     * @param {*} subModule 
     */
    handleCallback = (subModName) => {
        subModName.preventDefault();
        this.nav.subModule = subModName
    }


    componentDidMount() {
        if (this.nav.defaultPaths.includes(this.props.location.pathname)) {
            this.nav.defaultActive = "s-mod-fxn";
        } else {
            this.nav.defaultActive = "s-mod-fxn";
        }
    }

    renderRouter() {
        return (
            <>
                <Router>
                    <Navbar className="s-mod-head" expand="md">
                        <NavbarToggler onClick={this.toggleMenu} />
                        <Collapse className="s-mod-nav" isOpen={this.nav.isOpen} navbar>
                            <Nav className="s-mod-nav-ul mr-auto" navbar>
                                <NavItem>
                                    <NavLink
                                        className="s-mod-fxn"
                                        activeClassName="active-module"
                                        tag={RRNavLink}
                                        exact
                                        to="/ibs/alarms/date">
                                        Alarms-Date
                                    </NavLink>
                                </NavItem>
                                {/* <NavItem>
                                    <NavLink
                                        className={this.nav.defaultActive}
                                        activeClassName="active-module"
                                        tag={RRNavLink}
                                        exact
                                        to="/ibs/alarms/all">
                                        Alarms-All
                                    </NavLink>
                                </NavItem> */}
                                <NavItem>
                                    <NavLink
                                        className="s-mod-fxn"
                                        activeClassName="active-module"
                                        tag={RRNavLink}
                                        exact
                                        to="/ibs/alarms/severity">
                                        Alarms-Severity
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className="s-mod-fxn"
                                        activeClassName="active-module"
                                        tag={RRNavLink}
                                        exact
                                        to="/ibs/alarms/status">
                                        Alarms-Status
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className="s-mod-fxn"
                                        activeClassName="active-module"
                                        tag={RRNavLink}
                                        exact
                                        to="/ibs/alarms/type">
                                        Alarms-Code
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>

                    <Switch>
                        {/* <Route exact path="/ibs/alarms/all">
                            <IBSAlarmsAllContainer />
                        </Route> */}
                        <Route exact path="/ibs/alarms/severity">
                            <IBSAlarmsSeverityContainer />
                        </Route>
                        <Route exact path="/ibs/alarms/status">
                            <IBSAlarmsStatusContainer />
                        </Route>
                        <Route exact path="/ibs/alarms/type">
                            <IBSAlarmsTypeContainer />
                        </Route>
                        <Route exact path={this.nav.defaultPaths}>
                            <IBSAlarmsDateContainer />
                        </Route>
                    </Switch>
                </Router>
            </>
        );
    }

    render() {
        return this.renderRouter();
    }

}

function mapStateToProps(state) {
    return {
        ibsAlarms: state.ibsAlarms,
        alarmsLoading: state.appState.isLoading
    };
}

export default withRouter(connect(mapStateToProps)(IBSAlarmsNav));
