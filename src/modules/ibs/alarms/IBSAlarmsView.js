import React, { Component } from 'react';
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
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import { connect } from 'react-redux';
import IBSAlarmsNav from './IBSAlarmsNav';

class IBSAlarmsView extends Component {
    /**
     * controls navbar toggle
     */
    nav = {
        isOpen: false,
        setIsOpen: false,
        defaultPaths: ["/ibs/alarms","/ibs","/"],
        defaultActive: "mod-fxn",// for css to highlight current link
    }

    toggleMenu() {
        this.nav.setIsOpen(!this.nav.isOpen);
    }

    componentDidMount(){
        if (this.nav.defaultPaths.includes(this.props.location.pathname)) {
            this.nav.defaultActive = "mod-fxn active-module";
        } else {
            this.nav.defaultActive = "mod-fxn";
        }
    }

    render() {
        return (
            <>
                <Router>
                    <Navbar className="mod-head" expand="md">
                        <NavbarToggler onClick={this.toggleMenu} />
                        <Collapse className="mod-nav" isOpen={this.nav.isOpen} navbar>
                            <Nav className="mod-nav-ul mr-auto" navbar>
                                <NavItem>
                                    <NavLink
                                        className={this.nav.defaultActive}
                                        activeClassName="active-module"
                                        tag={RRNavLink}
                                        exact
                                        to="/ibs/alarms">
                                        Alarms
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        <NavbarBrand className="mod-brand">Indoor Base Stations</NavbarBrand>
                    </Navbar>

                    <Switch>
                        <Route exact path={this.nav.defaultPaths}>
                            <IBSAlarmsNav location="/ibs/alarms" />
                        </Route>
                    </Switch>
                </Router>
            </>

        );
    }

}

function mapStateToProps(state) {
    return {
        ibsAlarms: state.ibsAlarms,
    };
}

export default withRouter(connect(mapStateToProps)(IBSAlarmsView));