import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const db = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'dashboard'
});

app.post('/register', (req, res) => {
    const sentEmail = req.body.Email;
    const sentUsername = req.body.Username;
    const sentPassword = req.body.Password;

    const SQL = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    const values = [sentEmail, sentUsername, sentPassword];
    
    db.query(SQL, values, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            console.log('User added successfully');
            res.send({ message: 'User Created' });
        }
    });
});

app.post('/login',(req,res)=>{
    const LoginsentUsername = req.body.LoginUsername;
    const LoginsentPassword = req.body.LoginPassword;

    console.log(LoginsentPassword);
    console.log(LoginsentPassword);
    const SQL = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const values = [LoginsentUsername,LoginsentPassword];
    db.query(SQL, values, (err, results) => {
        if (err) {
            res.send({Erorr: err});
        }
        if(results.length>0){
            res.send(results);
        }
        else {
          res.send({message:'Creadentials not matched'})
        }
    });
})