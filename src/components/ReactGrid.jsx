import React, { useEffect, useState, useMemo } from 'react';

import { Paper } from '@mui/material';
import {
  Grid,
  Table,
  VirtualTable,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableFixedColumns,
  SearchPanel,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import {
  FilteringState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  IntegratedPaging,
  PagingState,
  SearchState,
} from '@devexpress/dx-react-grid';

import { MockApi } from '../api/users';

const Root = (props) => <Grid.Root {...props} style={{ height: '100%' }} />;

export const ReactGrid = () => {
  const [users, setUsers] = useState([]);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filters, setFilters] = useState([]);
  const [searchValue, setSearchState] = useState('');
  const [sorting, setSorting] = useState([
    { columnName: 'id', direction: 'asc' },
  ]);
  const [tableColumnExtensions] = useState([
    { columnName: 'id' },
    { columnName: 'name' },
    { columnName: 'surname' },
    { columnName: 'age' },
  ]);
  const leftColumns = ['name', 'surname'];

  const dateToShort = (birthDate) =>
    new Date(birthDate).toLocaleDateString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

  useEffect(() => {
    MockApi.getUsers().then(({ data }) => {
      const formatData = Object.values(data).map((user) => {
        if (user['birthday']) user['birthday'] = dateToShort(user['birthday']);
        return user;
      });
      setUsers(Object.values(formatData));
    });
  }, []);

  const configColumns = useMemo(
    () => [
      { name: 'name', title: 'Name' },
      { name: 'surname', title: 'Surname' },
      { name: 'birthday', title: 'Birthday' },
      { name: 'avatar', title: 'Avatar' },
    ],
    []
  );

  return (
    <Paper sx={{ height: 'calc(100vh - 100px - 30px)' }}>
      <Grid rows={users} columns={configColumns} rootComponent={Root}>
        <FilteringState filters={filters} onFiltersChange={setFilters} />
        <SearchState value={searchValue} onValueChange={setSearchState} />
        <SortingState sorting={sorting} onSortingChange={setSorting} />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <IntegratedFiltering />
        <IntegratedSorting />
        <IntegratedPaging />
        <Table />
        <VirtualTable columnExtensions={tableColumnExtensions} height="auto" />
        <TableHeaderRow showSortingControls />
        <PagingPanel pageSizes={pageSizes} />
        <TableFilterRow />
        <TableFixedColumns leftColumns={leftColumns} />
        <Toolbar />
        <SearchPanel />
      </Grid>
    </Paper>
  );
};
