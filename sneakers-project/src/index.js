const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const currencyRoutes = require('./routes/currencyRoutes'); // Import rutele pentru conversie

const app = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate()
  .then(() => console.log('Conexiune DB reușită!'))
  .catch(err => console.error('Eroare la conectare DB:', err));

app.get('/', (req, res) => {
  res.send('Backend-ul rulează!');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/currency', currencyRoutes); // folosim rutele pentru conversie

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server pornit pe portul ${PORT}`);
});
