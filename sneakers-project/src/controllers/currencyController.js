const axios = require('axios');
const { Product } = require('../models');

module.exports = {
  convertProductsPrice: async (req, res) => {
    try {
      const currency = req.params.currency.toUpperCase(); 
      if (!currency) {
        return res.status(400).json({ error: 'Moneda nu a fost specificată.' });
      }

      // Luăm produsele
      const products = await Product.findAll();

 
      const apiUrl = `https://api.frankfurter.app/latest?from=USD&to=${currency}`;
      const response = await axios.get(apiUrl);
      console.log('API response:', response.data);

      const rates = response.data.rates;
      if (!rates || !rates[currency]) {
        return res.status(400).json({ error: 'Nu s-a putut obține rata de conversie pentru moneda specificată.' });
      }

      const rate = parseFloat(rates[currency]);

      const convertedProducts = products.map(prod => {
        const priceUSD = parseFloat(prod.price);
        const convertedPrice = (priceUSD * rate).toFixed(2);
        return {
          ...prod.get(),
          price_converted: convertedPrice,
          currency: currency
        };
      });

      res.json(convertedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare la conversia prețurilor.' });
    }
  }
};
