import { Component } from "react";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { tableColumns } from "../../config";
import { globalRowStyles } from "../../../../config";
import { connect } from "react-redux";
import { format, subDays } from "date-fns";

class IBSAlarmsDate30DaysView extends Component {
    dateVar = {
        thirtyDaysAgo: subDays(new Date(), 30),
    };

    render() {
        const tableData = {
            columns: tableColumns,
            data: this.props.alarms30Days,
        };

        const day30 = format(this.dateVar.thirtyDaysAgo, "do, MMM");

        return (
            <>
                <div className="page-content" >
                    <h4 className="alarms-header">Alarms From {day30} to date</h4>

                    <DataTableExtensions
                        {...tableData}
                    >
                        <DataTable
                            noHeader
                            defaultSortField="updated_at"
                            defaultSortAsc={false}
                            pagination
                            paginationPerPage="15"
                            noDataComponent="No Alarms Recorded in the last 30 Days"
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
        ibsAlarms30Days: state.ibsAlarms30Days
    };
}

export default connect(mapStateToProps)(IBSAlarmsDate30DaysView);