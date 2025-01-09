const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (db) => {
  const router = require('express').Router();

  // Регистрация пользователя
  router.post('/register', async (req, res) => {
    const { username, password, email, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
      db.query(query, [username, hashedPassword, email, role], (err, result) => {
        if (err) return res.status(500).json({ error: 'Ошибка регистрации' });
        res.status(201).json({ message: 'Пользователь зарегистрирован' });
      });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка хэширования пароля' });
    }
  });

  // Логин пользователя
  router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Ошибка запроса' });
      if (results.length === 0) return res.status(404).json({ error: 'Пользователь не найден' });

      const user = results[0];

      // Сравнение пароля
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Неверный пароль' });

      // Генерация JWT токена
      const token = jwt.sign({ userId: user.user_id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ message: 'Успешный вход', token });
    });
  });

  return router;
};