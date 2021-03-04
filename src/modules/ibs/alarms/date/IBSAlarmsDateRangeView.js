import { Component } from "react";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { tableColumns } from "../../config";
import { format } from "date-fns";
import { connect } from "react-redux";
import { fetchAlarmsForRange } from "../../redux/ibsAlarmsActions";
import { globalRowStyles } from "../../../../config";

class IBSAlarmsDateRangeView extends Component {
    dateSelected = {
        date: [new Date(), new Date()]
    };

    onChange = date => {
        if (date !== null) {
            this.dateSelected.date[0] = date[0];
            this.dateSelected.date[1] = date[1];
            this.getAlarmsForDateRange();
        }
    }

    getStartingDate() {
        let startDate = this.dateSelected.date[0];
        return format(startDate, 'yyyy-MM-dd');
    }

    getEndingDate() {
        let endDate = this.dateSelected.date[1];
        return format(endDate, 'yyyy-MM-dd');
    }

    getAlarmsForDateRange() {
        let dateOne = this.getStartingDate();
        let dateTwo = this.getEndingDate();
        fetchAlarmsForRange(dateOne, dateTwo)
    }

    render() {
        const tableData = {
            columns: tableColumns,
            data: this.props.ibsAlarmsRange[0],
        };

        return (
            <>
                <div className="page-content" >
                    <h4 className="alarms-header">Alarms for the Date Between ...</h4>

                    <DateRangePicker
                        onChange={this.onChange}
                        value={this.dateSelected.date}
                        clearIcon="Clear Dates"
                        rangeDivider="to"
                        calendarClassName="app-calendar"
                        className="app-date-range-picker"
                        dayPlaceholder="dd"
                        monthPlaceholder="MMM"
                        yearPlaceholder="yyyy"
                        format="dd/MMM/yyyy"
                        maxDetail="month"
                        showLeadingZeros={true}
                    />
                    <DataTableExtensions
                        {...tableData}
                    >
                        <DataTable
                            noHeader
                            defaultSortField="updated_at"
                            defaultSortAsc={false}
                            pagination
                            paginationPerPage="15"
                            noDataComponent="No Alarms Recorded in the Range Selected"
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
        ibsAlarmsRange: state.ibsAlarmsRange
    };
}

export default connect(mapStateToProps)(IBSAlarmsDateRangeView);