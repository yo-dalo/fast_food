const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routers/registration');
const category_Routes = require('./routers/Category');
const show_category_Routes = require('./routers/Show_Category');
const show_product_Routes = require('./routers/Product');
const size_Routes = require('./routers/Size');
const size__Routes = require('./routers/Size_');
const user_Routers = require('./routers/User');
const order_Routers = require('./routers/Order');
const admin_login_Routers = require('./routers/Admin_login');
const favorites_Routers = require('./routers/Favorites');
const card_Routers = require('./routers/Card');
const mailRoutes = require('./routers/mailRoutes');
const poster_Routers = require('./routers/Poster');
const cookieParser = require('cookie-parser');

dotenv.config({path:"./src/.env"});

const app = express();

//app.use(cors());
app.use(cors({
  //origin: 'http://127.0.0.1:3000/',
  //origin: 'http://localhost:5173/',
  
  credentials: true
}));


app.use(bodyParser.json());
app.use(cookieParser());
const users = [
  { id: 1, username: 'testuser', password: 'testpass' }
];





app.use(userRoutes);
app.use(category_Routes);
app.use(show_category_Routes);
app.use(show_product_Routes);
app.use(size_Routes);
app.use(size__Routes);
app.use(user_Routers);
app.use(favorites_Routers);
app.use(card_Routers);
app.use(admin_login_Routers);
app.use(order_Routers);
app.use(poster_Routers);


app.use('/api', mailRoutes);









const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
