import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

const pinkTheme = {
  sectionBorder: '#fecdd3',
  sectionBg: '#fafafa',
  cardBg: '#fdf2f8',
  cardBorder: '#fecdd3',
  title: '#18181b',
  accent: '#be185d',
  dataGridHeaderBg: '#fce7f3',
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
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

const defaultMonthlySeries = {
  generated: [18, 24, 20, 27],
  completed: [12, 19, 17, 23],
};

const ReportsPage = () => {
  const printRef = useRef(null);
  const [monthlySeries, setMonthlySeries] = useState(defaultMonthlySeries);
  const [filterActive, setFilterActive] = useState(false);

  const displayedRows = filterActive
    ? rows.filter((row) => Number(row.age) >= 30)
    : rows;

  const handleGenerate = () => {
    const nextGenerated = defaultMonthlySeries.generated.map(() => 14 + Math.floor(Math.random() * 18));
    const nextCompleted = nextGenerated.map((value) => Math.max(8, value - (2 + Math.floor(Math.random() * 7))));

    setMonthlySeries({
      generated: nextGenerated,
      completed: nextCompleted,
    });
  };

  const handleFilter = () => {
    setFilterActive((prev) => !prev);
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    // Build print HTML with pink-themed print styles
    const printHtml = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Print Report</title>
        ${headMarkup}
        <style>
          :root{ --pink-border: ${pinkTheme.sectionBorder}; --pink-card: ${pinkTheme.cardBg}; --pink-accent: ${pinkTheme.accent}; --text-dark: #111827; }
          @page { size: A4; margin: 16mm; }
          *{ box-sizing: border-box; }
          html,body{ height:100%; margin:0; padding:0; background:#fff; color:var(--text-dark); font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial; }
          .report-shell{ padding:18px; }
          .report-header{ border:2px solid var(--pink-border); background:#fff; padding:18px; border-radius:8px; margin-bottom:18px; }
          .report-header h1{ margin:0 0 6px; font-size:28px; color:var(--text-dark); font-weight:700; }
          .report-header p{ margin:0; font-size:13px; color:#6b7280; }
          .report-content .card{ border:2px solid var(--pink-border); background:var(--pink-card); border-radius:10px; padding:18px; margin-bottom:18px; }
          .report-content .card h2{ margin:0 0 8px; font-size:16px; color:var(--text-dark); font-weight:700; }
          .report-content .card p{ margin:0 0 12px; color:#4b5563; font-size:13px; }
          .report-content svg, .report-content canvas{ max-width:100% !important; height:auto !important; }
          .report-content table{ width:100%; border-collapse:collapse; font-size:12px; }
          .report-content th, .report-content td{ border:1px solid #f3e6ea; padding:8px; text-align:left; }
          .avoid-break{ break-inside: avoid; page-break-inside: avoid; }
          @media print{ body{ background:#fff; } .report-header{ border-width:1px; } .report-content .card{ page-break-inside: avoid; } }
        </style>
      </head>
      <body>
        <main class="report-shell">
          <header class="report-header">
            <h1>Report Summary</h1>
            <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
            <p style="margin-top:8px;font-size:12px;color:#6b7280;">Exported at: ${exportedAt}</p>
          </header>
          <section class="report-content">
            ${printContent.outerHTML}
          </section>
        </main>
      </body>
      </html>`;

    // Create blob url and open it in a new tab (more reliable than about:blank/document.write)
    const blob = new Blob([printHtml], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    const printWindow = window.open(blobUrl, '_blank', 'width=1200,height=900');

    if (!printWindow) {
      URL.revokeObjectURL(blobUrl);
      return;
    }

    const triggerPrint = () => {
      try {
        printWindow.focus();
        printWindow.print();
      } catch (e) {
        // ignore
      }
    };

    if (printWindow.document && printWindow.document.readyState === 'complete') {
      setTimeout(triggerPrint, 150);
    } else {
      // listen for load in the new window
      printWindow.addEventListener('load', () => setTimeout(triggerPrint, 150), { once: true });
      // fallback in 1.2s
      setTimeout(() => {
        if (!printWindow.closed) triggerPrint();
      }, 1200);
    }

    // cleanup blob url later
    setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
  };

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Stack 
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        sx={{ mb: 3, p: { xs: 2, sm: 3 }, border: `2px solid ${pinkTheme.sectionBorder}`, backgroundColor: pinkTheme.sectionBg }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant='h4' gutterBottom sx={{ color: pinkTheme.title, fontWeight: 700 }}>
            Reports
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Report analytics overview showing generated reports,
            category breakdown, and current completion performance.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1.5}
          flexWrap="wrap"
          useFlexGap
          sx={{
            ml: { md: 'auto' },
            width: { xs: '100%', md: 'auto' },
            justifyContent: 'flex-end',
            alignSelf: { xs: 'stretch', md: 'auto' },
          }}
        >
          <Button
            variant='contained'
            size='small'
            onClick={handleGenerate}
            sx={{
              minHeight: 34,
              px: 1.8,
              py: 0.6,
              fontSize: '0.82rem',
              backgroundColor: pinkTheme.accent,
              '&:hover': { backgroundColor: '#9d174d' },
            }}
          >
            Generate
          </Button>
          <Button
            variant='outlined'
            size='small'
            onClick={handlePrint}
            sx={{
              minHeight: 34,
              px: 1.8,
              py: 0.6,
              fontSize: '0.82rem',
              borderColor: pinkTheme.cardBorder,
              color: pinkTheme.accent,
            }}
          >
            Export
          </Button>
          <Button
            variant='outlined'
            size='small'
            onClick={handleFilter}
            sx={{
              minHeight: 34,
              px: 1.8,
              py: 0.6,
              fontSize: '0.82rem',
              borderColor: pinkTheme.cardBorder,
              color: pinkTheme.accent,
            }}
          >
            {filterActive ? 'Clear Filter' : 'Filter'}
          </Button>
        </Stack>
      </Stack>

      <Stack ref={printRef} spacing={3}>
        <Card sx={{ border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg, borderRadius: 3, boxShadow: 'none' }}>
          <CardContent>
            <Typography variant='h6' gutterBottom sx={{ color: pinkTheme.title, fontWeight: 700 }}>
              Monthly Report Output
            </Typography>
            <Typography variant='body2' color="text.secondary" sx={{ mb: 3 }}>
              This chart compares how many reports were generated and how 
              many were completed across the last four months.
            </Typography>
            <BarChart
              series={[
                { data: monthlySeries.generated, label: 'Generated' },
                { data: monthlySeries.completed, label: 'Completed' },
              ]}
              height={300}
              xAxis={[{ data: ['January', 'February', 'March', 'April'], scaleType: 'band', label: 'Months' }]}
            />
          </CardContent>
        </Card>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Card sx={{ flex: 1, border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg, borderRadius: 3, boxShadow: 'none' }}>
            <CardContent>
              <Typography variant='h6' gutterBottom sx={{ color: pinkTheme.title, fontWeight: 700 }}>
                Report Category Share
              </Typography>
              <Typography variant='body2' color="text.secondary" sx={{ mb: 3 }}>
                This chart shows the distribution of report requests by category for the current reporting period.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[{ data: [{ id: 0, value: 14, label: 'Sales' }, { id: 1, value: 10, label: 'Users' }, { id: 2, value: 8, label: 'Inventory' }, { id: 3, value: 6, label: 'Finance' }] }]}
                  width={280}
                  height={220}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg, borderRadius: 3, boxShadow: 'none' }}>
            <CardContent>
              <Typography variant='h6' gutterBottom sx={{ color: pinkTheme.title, fontWeight: 700 }}>
                Completion Rate
              </Typography>
              <Typography variant='body2' color="text.secondary" sx={{ mb: 3 }}>
                The gauge highlights the current percentage of reports completed on time based on the latest reporting cycle.
              </Typography>
              <Box sx={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gauge width={180} height={180} value={78} />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Card sx={{ border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg, borderRadius: 3, boxShadow: 'none' }}>
          <CardContent>
            <DataGrid
              rows={displayedRows}
              columns={columns}
              experimentalFeatures={{ newEditingApi: true }}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{ border: 0, bgcolor: pinkTheme.cardBg, '& .MuiDataGrid-columnHeaders': { bgcolor: pinkTheme.dataGridHeaderBg } }}
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ReportsPage;
