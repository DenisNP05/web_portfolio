const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const usersRoutes = require('./routes/users');
const servicesRoutes = require('./routes/services');
const tariffsRoutes = require('./routes/tariffs');
const ordersRoutes = require('./routes/orders');
const winston = require('winston');

const app = express();

// Массив портов для запуска серверов
const ports = [3000, 3001, 3002, 3003, 3004, 3005];  // Порты, на которых будут работать серверы
let currentPortIndex = 0;  // Индекс текущего порта для запуска

// Создание логера с помощью winston
const logger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ],
});

// Функция для подключения к базе данных
const connectToDatabase = () => {
  const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'web_bd',
  });

  db.connect((err) => {
    if (err) {
      const errorMessage = `Error connecting to the database: ${err.message}`;
      console.error(errorMessage);
      logger.error(errorMessage);  // Логирование ошибки в файл
      return;
    }
    console.log('Database connection established');
  });

  return db;
};

// Настройка CORS
app.use(cors());

// Парсинг JSON
app.use(express.json());

// Маршруты для API
app.use('/api/users', usersRoutes(connectToDatabase()));
app.use('/api/services', servicesRoutes(connectToDatabase()));
app.use('/api/tariffs', tariffsRoutes(connectToDatabase()));
app.use('/api/orders', ordersRoutes(connectToDatabase()));

// Функция для запуска сервера на доступном порту
const startServer = () => {
  const port = ports[currentPortIndex];

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  }).on('error', (err) => {
    const errorMessage = `Error starting server on port ${port}: ${err.message}`;
    console.error(errorMessage);
    logger.error(errorMessage);  // Логирование ошибки в файл
    
    // Переход к следующему порту
    currentPortIndex++;
    
    // Если портов больше нет, завершение работы
    if (currentPortIndex < ports.length) {
      console.log(`Trying to start server on port ${ports[currentPortIndex]}`);
      startServer();
    } else {
      const noPortsMessage = 'No available ports to start the server!';
      console.error(noPortsMessage);
      logger.error(noPortsMessage);  // Логирование ошибки в файл
    }
  });
};

// Запуск сервера
startServer();