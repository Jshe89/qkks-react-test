import { convertTimeToHours } from 'src/helpers';

export const columns = [
  { field: 'name', flex: 1, headerName: 'Movie name' },
  {
    field: 'time',
    flex: 1,
    headerName: 'Time',
    sortable: false,
    renderCell: params => {
      const time = convertTimeToHours(params.row.time);

      return <>{time}</>;
    },
  },
  { field: 'rating', flex: 1, headerName: 'Rating', sortable: false },
];
