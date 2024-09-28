import express from 'express'; 
import cors from 'cors'; 
import mysql from 'mysql'



const app = express();
app.use(express.json()); 
app.use(cors()); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mysql-practice'
})

app.get("/", (req, res)=> {
    const sql = "SELECT * FROM students"; 
    db.query(sql, (error, data) => {
        if(error){
            return res.json('There is error');
        }else {
            return res.json(data)
        }
    })
})


app.post('/create-user', (req, res)=> {
    const sql = "INSERT INTO students (`Name`, `Email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (error, data) => {
        if(error){
            return res.json('Error');
        }else{
            return res.json(data);
        }
    })
})


app.put('/update-user/:id', (req, res) => {
    const sql = "UPDATE students SET `Name` = ?, `Email` = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.params.id
    ];

    db.query(sql, values, (error, data) => {
        if (error) {
            return res.status(500).json({ message: 'Error updating user', error });
        } else {
            return res.status(200).json({ message: 'User updated successfully', data });
        }
    });
});



// Functionality for delete user
app.delete('/delete-user/:id', (req, res) => {
    const sql = "DELETE FROM students WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (error, data) => {
        if (error) {
            return res.status(500).json({ message: 'Error deleting user', error });
        } else {
            return res.status(200).json({ message: 'User deleted successfully', data });
        }
    });
});


app.listen(5000, ()=> {
    console.log(`Server is listening...`)
})