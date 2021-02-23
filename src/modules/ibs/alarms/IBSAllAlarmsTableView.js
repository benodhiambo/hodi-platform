import { Component } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import 'react-data-table-component-extensions/dist/index.css';
import { connect } from "react-redux";
import { Collapse, Nav, Navbar, NavItem, NavLink } from "reactstrap";
import { globalRowStyles } from "../../../config";
import { FetchingIBSAlarms } from "../components/FetchingIBSAlarms";
import { tableColumns } from "../config";

class IBSAllAlarmsTableView extends Component {

    componentDidMount(){
        
    }

    renderLoading() {
        return <FetchingIBSAlarms />
    }

    renderTable() {
        const allAlarms = this.props.ibsAlarms[0];

        let allAlarmsCount = 0;
        if (allAlarms !== undefined) {
            allAlarmsCount = allAlarms.length;
        }

        const tableData = {
            columns: tableColumns,
            data: allAlarms,
        };

        return (
            <>
                <Navbar className="task-head" expand="md">
                    <Collapse className="task-nav" navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink className="task-fxn active-task">
                                    All Alarms ({allAlarmsCount})
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>

                <h4 className="alarms-header">All Alarms</h4>
                <div className="page-content">
                    <DataTableExtensions
                        {...tableData}
                    >
                        <DataTable
                            noHeader
                            defaultSortField="updatedAt"
                            defaultSortAsc={false}
                            pagination
                            paginationPerPage="15"
                            dense
                            highlightOnHover
                            conditionalRowStyles={globalRowStyles}
                        />
                    </DataTableExtensions>
                </div>
            </>
        );
    }

    render() {
        if (this.props.alarmsLoading === true) {
            return this.renderLoading();
        } else {
            return this.renderTable();
        }

    }
}

function mapStateToProps(state) {
    return {
        ibsAlarms: state.ibsAlarms,
        alarmsLoading: state.appState.isLoading
    };
}

export default connect(mapStateToProps)(IBSAllAlarmsTableView);