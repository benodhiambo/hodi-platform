import { Component } from "react";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { connect } from "react-redux";
import { tableColumns } from "../../config";
import { globalRowStyles } from "../../../../config";

class IBSAlarmsStatusPendingView extends Component {
    render() {
        const tableData = {
            columns: tableColumns,
            data: this.props.pendingAlarms,
        };

        return (
            <>
                <h4 className="alarms-header">Pending Alarms</h4>
                <div className="page-content">
                    <DataTableExtensions
                        {...tableData}
                    >
                        <DataTable
                            noHeader
                            defaultSortField="updated_at"
                            defaultSortAsc={false}
                            pagination
                            paginationPerPage="15"
                            noDataComponent="No Pending Alarms Received"
                            dense
                            highlightOnHover
                            conditionalRowStyles={globalRowStyles}
                        />
                    </DataTableExtensions>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        ibsAlarms: state.ibsAlarms
    };
}

export default connect(mapStateToProps)(IBSAlarmsStatusPendingView);