import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

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

function ReportsPage() {
  const averageAge = (
    dashboardRows.reduce((sum, row) => sum + (row.age || 0), 0) /
    dashboardRows.filter((row) => row.age !== null).length
  ).toFixed(1);

  const totalBarValues = dashboardBarSeries
    .flatMap((series) => series.data)
    .reduce((sum, value) => sum + value, 0);

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Reports Overview
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Here is today’s report snapshot
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
          I use this space to review how my sample metrics move across the quarter before deciding what to improve next.
        </p>
      </section>

      <section className="border-y border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Quick Report Summary
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">At-a-glance numbers</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Total Users</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{dashboardRows.length}</p>
            <p className="mt-2 text-sm text-zinc-600">I keep this in sync with the dashboard user count.</p>
          </article>
          <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Average Age</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{averageAge}</p>
            <p className="mt-2 text-sm text-zinc-600">This helps me see the general profile of users in the dataset.</p>
          </article>
          <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Gauge Value</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{dashboardGaugePrimary}</p>
            <p className="mt-2 text-sm text-zinc-600">I treat this as a quick health indicator before digging deeper.</p>
          </article>
          <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Combined Bar Total</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{totalBarValues}</p>
            <p className="mt-2 text-sm text-zinc-600">This is my quick total across both quarterly series.</p>
          </article>
        </div>
      </section>

      <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Data Visualization</p>
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
    </div>
  );
}

export default ReportsPage;