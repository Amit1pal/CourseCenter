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
    const sentFirstname=req.body.Firstname;
    const sentLastname=req.body.Lastname;
    const sentEmail = req.body.Email;
    const sentUsername = req.body.Username;
    const sentPassword = req.body.Password;
    const sentConfirmPassword= req.body.ConfirmPassword;

    const SQL = 'INSERT INTO users (firstname,lastname,email, username, password,confirm_password) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [sentFirstname,sentLastname,sentEmail, sentUsername, sentPassword,sentConfirmPassword];
    
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
    const LoginsentEmail = req.body.LoginEmail;
    const LoginsentPassword = req.body.LoginPassword;
    console.log('email',LoginsentEmail);
    console.log('password',LoginsentPassword);
    const SQL = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [LoginsentEmail,LoginsentPassword];
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