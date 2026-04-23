import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const dashboardColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    width: 150,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const dashboardRows = [
  { id: 1, lastName: 'Snow', firstName: 'John', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jamie', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Cliffors', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function UsersPage() {
  const withAge = dashboardRows.filter((user) => user.age !== null);
  const under30 = withAge.filter((user) => user.age < 30).length;
  const from30To59 = withAge.filter((user) => user.age >= 30 && user.age < 60).length;
  const age60AndAbove = withAge.filter((user) => user.age >= 60).length;

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Users Overview
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Here is today’s user snapshot
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
          I use this view to quickly scan the same users from dashboard and check where the age groups are concentrated.
        </p>
      </section>

      <section className="border-y border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            User Stats
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">At-a-glance numbers</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Total Users</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{dashboardRows.length}</p>
            <p className="mt-2 text-sm text-zinc-600">I keep this equal to the dashboard count for consistency.</p>
          </article>
          <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Under 30</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{under30}</p>
            <p className="mt-2 text-sm text-zinc-600">I monitor this to see how many younger users are present.</p>
          </article>
          <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Age 30 to 59</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{from30To59}</p>
            <p className="mt-2 text-sm text-zinc-600">This usually tells me where the core group sits.</p>
          </article>
          <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Age 60 and above</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{age60AndAbove}</p>
            <p className="mt-2 text-sm text-zinc-600">I check this so older users are still represented in reports.</p>
          </article>
        </div>
      </section>

      <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Users Table</p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">User table</h2>
        </div>

        <div className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-3 sm:p-4">
          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={dashboardRows}
              columns={dashboardColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                border: 0,
                bgcolor: '#fdf2f8',
                '& .MuiDataGrid-columnHeaders': {
                  bgcolor: '#fce7f3',
                },
              }}
            />
          </Box>
        </div>
      </section>
    </div>
  );
}

export default UsersPage;