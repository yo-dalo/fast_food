const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const db = require('../db/conn');
//const {checkCookieAuth} = require("../Utility/Auth_midd")


const users = [
  { id: 1, username: 'testuser', password: 'testpass' }
];



function checkCookieAuth(req, res, next) {
    const authCookie = req.cookies.authToken; // Replace 'authToken' with your cookie name

    if (!authCookie) {
        return res.status(401).json({ message: 'Unauthorized: No cookie provided' });
    }


    try {

     try {
    const decoded = jwt.verify(authCookie, process.env.JWT_SECRET_KEY);
    console.log('Token is valid:', decoded);
       } catch (err) {
    console.log('Token is invalid:', err.message);
}

        next();
    } catch (error) {
        res.status(403).json({ message: 'Forbidden: Invalid cookie' });
    }
}
function checkCookieAuth_1(req, res, next) {
    const authCookie = req.cookies.authToken; // Replace 'authToken' with your cookie name

    if (!authCookie) {
        return res.status(401).json({ message: 'Unauthorized: No cookie provided' });
    }


    try {
           authCookie=="55"?res.send("ok"):res.send("not")

        next();
    } catch (error) {
        res.status(403).json({ message: 'Forbidden: Invalid cookie' });
    }
}



//router.use(checkCookieAuth)


router.post('/register', (req, res) => {
  const { name, password ,phone,email} = req.body;
  console.log(req.body)
  const hashedPassword = bcrypt.hashSync(password, 8);

  //const sql = 'INSERT INTO User (username, password) VALUES (?, ?)';
 const sql = 'INSERT INTO `User` (`Name`,`Email`, `Password`, `Username`, `Phone` ,`Address`) VALUES (?, ?, ?, ?, ?,"");';
  //const sql = "INSERT INTO `User` (`Id`, `Name`, `Date`, `Email`, `Password`, `Username`, `Phone`) VALUES (NULL, 'Name', current_timestamp(), 'Email', 'Password ', 'Username ', 'Phone');";
  
  db.query(sql,[name,email, hashedPassword,name,phone], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Server error');
    }
          console.log("ok")
    res.cookie("authToken","1122222").status(201).send('User registered');
    //const token = jwt.sign({ id:name  }, process.env.JWT_SECRET_KEY, { expiresIn: 86400 }); // Use a secure key in production
   // res.status(200).send({ auth: true, token });
  });
});





router.post('/login_0', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const sql = 'SELECT * FROM User WHERE Email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.Password);
    //const passwordIsValid = true;

    if (!passwordIsValid) {
      return res.status(401).send(user);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: 86400 }); // Use a secure key in production
  const option ={httpOnly: true  }
    res.status(200).send({ auth: true, token }).cookie("token",token);

  


    console.log("Login successful");
  });
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;
 /// console.log(req.body);

  const sql = 'SELECT * FROM User WHERE Email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.Password);

    if (!passwordIsValid) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: 86400 }); // Use a secure key in production

    //res.cookie('authToken', token, { httpOnly: true, secure: true })
    /*
    res.cookie('authToken', token)
      .status(200)
      .send({ authToken: true, token });
*/
    res.cookie("authToken",token, { httpOnly: false }).send("ok");
   // console.log("Login successful");
  });
});

router.get("/n",(req,res)=>{
//  res.cookie('authToken', "55", { httpOnly: false }).status(200).send('Login successful');
  res.cookie('token', "12344", {
// domain: '.yourdomain.com', // leading dot to include subdomains
  path: '/',
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'None',
}).send("ok")
})
router.get("/show",checkCookieAuth,(req,res)=>{
  res.cookie('authToken33', "55", { httpOnly: true }).status(200).send('Login successful');
  
})

  









module.exports = router;
