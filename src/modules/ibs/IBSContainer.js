import { Component } from "react";
import { connect } from "react-redux";
import { fetchAlarmsBegin, fetchAlarmsEnd } from "../../redux/appStateActions";
import IBSAlarmsContainer from "./alarms/IBSAlarmsContainer";
import { addNewAlarmsToState } from "./redux/ibsAlarmsActions";

class IBSContainer extends Component {

    timer = {
        intervalTimer: ''
    };

    componentDidMount() {
        // if (this.props.ibsAlarms.length === 0 ||
        //     this.props.ibsAlarms.length === undefined) {

        //     /**
        //      * set ibs loading state to true
        //      */
        //     this.props.dispatch(fetchAlarmsBegin());

        //     /**
        //      * Fetch New Alarms from API
        //      */
        //     setTimeout(() => {
        //         addNewAlarmsToState();

        //         /**
        //          * set ibs loading state to False
        //          */
        //         this.props.dispatch(fetchAlarmsEnd());
        //     }, 13);

        // } 

        // this.timer.intervalTimer = setInterval(async () => {
        //     this.props.dispatch(fetchAlarmsBegin());
        //     addNewAlarmsToState();
        //     // this.updateExistingAlarms();
        //     this.props.dispatch(fetchAlarmsEnd());
        // }, 20000);
    }

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