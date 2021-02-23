import { Component } from "react";
import { setUpAlarmsStores } from "../redux/ibsAlarmsActions";
import IBSAlarmsView from "./IBSAlarmsView";

class IBSAlarmsContainer extends Component {

    constructor(props){
        super(props);
        setUpAlarmsStores();
    }

    render() {
        return (
            <IBSAlarmsView />
        );
    }
}

export default IBSAlarmsContainer;