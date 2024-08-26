import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { STORAGE_KEY } from '../../App';
import products from '../../data/products_sample.json';
import { CashierContext } from '../../store/CashierContextProvider';
import { ISale } from '../Dashboard/Dashboard';

interface IProduct {
  sku: number;
  name: string;
  descr: string;
  price: number;
  quantity?: number;
  disabled?: boolean;
}

const Sale: React.FC = () => {
  const [items, setItems] = useState<IProduct[]>([]);
  const [newProduct, setNewProduct] = useState('');

  const { cashier } = useContext(CashierContext);
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalCost = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const newItems = [...items];
    newItems[index].quantity = newQuantity;
    setItems(newItems);
  };

  const submitSale = () => {
    const sales: ISale[] = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    sales.push({
      cashierId: cashier.id,
      saleAmount: Number(totalCost.toFixed(2))
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
    navigate('/dashboard')
  }

  const addItem = () => {
    if (newProduct) {
      const product: IProduct = products.find(p => p.sku === Number(newProduct))!;
      product.quantity = 0;
      const newItems = [...items, product];
      setItems(newItems);
      setNewProduct('');
    }
  }

  const removeItem = (item: IProduct) => {
    const newItems = items.filter(i => item.sku !== i.sku);
    setItems(newItems);
  }

  const isDisabled = (product: IProduct) => Boolean(items.find(i => i.sku === product.sku));

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Button component={Link} sx={{ mb: 4 }} to="/dashboard" startIcon={<ArrowBackIcon />} variant="outlined">Back</Button>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h2" sx={{ mb: 4 }} align="center">Sale</Typography>
        </Grid>
      </Grid>


      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select a product to add</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newProduct}
            label="Select a product to add"
            onChange={(event: SelectChangeEvent<any>) => setNewProduct(event.target.value)}
          >
            {products.map((product: IProduct) => (
              <MenuItem disabled={isDisabled(product)} key={product.sku} value={product.sku} >{product.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button sx={{ width: 250 }} onClick={addItem} size="large" variant="outlined" startIcon={<AddIcon />}>Add item</Button>
      </Box>


      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'primary.main' }}><b>Item</b></TableCell>
              <TableCell align="right" sx={{ color: 'primary.main' }}><b>Price</b></TableCell>
              <TableCell align="right" sx={{ color: 'primary.main' }}><b>Qty</b></TableCell>
              <TableCell align="right" sx={{ color: 'primary.main' }}><b>Total</b></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.descr}</Typography>
                </TableCell>
                <TableCell align="right">${item.price}</TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={item.quantity || 1}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                    InputProps={{ inputProps: { min: 0 } }}
                    variant="outlined"
                    size="small"
                    sx={{ width: 90 }}
                  />
                </TableCell>
                <TableCell align="right">${(item.price * (item.quantity || 1)).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => removeItem(item)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>

                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: '#f7f7f7' }}>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"><strong>{totalItems} {totalItems === 1 ? ' item' : 'items'}</strong></TableCell>
              <TableCell align="right"><strong>${totalCost.toFixed(2)}</strong></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button component={Link} to='/' color="primary" >Switch Cashier</Button>
        <Button disabled={!items.length} onClick={submitSale} variant="contained" size="large">Submit</Button>
      </Box>
    </Container>
  );
};

export default Sale;