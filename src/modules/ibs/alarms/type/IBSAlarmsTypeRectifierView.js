import { Component } from "react";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { tableColumns } from "../../config";
import { globalRowStyles } from "../../../../config";

class IBSAlarmsTypeRectifierView extends Component {
    render() {
        const tableData = {
            columns: tableColumns,
            data: this.props.rectifierAlarms,
        };

        return (
            <>
                <h4 className="alarms-header">Rectifier Alarms</h4>

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
                            noDataComponent="No Rectifier Alarms Received"
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

export default IBSAlarmsTypeRectifierView;