const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

     
      const type = req.body.type || 'client';

      
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Completează toate câmpurile!' });
      }

     
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: 'Email deja folosit!' });
      }

     
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

     
      const newUser = await User.create({
        username,
        email,
        password_hash: hashedPassword,
        type  
      });

      return res.status(201).json({ message: 'Utilizator creat cu succes!', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare server' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Completează email și parolă!' });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Credențiale invalide!' });
      }

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return res.status(401).json({ error: 'Credențiale invalide!' });
      }

   
      const token = jwt.sign(
        { id: user.id, type: user.type }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' } 
      );

      return res.json({ message: 'Logare reușită!', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare server' });
    }
  },

  getProfile: async (req, res) => {
    try {
      const userId = req.user.id; 
      const user = await User.findByPk(userId, {
        attributes: ['id', 'username', 'email', 'type']
      });

      if (!user) {
        return res.status(404).json({ error: 'Utilizatorul nu există!' });
      }

      return res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare server' });
    }
  }
};
