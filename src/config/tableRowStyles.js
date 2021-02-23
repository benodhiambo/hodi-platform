export const globalRowStyles = [
    {
        when: row => row.alarm_status === 'Resolved',
        style: {
            backgroundColor: '#3baf56',
            color: '#1f1f1f',
            '&:hover': {
                backgroundColor: '#a0ecb2',
                color: '#000000',
                cursor: 'pointer',
            },
        },
    },
    {
        when: row => (row.alarm_severity === 'Critical' &&
            row.alarm_status === 'Pending'),
        style: {
            backgroundColor: '#da4958',
            color: '#1f1f1f',
            '&:hover': {
                backgroundColor: '#f8acb4',
                color: '#000000',
                cursor: 'pointer',
            },
        },
    },
    {
        when: row => (row.alarm_severity === 'Minor' &&
            row.alarm_status === 'Pending'),
        style: {
            backgroundColor: '#fac629',
            color: '#1f1f1f',
            '&:hover': {
                backgroundColor: '#f5db8e',
                color:'#000000',
                cursor: 'pointer',
            },
        },
    }
];

export const tableSetup = [
    
]