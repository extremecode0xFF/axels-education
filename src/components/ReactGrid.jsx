import React, { useEffect, useState } from 'react';

import { Paper } from '@mui/material';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';

import { MockApi } from '../api/table';

export const ReactGrid = () => {
  const [users, setUsers] = useState([]);
  const [table, setTable] = useState({ columns: [], rows: [] });
  const [sorting, setSorting] = useState([
    { columnName: 'id', direction: 'asc' },
  ]);

  useEffect(() => {
    MockApi.getUsers().then(({ data }) => {
      setUsers(Object.values(data));
    });
  }, []);

  useEffect(() => {
    if (users.length) {
      const columns = Object.entries(users[0]).reduce((acc, [key, value]) => {
        const capitalize = key.charAt(0).toUpperCase() + key.slice(1);
        acc.push({ name: key, title: capitalize });
        return acc;
      }, []);

      setTable({ columns, rows: users });
    }
  }, [users]);

  return (
    <Paper>
      <Grid rows={table.rows} columns={table.columns}>
        <SortingState sorting={sorting} onSortingChange={setSorting} />
        <IntegratedSorting />
        <Table />
        <TableHeaderRow showSortingControls />
      </Grid>
    </Paper>
  );
};
