import React, { useEffect, useState, useMemo } from 'react';

import { Paper, Tooltip } from '@mui/material';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableColumnResizing,
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
  DataTypeProvider,
  SearchState,
} from '@devexpress/dx-react-grid';

import { MockApi } from '../api/table';

const TooltipFormatter = ({ row: { birthday }, value }) => (
  <Tooltip title={<span>{`birth date: ${birthday}`}</span>}>
    <span>{value}</span>
  </Tooltip>
);

const CellTooltip = (props) => (
  <DataTypeProvider
    for={['age']}
    formatterComponent={TooltipFormatter}
    {...props}
  />
);

export const ReactGrid = () => {
  const [users, setUsers] = useState([]);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filters, setFilters] = useState([]);
  const [searchValue, setSearchState] = useState('');
  const [columnWidths] = useState([
    { columnName: 'id', width: '15%' },
    { columnName: 'name', width: '35%' },
    { columnName: 'surname', width: '35%' },
    { columnName: 'age', width: '15%' },
  ]);
  const [sorting, setSorting] = useState([
    { columnName: 'id', direction: 'asc' },
  ]);

  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

  useEffect(() => {
    MockApi.getUsers().then(({ data }) => {
      const formatData = Object.values(data).map((user) => {
        if (user['birthday']) user['age'] = getAge(user['birthday']);
        return user;
      });
      setUsers(Object.values(formatData));
    });
  }, []);

  const configColumns = useMemo(
    () => [
      { name: 'id', title: 'Id' },
      { name: 'name', title: 'Name' },
      { name: 'surname', title: 'Surname' },
      { name: 'age', title: 'Age' },
    ],
    []
  );

  return (
    <Paper>
      <Grid rows={users} columns={configColumns}>
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
        <CellTooltip columns={configColumns} />
        <Table />
        <TableColumnResizing
          defaultColumnWidths={columnWidths}
          resizingMode={'nextColumn'}
        />
        <TableHeaderRow showSortingControls />
        <PagingPanel pageSizes={pageSizes} />
        <TableFilterRow />
        <Toolbar />
        <SearchPanel />
      </Grid>
    </Paper>
  );
};
