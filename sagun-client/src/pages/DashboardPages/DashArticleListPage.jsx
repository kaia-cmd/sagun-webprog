import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import {
  createArticle,
  deleteArticle,
  fetchArticles,
  updateArticle,
} from '../../services/ArticleService';

const pinkTheme = {
  sectionBorder: '#fecdd3',
  sectionBg: '#fafafa',
  cardBg: '#fdf2f8',
  cardBorder: '#fecdd3',
  title: '#18181b',
  accent: '#be185d',
  dataGridHeaderBg: '#fce7f3',
};

const blankForm = {
  name: '',
  title: '',
  content: '',
  image: '',
};

const DashArticleListPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    loadArticlesFromAPI();
  }, []);

  const loadArticlesFromAPI = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetchArticles();
      setArticles(response.data?.articles || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (article = null) => {
    if (!article) {
      setModal({ open: true, id: null });
      setForm(blankForm);
      setFormError('');
      return;
    }

    setModal({ open: true, id: article._id });
    setForm({
      name: article.name || '',
      title: article.title || '',
      content: Array.isArray(article.content) ? article.content.join('\n\n') : '',
      image: article.image || '',
    });
    setFormError('');
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm(blankForm);
    setFormError('');
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const normalizeContent = (value) =>
    value
      .split(/\r?\n\r?\n/)
      .map((p) => p.trim())
      .filter(Boolean);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.title.trim()) {
      setFormError('Slug and title are required.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      title: form.title.trim(),
      content: normalizeContent(form.content),
      image: form.image.trim(),
    };

    try {
      if (modal.id) {
        const response = await updateArticle(modal.id, payload);
        setArticles((prev) => prev.map((item) => (item._id === modal.id ? response.data : item)));
      } else {
        const response = await createArticle(payload);
        setArticles((prev) => [response.data, ...prev]);
      }
      closeModal();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save article');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete article');
    }
  };

  const rows = useMemo(
    () =>
      articles.map((a) => ({
        id: a._id,
        _id: a._id,
        name: a.name,
        title: a.title,
        content: a.content,
        image: a.image,
      })),
    [articles]
  );

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      width: 95,
      valueGetter: (value) => String(value ?? '').slice(0, 8),
    },
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 240 },
    { field: 'name', headerName: 'Slug', minWidth: 200 },
    {
      field: 'actions', headerName: 'Actions', minWidth: 260, sortable: false, renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => navigate(`/articles/${row.name}`)}>View</Button>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>Edit</Button>
          <Button size="small" variant="contained" color="error" onClick={() => handleDelete(row._id)}>Delete</Button>
        </Stack>
      )
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 3, p: 2, border: `2px solid ${pinkTheme.sectionBorder}`, backgroundColor: pinkTheme.sectionBg }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Typography variant="h4" sx={{ color: pinkTheme.title, fontWeight: 700 }}>Articles (Dashboard)</Typography>
          <Button variant="contained" onClick={() => openModal()} sx={{ ml: 'auto' }}>
            Add Article
          </Button>
        </Stack>
      </Box>
      <Box sx={{ p: 2, border: `2px solid ${pinkTheme.cardBorder}`, backgroundColor: pinkTheme.cardBg, borderRadius: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box sx={{ height: 520, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            pageSizeOptions={[5, 10]}
            getRowId={(row) => row._id}
          />
        </Box>
      </Box>

      <Dialog open={modal.open} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle>{modal.id ? 'Edit Article' : 'Add Article'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {formError && <Alert severity="error">{formError}</Alert>}
            <TextField
              label="Slug (name)"
              name="name"
              value={form.name}
              onChange={handleChange}
              helperText="Example: surviving-midterms"
              fullWidth
            />
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Image URL"
              name="image"
              value={form.image}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Content"
              name="content"
              value={form.content}
              onChange={handleChange}
              multiline
              minRows={8}
              helperText="Separate paragraphs with a blank line."
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {modal.id ? 'Save Changes' : 'Create Article'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
