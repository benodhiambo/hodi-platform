import { Component } from "react";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { globalRowStyles } from "../../../../config";
import { tableColumns } from "../../config";

class IBSAlarmsTypeTempView extends Component {
    render() {
        const tableData = {
            columns: tableColumns,
            data: this.props.tempAlarms,
        };

        return (
            <>
                <h4 className="alarms-header">Temperature Alarms</h4>

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
                            noDataComponent="No Temperature Alarms Received"
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

export default IBSAlarmsTypeTempView;