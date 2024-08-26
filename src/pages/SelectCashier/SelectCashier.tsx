
import { Card, CardActionArea, CardContent, Avatar, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import cashiers from '../../data/cashier_sample.json';
import './SelectCashier.css';

interface ICashier {
  id: number;
  name: string;
}

const SelectCashier = () => {
  const navigate = useNavigate();

  const handleClick = (cashier: ICashier) => {
    navigate(`/dashboard/${cashier.id}`);
  }

  return (
    <div id="Cashiers">
      <h1>Select a Cashier</h1>
      <section className="cashiers-list">
        {
          cashiers.map((cashier: ICashier) => (
            <Card key={cashier.id} sx={{ width: '100%', maxWidth: 375, margin: 2 }}>
              <CardActionArea onClick={() => handleClick(cashier)}>
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
