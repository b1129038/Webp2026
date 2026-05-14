import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, Typography, Paper, Chip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#27ae60' },
    background: { default: '#f4f6f9' },
  },
  typography: {
    fontFamily: "'Noto Sans TC', sans-serif",
  },
});

const columns = [
  {
    field: 'title',
    headerName: '名稱',
    flex: 2,
    minWidth: 200,
  },
  {
    field: 'location',
    headerName: '地點',
    flex: 2,
    minWidth: 180,
  },
  {
    field: 'price',
    headerName: '票價',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <Chip
        label={params.value || '免費'}
        size="small"
        color={params.value ? 'primary' : 'default'}
        variant="outlined"
      />
    ),
  },
];

const API_URL =
  'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6';

function App() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 呼叫 API 取得資料
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('API 請求失敗，狀態碼：' + res.status);
        return res.json();
      })
      .then((data) => {
        const rows = data.map((item, idx) => ({
          id: idx,
          title: item.title || '',
          location: item.showInfo?.[0]?.location || '',
          price: item.showInfo?.[0]?.price || '',
        }));
        setAllData(rows);
        setFilteredData(rows);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 搜尋關鍵字改變時，更新 filteredData
  useEffect(() => {
    if (searchKeyword.trim() === '') {
      setFilteredData(allData);
    } else {
      setFilteredData(
        allData.filter((item) =>
          item.title.includes(searchKeyword.trim())
        )
      );
    }
  }, [searchKeyword, allData]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ background: '#f4f6f9', minHeight: '100vh', py: 4 }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto', px: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap', mb: 3 }}>
            <Typography variant="h4" fontWeight={700} color="#2c3e50">
              景點觀光展覽資訊
            </Typography>
            <TextField
              size="small"
              placeholder="搜尋名稱..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              sx={{
                width: 220,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#3498db', borderWidth: 2 },
                  '&:hover fieldset': { borderColor: '#27ae60' },
                  '&.Mui-focused fieldset': { borderColor: '#27ae60' },
                },
              }}
            />
          </Box>

          {/* Error */}
          {error && (
            <Box sx={{ color: '#e74c3c', background: '#fdecea', p: 2, borderRadius: 2, mb: 2 }}>
              {error}
            </Box>
          )}

          {/* DataGrid */}
          <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <DataGrid
              rows={filteredData}
              columns={columns}
              loading={loading}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[10, 25, 50]}
              disableRowSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#27ae60',
                  color: 'white',
                  fontSize: '0.95rem',
                },
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#27ae60',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  color: 'white',
                  fontWeight: 600,
                },
                '& .MuiDataGrid-sortIcon': { color: 'white' },
                '& .MuiDataGrid-menuIconButton': { color: 'white' },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#eaf6fb',
                },
                '& .MuiDataGrid-cell': {
                  fontSize: '0.9rem',
                },
              }}
            />
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
