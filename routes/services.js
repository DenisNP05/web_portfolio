module.exports = (db) => {
  const router = require('express').Router();

  // Получить все сервисы
  router.get('/', (req, res) => {
    const query = 'SELECT * FROM services';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Error fetching services' });
        }
        console.log('Fetched services:', results);  // Log the result to verify if it's returning the expected data
        res.json(results);
    });
  });

  // Создать новый сервис
  router.post('/', (req, res) => {
    const { title, short_description, video_url, extended_description, created_by } = req.body;
    const query = 'INSERT INTO services (title, short_description, video_url, extended_description, created_by) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, short_description, video_url, extended_description, created_by], (err, result) => {
      if (err) return res.status(500).json({ error: 'Ошибка создания сервиса' });
      res.status(201).json({ message: 'Сервис создан' });
    });
  });

  return router;
};