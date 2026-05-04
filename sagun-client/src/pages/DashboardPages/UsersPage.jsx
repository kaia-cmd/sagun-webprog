import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import userseed from '../../Data/users.json?raw';

const pinkTheme = {
  sectionBorder: '#fecdd3',
  sectionBg: '#fafafa',
  cardBg: '#fdf2f8',
  cardBorder: '#fecdd3',
  title: '#18181b',
  accent: '#be185d',
  dataGridHeaderBg: '#fce7f3',
};

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: 'editor',
    username: '',
    password: '',
    address: '',
    isActive: true,
};

const labelize = (value) =>
    value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
    try {
        return {
            users: JSON.parse(userseed).map((user, index) => ({
                id: Number(user.id) || index + 1,
                firstName: String(user.firstName ?? '').trim(),
                lastName: String(user.lastName ?? '').trim(),
                age: String(user.age ?? '').trim(),
                gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
                ? String(user.gender ?? '').trim().toLowerCase()
                : '',
                contactNumber: String(user.contactNumber ?? '').trim(),
                email: String(user.email ?? '').trim().toLowerCase(),
                role: roles.includes(String(user.role ?? '').trim().toLowerCase())
                ? String(user.role ?? '').trim().toLowerCase()
                : 'editor',
                username: String(user.username ?? '').trim().toLowerCase(),
                password: String(user.password ?? ''),
                address: String(user.address ?? '').trim(),
                isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
            })),
            error: '',
        };
    } catch {
        return{ 
            users: [],
            error: 'unable to read users from src/assets/users.json.'
        }
    }
};

const seed = loadUsers();

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? {...blankForm, ...user} : {...blankForm});
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      { key: 'firstName', label: 'First name' },
      { key: 'lastName', label: 'Last name' },
      { key: 'age', label: 'Age' },
      { key: 'gender', label: 'Gender' },
      { key: 'contactNumber', label: 'Contact number' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'username', label: 'Username' },
      { key: 'password', label: 'Password' },
      { key: 'address', label: 'Address' },
    ].forEach(({ key, label }) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) {
      nextErrors.email = 'Email address already exists.';
    }

    if (!nextErrors.username && users.some((user) => user.id !== modal.id && user.username === username)) {
      nextErrors.username = 'Username already exists.';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber.trim())) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits (e.g. 09171234567).';
    }
    if (!nextErrors.age && isNaN(form.age.trim())) {
      nextErrors.age = 'Age must be a valid number (e.g. 23).';
    }

    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (!nextErrors.password && form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    return nextErrors;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterRole('');
    setFilterGender('');
    setFilterStatus('all');
  };

  const filteredUsers = users.filter((u) => {
    const q = String(searchQuery ?? '').trim().toLowerCase();
    if (q) {
      const matches = [u.firstName, u.lastName, u.email, u.username]
        .map((v) => String(v ?? '').toLowerCase())
        .some((v) => v.includes(q));
      if (!matches) return false;
    }
    if (filterRole && u.role !== filterRole) return false;
    if (filterGender && u.gender !== filterGender) return false;
    if (filterStatus === 'active' && !u.isActive) return false;
    if (filterStatus === 'inactive' && u.isActive) return false;
    return true;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
    };

    if (modal.id) {
      setUsers(users.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user)));
    } else {
      setUsers([...users, {
        id: users.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
        ...nextUser,
      }]);
    }
    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers(users.map((user) => 
      user.id === id ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 88 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (value, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 120,
      valueGetter: (value, row) => labelize(row.role),
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
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={{ xs: 0, md: 2 }} style={{ justifyContent: 'center' }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
            sx={{ borderColor: pinkTheme.cardBorder, color: pinkTheme.accent }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => toggleStatus(row.id)}
            sx={{
              backgroundColor: row.isActive ? '#ec4899' : '#be185d',
              '&:hover': {
                backgroundColor: row.isActive ? '#db2777' : '#9d174d',
              },
            }}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Box
        sx={{
          mb: 3,
          p: { xs: 2, sm: 3 },
          border: `2px solid ${pinkTheme.sectionBorder}`,
          backgroundColor: pinkTheme.sectionBg,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4" sx={{ color: pinkTheme.title, fontWeight: 700 }}>Users</Typography>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            backgroundColor: pinkTheme.accent,
            '&:hover': { backgroundColor: '#9d174d' },
          }}
        >
          Add User
        </Button>
      </Box>
      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      ) : null}
      <Box
        sx={{
          mb: 2,
          p: { xs: 2, sm: 3 },
          border: `2px solid ${pinkTheme.sectionBorder}`,
          backgroundColor: pinkTheme.sectionBg,
          borderRadius: 2,
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'center' }}>
          <TextField
            size="small"
            label="Search"
            placeholder="Search by name, email or username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start">🔍</InputAdornment> }}
            sx={{ minWidth: { xs: '100%', sm: 300 } }}
          />
          <TextField size="small" select label="Role" value={filterRole} onChange={(e) => setFilterRole(e.target.value)} sx={{ minWidth: 140 }}>
            <MenuItem value="">All roles</MenuItem>
            {roles.map((r) => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
          </TextField>
          <TextField size="small" select label="Gender" value={filterGender} onChange={(e) => setFilterGender(e.target.value)} sx={{ minWidth: 140 }}>
            <MenuItem value="">All genders</MenuItem>
            {genders.map((g) => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
          </TextField>
          <TextField size="small" select label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ minWidth: 140 }}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
          <Box sx={{ ml: 'auto' }}>
            <Button onClick={clearFilters} size="small">Clear</Button>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          p: { xs: 1.5, sm: 2 },
          minWidth: 0,
          overflow: 'hidden',
          border: `2px solid ${pinkTheme.cardBorder}`,
          backgroundColor: pinkTheme.cardBg,
          borderRadius: 3,
        }}
      >
        {filteredUsers.length ? (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
              sx={{
                minWidth: 0,
                border: 0,
                bgcolor: pinkTheme.cardBg,
                '& .MuiDataGrid-root': { borderRadius: 8 },
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': { outline: 'none' },
                '& .MuiDataGrid-columnHeaders': {
                  bgcolor: pinkTheme.dataGridHeaderBg,
                  borderBottom: '1px solid #f3e6ea',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f3e6ea',
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No users found. Use Add User to create your first record.
          </Alert>
        )}
      </Box>

      <Dialog 
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
        PaperProps={{
          sx: {
            border: `2px solid ${pinkTheme.cardBorder}`,
            borderRadius: 3,
            backgroundColor: pinkTheme.cardBg,
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ color: pinkTheme.title, fontWeight: 700 }}>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField {...fieldProps('email', 'Email address', { type: 'email' })} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('username', 'Username')} />
                <TextField
                  {...fieldProps('password', 'Password')}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('address', 'Address')} />
              </Stack>
              <FormControlLabel
                control={<Switch name="isActive" checked={form.isActive} onChange={handleChange} />}
                label="Active"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} sx={{ color: pinkTheme.accent }}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: pinkTheme.accent,
                '&:hover': { backgroundColor: '#9d174d' },
              }}
            >
                {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;