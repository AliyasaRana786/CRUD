import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Msql@123!',
    database: 'itcompany'
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to the home page");
});

app.get('/empl', (req, res) => {
    const q = "SELECT * FROM staff";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/empl', (req, res) => {
    const q = "INSERT INTO staff (name, email, designation, salary) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.designation,
        req.body.salary
    ];
    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("New post was successfully added");
    });
});


app.put('/empl/:id', (req, res) => {
    const parmId = req.params.id;
    const q = "UPDATE staff SET `name`=?, `email`=?, `designation`=?, `salary`=? WHERE id=?";
    
    const values = [
        req.body.name,
        req.body.email,
        req.body.designation,
        req.body.salary
    ];

    db.query(q, [...values, parmId], (err, data) => {
        if (err) {
            console.error("Error updating record:", err);
            return res.status(500).json({
                success: false,
                message: "Failed to update the record",
                error: err
            });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "No record found with the provided ID"
            });
        }

        return res.status(200).json({
            success: true,
            message: `Record with ID ${parmId} was successfully updated`
        });
    });
});

app.delete('/emp/:id', (req, res) => {
    const parmId = req.params.id;
    const q = "DELETE FROM staff WHERE id=?";
    db.query(q, [parmId], (err, data) => {
        if (err) {
            console.error("Error deleting data:", err);
            return res.status(500).json({ error: "Failed to delete data", details: err });
        }
        return res.status(200).json("Delete was successful");
    });
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
