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
import { fetchAlarmsByDateRange } from '../../redux/ibsAlarmsActions';
import IBSAlarmsDate12HrsView from './IBSAlarmsDate12HrsView';
import IBSAlarmsDate24HrsView from './IBSAlarmsDate24HrsView';
import IBSAlarmsDate30DaysView from './IBSAlarmsDate30DaysView';
import IBSAlarmsDate7DaysView from './IBSAlarmsDate7DaysView';
import IBSAlarmsDateRangeView from './IBSAlarmsDateRangeView';

class IBSAlarmsDateContainer extends Component {
    constructor(props) {
        super(props);
        /**
         * state variable controls
         * 1. navbar toggle
         * 2. default component to render(based on route)
         * 3. no. of alarms
         * 4. adding alalrms to array
         */
        this.state = {
            isOpen: false,
            setIsOpen: false,
            defaultPaths: [
                "/ibs/alarms/date/24hrs",
                "/ibs/alarms/date",
                "/ibs/alarms",
                "/ibs",
                "/"
            ],
            alarmCount: {
                days7: "",
                days30: ""
            },
        };
        this.getAlarmsForMonth();
    }

    toggleMenu() {
        this.state.setIsOpen(!this.state.isOpen);
    }

    /**
     * retrieves alarms from the redux store 
     * for the current month
     * and returns an array containing
     * the alarms. 
     * @param {*}  
     * @returns {Array} alarms
     */
    getAlarmsForMonth() {
        let todaysDate = new Date();
        let thisMonth = todaysDate.getMonth() + 1;
        if (thisMonth < 10) {
            thisMonth = "0" + thisMonth
        }
        let thisYear = todaysDate.getFullYear();
        let startDate = thisYear + '-' + thisMonth + '-' + '01';

        let numDate = todaysDate.getDate();
        if (numDate < 10) {
            numDate = "0" + numDate
        }
        let endDate = thisYear + '-' + thisMonth + '-' + numDate;

        fetchAlarmsByDateRange(startDate, endDate);
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.ibsAlarms7Days !== undefined) {
                this.state.alarmCount.days7 = "(" + this.props.ibsAlarms7Days.length + ")";
                this.state.alarmCount.days30 = "(" + this.props.ibsAlarms30Days.length + ")";
            } else {
                this.state.alarmCount.days7 = "(0)";
                this.state.alarmCount.days30 = "(0)";
            }

        }, 3000);
    }

    render() {
        return (
            <Router>
                <Navbar className="task-head" expand="md">
                    <NavbarToggler onClick={this.toggleMenu} />
                    <Collapse className="task-nav" isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink
                                    className="task-fxn"
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/date/range">
                                    Custom Date Range
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="task-fxn"
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/date/12hrs">
                                    Last 12 Hours
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="task-fxn"
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/date/24hrs">
                                    Last 24 Hours
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="task-fxn"
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/date/7days">
                                    Last 7 Days {this.state.alarmCount.days7}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="task-fxn"
                                    activeClassName="active-task"
                                    tag={RRNavLink}
                                    exact
                                    to="/ibs/alarms/date/30days">
                                    Last 30 Days {this.state.alarmCount.days30}
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <NavbarBrand className="s-mod-brand">Alarms By Date</NavbarBrand>
                </Navbar>
                <Switch>
                    <Route exact path="/ibs/alarms/date/12hrs">
                        <IBSAlarmsDate12HrsView alarms12Hrs={this.props.ibsAlarms12Hrs} />
                    </Route>
                    <Route exact path={this.state.defaultPaths}>
                        <IBSAlarmsDate24HrsView alarms24Hrs={this.props.ibsAlarms24Hrs} />
                    </Route>
                    <Route exact path="/ibs/alarms/date/7days">
                        <IBSAlarmsDate7DaysView alarms7Days={this.props.ibsAlarms7Days} />
                    </Route>
                    <Route exact path="/ibs/alarms/date/30days">
                        <IBSAlarmsDate30DaysView alarms30Days={this.props.ibsAlarms30Days} />
                    </Route>
                    <Route exact path="/ibs/alarms/date/range">
                        <IBSAlarmsDateRangeView dateRangeAlarms={""} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return {
        ibsAlarms: state.ibsAlarms,
        ibsAlarms7Days: state.ibsAlarms7Days[0],
        ibsAlarms30Days: state.ibsAlarms30Days[0],
        ibsAlarms24Hrs: state.ibsAlarms24Hrs[0],
        ibsAlarms12Hrs: state.ibsAlarms12Hrs[0]
    };
}

export default connect(mapStateToProps)(IBSAlarmsDateContainer);