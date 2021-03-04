import { Component } from "react";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { tableColumns } from "../../config";
import { globalRowStyles } from "../../../../config";

class IBSAlarmsTypeRadioView extends Component {
    render() {
        const tableData = {
            columns: tableColumns,
            data: this.props.radioAlarms,
        };

        return (
            <>
                <h4 className="alarms-header">Radio Alarms</h4>

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
                            noDataComponent="No Radio Alarms Received"
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

export default IBSAlarmsTypeRadioView;