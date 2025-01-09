module.exports = (db) => {
  const router = require('express').Router();

  // Получить все заказы
  router.get('/', (req, res) => {
    const query = 'SELECT * FROM orders';
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: 'Ошибка получения заказов' });
      res.json(results);
    });
  });

  // Создать новый заказ
  router.post('/', (req, res) => {
    const { client_id, tariff_id } = req.body;
    const query = 'INSERT INTO orders (client_id, tariff_id) VALUES (?, ?)';
    db.query(query, [client_id, tariff_id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Ошибка создания заказа' });
      res.status(201).json({ message: 'Заказ создан' });
    });
  });

  return router;
};