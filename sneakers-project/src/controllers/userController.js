const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Setăm tipul implicit 'client' dacă nu este furnizat
      const type = req.body.type || 'client';

      // Validări de bază
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Completează toate câmpurile!' });
      }

      // Verificăm dacă email deja există
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: 'Email deja folosit!' });
      }

      // Hash parola
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Creăm utilizatorul
      const newUser = await User.create({
        username,
        email,
        password_hash: hashedPassword,
        type  // Tipul va fi 'client' dacă nu a fost specificat altceva
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

      // Generăm token JWT
      const token = jwt.sign(
        { id: user.id, type: user.type }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' } // Token valabil 1 zi
      );

      return res.json({ message: 'Logare reușită!', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare server' });
    }
  },

  getProfile: async (req, res) => {
    try {
      const userId = req.user.id; // req.user va fi populat de middleware-ul JWT
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
