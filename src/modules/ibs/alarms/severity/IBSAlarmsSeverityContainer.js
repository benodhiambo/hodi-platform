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
    NavbarBrand,
} from 'reactstrap';
import IBSAlarmsSeverityCriticalView from './IBSAlarmsSeverityCriticalView';
import IBSAlarmsSeverityMinorView from './IBSAlarmsSeverityMinorView';

class IBSAlarmsSeverityContainer extends Component {
    /**
     * controls navbar toggle
     */
    nav = {
        isOpen: false,
        setIsOpen: false,
        defaultPaths: [
            "/ibs/alarms/severity/critical",
            "/ibs/alarms/severity/"
        ],
        defaultActive: "task-fxn"
    }

    toggleMenu() {
        this.nav.setIsOpen(!this.nav.isOpen);
    }

    componentDidMount(){
        if (this.nav.defaultPaths.includes(this.props.location.pathname)) {
            this.nav.defaultActive = "task-fxn active-task";
        } else {
            this.nav.defaultActive = "task-fxn"
        }
    }

    /**
     * filters alarms from the redux store 
     * based on the severity level given
     * and returns an array containing
     * the alarms.
     * severity can 'Critical' or 'Minor' 
     * @param {string} severity 
     * @returns {Array} alarms
     */
    getAlarmsBySeverity(severity) {
        if (this.props.ibsAlarms30.length !== undefined) {

            let alarms = this.props.ibsAlarms30.filter(alarm => alarm.alarm_severity.includes(severity));
            return alarms;
        }
        return;
    }

    render() {
        return (
            <Router>
                <Navbar className="task-head" expand="md">
                    <NavbarToggler onClick={this.toggleMenu} />
                    <Collapse className="task-nav" isOpen={this.nav.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink
                                    className={this.nav.defaultActive}
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/severity/critical">
                                    Critical Alarms ({this.getAlarmsBySeverity('Critical').length})
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="task-fxn"
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/severity/minor">
                                    Minor Alarms ({this.getAlarmsBySeverity('Minor').length})
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <NavbarBrand className="s-mod-brand">Alarms By Severity</NavbarBrand>
                </Navbar>
                <Switch>
                    <Route exact path={this.nav.defaultPaths}>
                        <IBSAlarmsSeverityCriticalView criticalAlarms={this.getAlarmsBySeverity('Critical')} />
                    </Route>
                    <Route exact path="/ibs/alarms/severity/minor">
                        <IBSAlarmsSeverityMinorView minorAlarms={this.getAlarmsBySeverity('Minor')} />
                    </Route>
                </Switch>
            </Router>
        );
    }

}

function mapStateToProps(state) {
    return {
        ibsAlarms30: state.ibsAlarms30Days[0],
        alarmsLoading: state.appState.isLoading
    };
}

export default withRouter(connect(mapStateToProps)(IBSAlarmsSeverityContainer));