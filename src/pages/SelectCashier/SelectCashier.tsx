
import { Person } from '@mui/icons-material';
import { Avatar, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import cashiers from '../../data/cashier_sample.json';
import { CashierContext } from '../../store/CashierContextProvider';
import './SelectCashier.css';

export interface ICashier {
  id: number;
  name: string;
}

const SelectCashier: React.FC = () => {
  const navigate = useNavigate();
  const { setCashier } = useContext(CashierContext);

  const handleClick = (cashier: ICashier) => {
    navigate(`/dashboard`);
    setCashier(cashier);
  }

  return (
    <div id="Cashiers">
      <Typography variant="h2" sx={{ mb: 4 }} align="center">Select a Cashier</Typography>
      <section className="cashiers-list">
        {
          cashiers.map((cashier: ICashier) => (
            <Card key={cashier.id} sx={{ width: '100%', maxWidth: 375, margin: 2 }}>
              <CardActionArea data-test-id={`cashier-` + cashier.id} onClick={() => handleClick(cashier)}>
                <CardContent>
                  <Typography display='flex' variant="h5" component="div">
                    <Avatar sx={{ marginRight: 2 }}>
                      <Person />
                    </Avatar>
                    {cashier.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        }
      </section>
    </div>
  );
}

export default SelectCashier;
