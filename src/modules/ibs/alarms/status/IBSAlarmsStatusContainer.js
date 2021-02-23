import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    NavLink as RRNavLink, //React Router NavLink
    Route,
    Switch
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

import IBSAlarmsStatusPendingView from './IBSAlarmsStatusPendingView';
import IBSAlarmsStatusClosedView from './IBSAlarmsStatusClosedView';
import { connect } from 'react-redux';

class IBSAlarmsStatusContainer extends Component {

    /**
     * controls navbar toggle
     */
    nav = {
        isOpen: false,
        setIsOpen: false,
        defaultPaths: [
            "/ibs/alarms/status",
            "/ibs/alarms/status/pending",
        ],
    }

    toggleMenu() {
        this.nav.setIsOpen(!this.nav.isOpen);
    }

    /**
     * filters alarms from the redux store 
     * based on the status of the alarm
     * and returns an array containing
     * the alarms.
     * status can be 'Pending' or 'Closed' 
     * @param {string} status 
     * @returns {Array} alarms
     */
    getAlarmsByStatus(status){
        let alarms = this.props.ibsAlarms30Days.filter(alarm => alarm.alarm_status.includes(status));
        return alarms;
    }

    componentDidMount(){
        
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
                                    className="task-fxn"
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/status/pending">
                                    Pending Alarms ({this.getAlarmsByStatus('Pending').length})
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="task-fxn"
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/status/closing">
                                    Closed Alarms ({this.getAlarmsByStatus('Resolved').length})
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <NavbarBrand className="s-mod-brand">Alarms By Status</NavbarBrand>
                </Navbar>
                <Switch>
                    <Route exact path={this.nav.defaultPaths}>
                        <IBSAlarmsStatusPendingView pendingAlarms={this.getAlarmsByStatus('Pending')}/>
                    </Route>
                    <Route exact path="/ibs/alarms/status/closing">
                        <IBSAlarmsStatusClosedView closedAlarms={this.getAlarmsByStatus('Resolved')}/>
                    </Route>
                </Switch>
            </Router>
        );
    }

}

function mapStateToProps(state) {
    return {
        ibsAlarms30Days: state.ibsAlarms30Days[0],
    };
}

export default connect(mapStateToProps)(IBSAlarmsStatusContainer);