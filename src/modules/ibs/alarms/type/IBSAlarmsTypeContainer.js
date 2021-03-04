import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import IBSAlarmsTypeOpticalView from './IBSAlarmsTypeOpticalView';
import IBSAlarmsTypePowerView from './IBSAlarmsTypePowerView';
import IBSAlarmsTypeRadioView from './IBSAlarmsTypeRadioView';
import IBSAlarmsTypeRectifierView from './IBSAlarmsTypeRectifierView';
import IBSAlarmsTypeTempView from './IBSAlarmsTypeTempView';

class IBSAlarmsTypeContainer extends Component {
    /**
     * controls navbar toggle
     */
    nav = {
        isOpen: false,
        setIsOpen: false,
        defaultPaths: [
            "/ibs/alarms/type/power",
            "/ibs/alarms/type"
        ],
    }

    toggleMenu() {
        this.nav.setIsOpen(!this.nav.isOpen);
    }

    /**
     * filters alarms from the redux store 
     * based on the type of the alarm
     * and returns an array containing
     * the alarms. 
     * @param {string} type 
     * @returns {Array} alarms
     */
    getAlarmsByType(type) {
        if (this.props.ibsAlarms30Days) {
            let alarms = this.props.ibsAlarms30Days.filter(alarm => alarm.alarm_type.includes(type));
            return alarms;
        }
    }

    componentDidMount() {

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
                                    to="/ibs/alarms/type/power">
                                    Power ({this.getAlarmsByType('Power').length})
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="task-fxn"
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/type/optical">
                                    Optical ({this.getAlarmsByType('Optical').length})
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="task-fxn"
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/type/temp">
                                    Temperature ({this.getAlarmsByType('Temperature').length})
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="task-fxn"
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/type/radio">
                                    Radio ({this.getAlarmsByType('Radio').length})
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="task-fxn"
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/type/rectifier">
                                    Rectifier ({this.getAlarmsByType('Rectifier').length})
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <NavbarBrand className="s-mod-brand">Alarms By Code</NavbarBrand>
                </Navbar>
                <Switch>
                    <Route exact path={this.nav.defaultPaths}>
                        <IBSAlarmsTypePowerView powerAlarms={this.getAlarmsByType('Power')} />
                    </Route>
                    <Route exact path="/ibs/alarms/type/optical">
                        <IBSAlarmsTypeOpticalView opticalAlarms={this.getAlarmsByType('Optical')} />
                    </Route>
                    <Route exact path="/ibs/alarms/type/temp">
                        <IBSAlarmsTypeTempView tempAlarms={this.getAlarmsByType('Temperature')} />
                    </Route>
                    <Route exact path="/ibs/alarms/type/radio">
                        <IBSAlarmsTypeRadioView radioAlarms={this.getAlarmsByType('Radio')} />
                    </Route>
                    <Route exact path="/ibs/alarms/type/rectifier">
                        <IBSAlarmsTypeRectifierView rectifierAlarms={this.getAlarmsByType('Rectifier')} />
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

export default connect(mapStateToProps)(IBSAlarmsTypeContainer);