import { Component } from "react";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { tableColumns } from "../../config";
import { globalRowStyles } from "../../../../config";

class IBSAlarmsDate12HrsView extends Component {
    render() {
        const tableData = {
            columns: tableColumns,
            data: this.props.alarms12Hrs,
        };

        return (
            <>
                <div className="page-content" >
                    <h4 className="alarms-header">Alarms for the Last 12 Hours</h4>
                    <DataTableExtensions
                        {...tableData}
                    >
                        <DataTable
                            noHeader
                            defaultSortField="updated_at"
                            defaultSortAsc={false}
                            pagination
                            paginationPerPage="15"
                            noDataComponent="No Alarms Recorded in the last 12 Hours"
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

export default IBSAlarmsDate12HrsView;