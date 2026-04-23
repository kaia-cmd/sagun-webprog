import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

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

const dashboardBarSeries = [
    { data: [35, 44, 24, 34], label: 'series 1' },
    { data: [51, 6, 49, 30], label: 'series 2' },
];

const dashboardBarXAxis = [
    { data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' },
];

const dashboardPieData = [
    { id: 0, value: 10, label: 'series A' },
    { id: 1, value: 15, label: 'series B' },
    { id: 2, value: 20, label: 'series C' },
];

const dashboardGaugePrimary = 50;
const dashboardGaugeSecondary = 50;
const dashboardGaugeMin = 10;
const dashboardGaugeMax = 60;

function DashboardPage() {
    const averageAge = (
        dashboardRows.reduce((sum, row) => sum + (row.age || 0), 0) /
        dashboardRows.filter((row) => row.age !== null).length
    ).toFixed(1);

    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Dashboard Overview
                        </p>
                        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            Here is today’s dashboard snapshot
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
                            I can quickly check key numbers here, then jump straight to the charts and user table below.
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-pink-200 bg-pink-50 px-5 py-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Total Users
                        </p>
                        <p className="mt-1 text-3xl font-bold text-zinc-900">{dashboardRows.length}</p>
                    </div>
                </div>
            </section>

            <section className="border-y border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Quick Summary
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">At-a-glance numbers</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Total Users</p>
                        <p className="mt-2 text-3xl font-bold text-zinc-900">{dashboardRows.length}</p>
                        <p className="mt-2 text-sm text-zinc-600">Based on the users shown in the table</p>
                    </article>
                    <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Average Age</p>
                        <p className="mt-2 text-3xl font-bold text-zinc-900">{averageAge}</p>
                        <p className="mt-2 text-sm text-zinc-600">Calculated from the current sample users</p>
                    </article>
                    <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Gauge Value</p>
                        <p className="mt-2 text-3xl font-bold text-zinc-900">{dashboardGaugePrimary}</p>
                        <p className="mt-2 text-sm text-zinc-600">Current score for the first gauge</p>
                    </article>
                    <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Gauge Range</p>
                        <p className="mt-2 text-3xl font-bold text-zinc-900">{dashboardGaugeMin} - {dashboardGaugeMax}</p>
                        <p className="mt-2 text-sm text-zinc-600">Configured minimum and maximum range</p>
                    </article>
                </div>
            </section>

            <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Data Visuals</p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Charts and gauges</h2>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <div className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-4">
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#18181b', mb: 1 }}>
                            Gauges
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', py: 1 }}>
                            <Gauge width={120} height={120} value={dashboardGaugePrimary} />
                            <Gauge width={120} height={120} value={dashboardGaugeSecondary} valueMin={dashboardGaugeMin} valueMax={dashboardGaugeMax} />
                        </Stack>
                    </div>

                    <div className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-4 lg:col-span-2">
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#18181b', mb: 1 }}>
                            Quarterly comparison
                        </Typography>
                        <BarChart
                            series={dashboardBarSeries}
                            xAxis={dashboardBarXAxis}
                            height={300}
                        />
                    </div>

                    <div className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-4 lg:col-span-3">
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#18181b', mb: 1 }}>
                            Category distribution
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
                            <PieChart
                                series={[
                                    {
                                        data: dashboardPieData,
                                    },
                                ]}
                                width={360}
                                height={220}
                            />
                        </Box>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">User Overview</p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">User table</h2>
                </div>

                <div className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-3 sm:p-4">
                    <Box sx={{ height: 420, width: '100%' }}>
                        <DataGrid
                            rows={dashboardRows}
                            columns={dashboardColumns}
                            experimentalFeatures={{ newEditingApi: true }}
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

export default DashboardPage;