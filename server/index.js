require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      authCtrl = require('./controllers/authController'),
      userCtrl = require('./controllers/userController'),
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
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);
app.get('/auth/get', authCtrl.getUser);

// user endpoints


// budget endpoints
app.post('/api/group', budgetCtrl.createGroup);
app.post('/api/category', budgetCtrl.createCategory);
app.get('/api/groups/:userId', budgetCtrl.getUserGroups);
app.get('/api/categories/:groupId', budgetCtrl.getCategories);
app.get('/api/category-sum/:userId/:groupName', budgetCtrl.categorySum);
app.get('/api/expense-sum/:userId', budgetCtrl.expenseSum);
app.put('/api/group/:groupId', budgetCtrl.updateGroup);
app.put('/api/category-name/:catId', budgetCtrl.updateCatName);
app.put('/api/category-amount/:catId', budgetCtrl.updateCatAmount);
app.delete('/api/group/:groupId', budgetCtrl.deleteGroup);
app.delete('/api/category/:catId', budgetCtrl.deleteCategory);

// transaction endpoints
app.get('/api/transaction/:userId', transCtrl.getUserTransactions);
app.post('/api/transaction', transCtrl.createTransaction);