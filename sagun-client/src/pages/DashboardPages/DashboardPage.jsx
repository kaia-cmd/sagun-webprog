import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { fetchUsers } from '../../../services/UserService';

const dashboardColumns = [
    {
        field: '_id',
        headerName: 'ID',
        width: 90,
        valueGetter: (value) => String(value ?? '').slice(0, 8),
    },
    {
        field: 'fullName',
        headerName: 'Full Name',
        flex: 1,
        minWidth: 170,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`.trim() || 'Unnamed',
    },
    {
        field: 'username',
        headerName: 'Username',
        minWidth: 140,
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1.1,
        minWidth: 220,
    },
    {
        field: 'type',
        headerName: 'Type',
        minWidth: 120,
        valueGetter: (value, row) => (row.type ? `${row.type.charAt(0).toUpperCase()}${row.type.slice(1)}` : ''),
    },
    {
        field: 'status',
        headerName: 'Status',
        minWidth: 120,
        sortable: false,
        renderCell: ({ row }) => (
            <Chip
                size="small"
                label={row.isActive ? 'Active' : 'Inactive'}
                variant={row.isActive ? 'filled' : 'outlined'}
                sx={{
                    color: row.isActive ? '#831843' : '#9f1239',
                    backgroundColor: row.isActive ? '#fbcfe8' : 'transparent',
                    borderColor: '#f9a8d4',
                    fontWeight: 600,
                }}
            />
        ),
    },
];

const pinkTheme = {
    sectionBorder: '#fecdd3',
    sectionBg: '#fafafa',
    cardBg: '#fdf2f8',
    cardBorder: '#fecdd3',
    title: '#18181b',
    accent: '#be185d',
    dataGridHeaderBg: '#fce7f3',
};

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
    const [dashboardRows, setDashboardRows] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [usersError, setUsersError] = useState('');

    useEffect(() => {
        const loadDashboardUsers = async () => {
            try {
                setLoadingUsers(true);
                setUsersError('');
                const response = await fetchUsers();
                setDashboardRows(response.data.users || []);
            } catch (error) {
                setUsersError(error.response?.data?.message || 'Failed to load users');
                setDashboardRows([]);
            } finally {
                setLoadingUsers(false);
            }
        };

        loadDashboardUsers();
    }, []);

    const ageValues = dashboardRows
        .map((row) => Number(row.age))
        .filter((value) => Number.isFinite(value));
    const averageAge = ageValues.length
        ? (ageValues.reduce((sum, value) => sum + value, 0) / ageValues.length).toFixed(1)
        : '0.0';

    return (
        <div className="flex w-full flex-col gap-6">
            <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8" style={{ border: `2px solid ${pinkTheme.sectionBorder}`, backgroundColor: pinkTheme.sectionBg }}>
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

            <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8" style={{ border: `2px solid ${pinkTheme.sectionBorder}`, backgroundColor: pinkTheme.sectionBg }}>
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Quick Summary
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">At-a-glance numbers</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <article className="rounded-3xl p-5" style={{ border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg }}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Total Users</p>
                        <p className="mt-2 text-3xl font-bold text-zinc-900">{dashboardRows.length}</p>
                        <p className="mt-2 text-sm text-zinc-600">Based on the users fetched from the API</p>
                    </article>
                    <article className="rounded-3xl p-5" style={{ border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg }}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Average Age</p>
                        <p className="mt-2 text-3xl font-bold text-zinc-900">{averageAge}</p>
                        <p className="mt-2 text-sm text-zinc-600">Calculated from the current sample users</p>
                    </article>
                    <article className="rounded-3xl p-5" style={{ border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg }}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Gauge Value</p>
                        <p className="mt-2 text-3xl font-bold text-zinc-900">{dashboardGaugePrimary}</p>
                        <p className="mt-2 text-sm text-zinc-600">Current score for the first gauge</p>
                    </article>
                    <article className="rounded-3xl p-5" style={{ border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg }}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Gauge Range</p>
                        <p className="mt-2 text-3xl font-bold text-zinc-900">{dashboardGaugeMin} - {dashboardGaugeMax}</p>
                        <p className="mt-2 text-sm text-zinc-600">Configured minimum and maximum range</p>
                    </article>
                </div>
            </section>

            <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8" style={{ border: `2px solid ${pinkTheme.sectionBorder}`, backgroundColor: pinkTheme.sectionBg }}>
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Data Visuals</p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Charts and gauges</h2>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <div className="rounded-3xl p-4" style={{ border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#18181b', mb: 1 }}>
                            Gauges
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', py: 1 }}>
                            <Gauge width={120} height={120} value={dashboardGaugePrimary} />
                            <Gauge width={120} height={120} value={dashboardGaugeSecondary} valueMin={dashboardGaugeMin} valueMax={dashboardGaugeMax} />
                        </Stack>
                    </div>

                    <div className="rounded-3xl p-4 lg:col-span-2" style={{ border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#18181b', mb: 1 }}>
                            Quarterly comparison
                        </Typography>
                        <BarChart
                            series={dashboardBarSeries}
                            xAxis={dashboardBarXAxis}
                            height={300}
                        />
                    </div>

                    <div className="rounded-3xl p-4 lg:col-span-3" style={{ border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg }}>
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
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Live user table</h2>
                </div>

                <div className="rounded-3xl p-3 sm:p-4" style={{ border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg }}>
                    {usersError && (
                        <p className="mb-3 text-sm text-red-600">{usersError}</p>
                    )}
                    <Box sx={{ height: 420, width: '100%' }}>
                        <DataGrid
                            rows={dashboardRows}
                            columns={dashboardColumns}
                            getRowId={(row) => row._id}
                            loading={loadingUsers}
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
                                bgcolor: pinkTheme.cardBg,
                                '& .MuiDataGrid-columnHeaders': {
                                    bgcolor: pinkTheme.dataGridHeaderBg,
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