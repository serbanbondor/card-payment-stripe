const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectToDatabase');
const stripe = require('stripe')('sk_test_NPWT2yzjOMh7HaLTm7sHCJ8Z00zhtgLJQr');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const Transactions = require('./models/Transactions');

// get info from the config file with dotenv
dotenv.config({ path: './config/config.env' });

// just call the connect to db function
connectDB();

// get the routes file
const transactions = require('./routes/transactionsRoutes');

const app = express();

// in order to user body parser
app.use(express.json());

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

// Shopping item constants
const price = 25;
const description = 'Web Development eBook';

// Index Route
app.get('/', (req, res) => {
  res.render('index');
});

// Charge Route
app.post('/charge', (req, res) => {
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) =>
      stripe.charges.create({
        amount: price + '00',
        description,
        currency: 'usd',
        customer: customer.id,
      })
    )
    .then((charge) => {
      res.render('success');
      req.body.text = description;
      req.body.amount = '-' + price;
      Transactions.create(req.body)
        .then(() => {
          res.status(201).json({
            success: true,
            data: transaction,
          });
        })
        .catch((e) => {
          res.status(500).json({
            success: false,
            error: 'Server Error! Transaction was not added',
          });
        });
    });
});

app.use('/api/', transactions);

const port = 5050;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
