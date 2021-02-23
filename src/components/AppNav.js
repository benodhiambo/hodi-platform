import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    NavLink as RRNavLink,
    Route,
    Switch
} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import IBSContainer from '../modules/ibs/IBSContainer';

class AppNav extends Component {
    /**
     * controls navbar toggle
     */
    nav = {
        isOpen: false,
        setIsOpen: false,
        defaultPaths: ["/", "/ibs"]
    }

    toggleMenu() {
        this.nav.setIsOpen(!this.nav.isOpen);
    }

    render() {
        return (
            <>
                <Router>
                    <Navbar expand="md">
                        <NavbarBrand className="hodi-logo" href="/">HODI PLATFORM</NavbarBrand>
                        <NavbarToggler onClick={this.toggleMenu} />
                        <Collapse isOpen={this.nav.isOpen} navbar>
                            <Nav className="app-nav mr-auto" navbar>
                                <NavItem>
                                    <NavLink
                                        tag={RRNavLink}
                                        activeClassName="active-app"
                                        exact
                                        to="/ibs">
                                        IBS
                                </NavLink>
                                </NavItem>
                            </Nav>
                            <NavbarText>administrator</NavbarText>
                        </Collapse>
                    </Navbar>
                    <Switch>
                        <Route exact path={this.nav.defaultPaths}>
                            <IBSContainer />
                        </Route>
                    </Switch>
                </Router>
            </>
        );
    }
}

export default AppNav;
