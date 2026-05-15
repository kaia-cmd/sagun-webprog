import React from 'react';
import { Box, Typography, Button, Stack, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import articles from '../../data/article-content';
import { useNavigate } from 'react-router-dom';

const pinkTheme = {
  sectionBorder: '#fecdd3',
  sectionBg: '#fafafa',
  cardBg: '#fdf2f8',
  cardBorder: '#fecdd3',
  title: '#18181b',
  accent: '#be185d',
  dataGridHeaderBg: '#fce7f3',
};

const DashArticleListPage = () => {
  const navigate = useNavigate();

  const rows = articles.map((a, idx) => ({
    id: idx + 1,
    name: a.name,
    title: a.title,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 240 },
    { field: 'name', headerName: 'Slug', minWidth: 200 },
    {
      field: 'actions', headerName: 'Actions', minWidth: 160, sortable: false, renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => navigate(`/articles/${row.name}`)}>View</Button>
        </Stack>
      )
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 3, p: 2, border: `2px solid ${pinkTheme.sectionBorder}`, backgroundColor: pinkTheme.sectionBg }}>
        <Typography variant="h4" sx={{ color: pinkTheme.title, fontWeight: 700 }}>Articles (Dashboard)</Typography>
      </Box>
      <Box sx={{ p: 2, border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg, borderRadius: 2 }}>
        <Box sx={{ height: 520, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[5,10]} />
        </Box>
      </Box>
    </Box>
  );
};

export default DashArticleListPage;
