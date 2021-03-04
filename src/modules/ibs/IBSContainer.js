import { Component } from "react";
import { connect } from "react-redux";
import IBSAlarmsContainer from "./alarms/IBSAlarmsContainer";

class IBSContainer extends Component {

    timer = {
        intervalTimer: ''
    };

    componentWillUnmount(){
        clearInterval(this.timer.intervalTimer);
    }
    render() {
        return (
            <IBSAlarmsContainer />
        );
    }
}

function mapStateToProps(state) {
    return {
        ibsAlarms: state.ibsAlarms,
        alarmsLoading: state.appState.isLoading,
    };
}

export default connect(mapStateToProps)(IBSContainer);