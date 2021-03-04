import { Component } from "react";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { tableColumns } from "../../config";
import { globalRowStyles } from "../../../../config";
import { connect } from "react-redux";
import { format, subDays } from "date-fns";

class IBSAlarmsDate7DaysView extends Component {
    dateVar = {
        sevenDaysAgo: subDays(new Date(), 7),
    };

    render() {
        const tableData = {
            columns: tableColumns,
            data: this.props.alarms7Days,
        };

        const day7 = format(this.dateVar.sevenDaysAgo, "do, MMM");

        return (
            <>
                <div className="page-content" >
                    <h4 className="alarms-header">Alarms From {day7} to date</h4>

                    <DataTableExtensions
                        {...tableData}
                    >
                        <DataTable
                            noHeader
                            defaultSortField="updated_at"
                            defaultSortAsc={false}
                            pagination
                            paginationPerPage="15"
                            noDataComponent="No Alarms Recorded in the last 7 Days"
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
        ibsAlarms: state.ibsAlarms,
        ibsAlarms7Days: state.ibsAlarms7Days
    };
}

export default connect(mapStateToProps)(IBSAlarmsDate7DaysView);