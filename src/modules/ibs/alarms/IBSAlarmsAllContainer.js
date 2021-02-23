import { Component } from "react";
import { connect } from "react-redux";
import {  fetchAlarmsByDate } from "../redux/ibsAlarmsActions";
import IBSAllAlarmsTableView from "./IBSAllAlarmsTableView";

class IBSAlarmsAllContainer extends Component {

    componentDidMount(){
        console.log('this runsss ooo .... ')
        fetchAlarmsByDate("2020-12-30");
    }

    render() {
        return (
            <IBSAllAlarmsTableView />
        );
    }
}

function mapStateToProps(state) {
    return {
        ibsAlarms: state.ibsAlarms,
        alarmsLoading: state.appState.isLoading,
    };
}

export default connect(mapStateToProps)(IBSAlarmsAllContainer);