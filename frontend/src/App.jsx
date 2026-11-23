import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Container, Grid, Card, CardContent,
  TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Chip, Box, Alert
} from '@mui/material';
import {
  Inventory2, Dashboard, AddCircle, Edit, Delete, Warning, Search, History
} from '@mui/icons-material';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082/api/urunler';

function GenelBakis({ urunler }) {
  const toplamCesit = urunler.length;
  const toplamDeger = urunler.reduce((acc, u) => acc + (u.miktar * u.fiyat), 0);
  const kritikUrunler = urunler.filter(u => u.miktar < 5);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Depo Genel Bakış
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#1976d2', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Toplam Ürün Çeşidi</Typography>
              <Typography variant="h3" fontWeight="bold">{toplamCesit}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#2e7d32', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Toplam Depo Değeri</Typography>
              <Typography variant="h3" fontWeight="bold">
                {new Intl.NumberFormat('tr-TR').format(toplamDeger)} ₺
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: kritikUrunler.length > 0 ? '#d32f2f' : '#ed6c02', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Kritik Stoktaki Ürünler (&lt;5)</Typography>
              <Typography variant="h3" fontWeight="bold">{kritikUrunler.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {kritikUrunler.length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>Dikkat!</strong> Şu ürünlerin stoğu kritik seviyenin altında:{' '}
          {kritikUrunler.map(u => `${u.ad} (${u.miktar} adet)`).join(', ')}
        </Alert>
      )}
    </Box>
  );
}

function EnvanterYonetimi({ urunler, verileriYenile }) {
  const [id, setId] = useState(null);
  const [ad, setAd] = useState('');
  const [miktar, setMiktar] = useState('');
  const [fiyat, setFiyat] = useState('');
  const [arama, setArama] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ad.trim() || miktar < 0 || fiyat < 0) {
      alert('Lütfen geçerli değerler girin!');
      return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ad, miktar: Number(miktar), fiyat: Number(fiyat) })
    });

    formSifirla();
    verileriYenile();
  };

  const duzenleSec = (urun) => {
    setId(urun.id);
    setAd(urun.ad);
    setMiktar(urun.miktar);
    setFiyat(urun.fiyat);
  };

  const urunSil = async (silinecekId) => {
    if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      await fetch(`${API_URL}/${silinecekId}`, { method: 'DELETE' });
      verileriYenile();
    }
  };

  const formSifirla = () => {
    setId(null);
    setAd('');
    setMiktar('');
    setFiyat('');
  };

  const filtrelenmisUrunler = urunler.filter(u =>
    u.ad.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {id ? 'Ürünü Güncelle' : 'Yeni Ürün Ekle'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Ürün Adı" value={ad} onChange={(e) => setAd(e.target.value)}
            required size="small" sx={{ flex: 2, minWidth: '200px' }}
          />
          <TextField
            label="Miktar" type="number" value={miktar} onChange={(e) => setMiktar(e.target.value)}
            required size="small" inputProps={{ min: 0 }} sx={{ flex: 1, minWidth: '120px' }}
          />
          <TextField
            label="Fiyat (₺)" type="number" value={fiyat} onChange={(e) => setFiyat(e.target.value)}
            required size="small" inputProps={{ min: 0, step: '0.01' }} sx={{ flex: 1, minWidth: '120px' }}
          />
          <Button type="submit" variant="contained" color={id ? 'warning' : 'success'} startIcon={<AddCircle />}>
            {id ? 'Güncelle' : 'Ekle'}
          </Button>
          {id && (
            <Button variant="outlined" color="inherit" onClick={formSifirla}>
              İptal
            </Button>
          )}
        </Box>
      </Paper>

      <TextField
        fullWidth placeholder="Depoda ürün ara..." value={arama}
        onChange={(e) => setArama(e.target.value)} sx={{ mb: 2 }}
        InputProps={{ startAdornment: <Search sx={{ mr: 1, color: 'gray' }} /> }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#263238' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Ürün Adı</TableCell>
              <TableCell sx={{ color: 'white' }}>Stok Durumu</TableCell>
              <TableCell sx={{ color: 'white' }}>Birim Fiyat</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtrelenmisUrunler.map((urun) => (
              <TableRow key={urun.id} sx={{ bgcolor: urun.miktar < 5 ? '#fff8e1' : 'inherit' }}>
                <TableCell>{urun.id}</TableCell>
                <TableCell>{urun.ad}</TableCell>
                <TableCell>
                  {urun.miktar < 5 ? (
                    <Chip icon={<Warning />} label={`${urun.miktar} (Kritik)`} color="warning" size="small" />
                  ) : (
                    <Chip label={`${urun.miktar} Adet`} color="success" variant="outlined" size="small" />
                  )}
                </TableCell>
                <TableCell>{urun.fiyat} ₺</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => duzenleSec(urun)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => urunSil(urun.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function StokHareketleri({ hareketler }) {
  const chipRengi = (tur) => {
    if (tur === 'YENİ GİRİŞ') return 'success';
    if (tur === 'GÜNCELLEME') return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Stok Hareket Geçmişi
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#263238' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Tarih / Saat</TableCell>
              <TableCell sx={{ color: 'white' }}>Ürün Adı</TableCell>
              <TableCell sx={{ color: 'white' }}>İşlem Türü</TableCell>
              <TableCell sx={{ color: 'white' }}>Açıklama</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hareketler.map((h) => (
              <TableRow key={h.id}>
                <TableCell>{new Date(h.tarih).toLocaleString('tr-TR')}</TableCell>
                <TableCell><strong>{h.urunAdi}</strong></TableCell>
                <TableCell>
                  <Chip label={h.islemTuru} color={chipRengi(h.islemTuru)} size="small" />
                </TableCell>
                <TableCell>{h.aciklama}</TableCell>
              </TableRow>
            ))}
            {hareketler.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">Henüz kayıtlı bir stok hareketi bulunmuyor.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default function App() {
  const [urunler, setUrunler] = useState([]);
  const [hareketler, setHareketler] = useState([]);

  const verileriYenile = async () => {
    try {
      const [urunRes, hareketRes] = await Promise.all([
        fetch(API_URL),
        fetch(`${API_URL}/hareketler`)
      ]);
      setUrunler(await urunRes.json());
      setHareketler(await hareketRes.json());
    } catch (err) {
      console.error('Backend bağlantı hatası:', err);
    }
  };

  useEffect(() => {
    verileriYenile();
  }, []);

  return (
    <Router>
      <AppBar position="static" sx={{ bgcolor: '#1a237e' }}>
        <Toolbar>
          <Inventory2 sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Kurumsal Depo Yönetim Sistemi
          </Typography>
          <Button color="inherit" component={Link} to="/" startIcon={<Dashboard />}>
            Genel Bakış
          </Button>
          <Button color="inherit" component={Link} to="/envanter" startIcon={<Inventory2 />}>
            Envanter Yönetimi
          </Button>
          <Button color="inherit" component={Link} to="/hareketler" startIcon={<History />}>
            Stok Hareketleri
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<GenelBakis urunler={urunler} />} />
          <Route path="/envanter" element={<EnvanterYonetimi urunler={urunler} verileriYenile={verileriYenile} />} />
          <Route path="/hareketler" element={<StokHareketleri hareketler={hareketler} />} />
        </Routes>
      </Container>
    </Router>
  );
}