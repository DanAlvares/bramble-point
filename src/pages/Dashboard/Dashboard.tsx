
import { Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';


import { BarChart } from '@mui/x-charts';
import { useCallback, useContext } from 'react';
import { STORAGE_KEY } from '../../App';
import cashiers from '../../data/cashier_sample.json';
import { CashierContext } from '../../store/CashierContextProvider';
import './Dashboard.css';

interface ISale {
  cashierId: number;
  saleAmount: number;
}

const Dashboard = () => {
  const sales: ISale[] = JSON.parse(localStorage.getItem(STORAGE_KEY)!);

  const getCashier = useCallback((cashierId: number) => cashiers.find(c => c.id === cashierId)!.name, [])

  return (
    <div id="Dashboard">
      <h1>Cashier Sales Statistics</h1>

      <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: sales.map(item => getCashier(item.cashierId)) }]}
          series={[{ data: sales.map(item => item.saleAmount) }]}
          width={500}
          height={300}
        />
      </Box>
      <div className="button-group">
        <Button component={Link} to='/' color="primary" >Switch Cashier</Button>
        <Button component={Link} to='/sale' variant="contained" color="primary" >Add a sale</Button>
      </div>
    </div>
  );
}

export default Dashboard;
