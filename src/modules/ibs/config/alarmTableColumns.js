export const columns = [
    {
        name: 'No.',
        selector: 'id',
        sortable: true,
        center: true,
        width: '120px',
    },
    {
        name: 'Site name',
        selector: 'site_name',
        sortable: true,
        grow: 1,
    },
    {
        name: 'Site IP',
        selector: 'site_ip',
        sortable: true,
        grow: 1,
    },
    {
        name: 'Alarm',
        selector: 'alarm_type',
        sortable: true,
        grow: 1,
    },
    {
        name: 'Severity',
        selector: 'alarm_severity',
        sortable: true,
        grow: 0,
    },
    {
        name: 'Status',
        selector: 'alarm_status',
        sortable: true,
        center: true,
        grow: 1,
    },
    {
        name: 'Received',
        selector: 'updated_at',
        sortable: true,
        grow: 1,
    },
];