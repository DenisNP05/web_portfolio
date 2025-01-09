module.exports = (db) => {
  const router = require('express').Router();

  // Получить все тарифы
  router.get('/', (req, res) => {
    const query = 'SELECT * FROM tariffs';
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: 'Ошибка получения тарифов' });
      res.json(results);
    });
  });

  // Создать новый тариф
  router.post('/', (req, res) => {
    const { name, price, duration, description, icon_url, features, old_price, created_by } = req.body;
    const query = 'INSERT INTO tariffs (name, price, duration, description, icon_url, features, old_price, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, price, duration, description, icon_url, features, old_price, created_by], (err, result) => {
      if (err) return res.status(500).json({ error: 'Ошибка создания тарифа' });
      res.status(201).json({ message: 'Тариф создан' });
    });
  });

  return router;
};