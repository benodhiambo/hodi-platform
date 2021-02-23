import { Component } from "react";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { connect } from "react-redux";
import { tableColumns } from "../../config";
import { globalRowStyles } from "../../../../config";

class IBSAlarmsStatusClosedView extends Component {
    render() {
        const tableData = {
            columns: tableColumns,
            data: this.props.closedAlarms,
        };

        return (
            <>
                <h4 className="alarms-header">Closed Alarms</h4>
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
                            noDataComponent="There are no Closed Alarms recorded"
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

export default connect(mapStateToProps)(IBSAlarmsStatusClosedView);