const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sneakers', 'postgres', 'senzor29NA!', {
  host: 'localhost', // schimbă dacă serverul nu e local
  dialect: 'postgres'
});

module.exports = sequelize;



(async () => {
    try {
      await sequelize.authenticate();
      console.log('Conexiunea la baza de date a reușit!');
    } catch (error) {
      console.error('Nu s-a putut conecta la baza de date:', error);
    }
  })();

  
