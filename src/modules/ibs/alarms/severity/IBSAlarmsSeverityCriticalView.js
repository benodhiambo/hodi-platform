import { Component } from "react";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { tableColumns } from "../../config";
import { globalRowStyles } from "../../../../config";

class IBSAlarmsSeverityCriticalView extends Component {

    componentDidMount() {
        console.log('severity critical mounted')
    }

    render() {
        const tableData = {
            columns: tableColumns,
            data: this.props.criticalAlarms,
        };

        return (
            <>
                <h4 className="alarms-header">Critical Alarms</h4>
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

export default IBSAlarmsSeverityCriticalView;