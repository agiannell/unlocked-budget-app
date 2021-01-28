require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      authCtrl = require('./controllers/authController'),
      budgetCtrl = require('./controllers/budgetController'),
      transCtrl = require('./controllers/transactionController'),
      { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
      app = express();

      app.use(express.json());
      app.use(session({
          resave: false,
          saveUninitialized: true,
          secret: SESSION_SECRET,
          cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
      }));

      massive({
          connectionString: CONNECTION_STRING,
          ssl: { rejectUnauthorized: false }
      }).then(db => {
          app.set('db', db)
          console.log('db connected')
          app.listen(SERVER_PORT, () => console.log(`Budgeting on port ${ SERVER_PORT }`));
      });

// auth endpoints


// budget endpoints


// transaction endpoints