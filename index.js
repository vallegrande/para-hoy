const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const PORT = 3000;
const ip = 'localhost';
const connection = require("./db/db")


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public/'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
});

// Código para insertar datos en la base de datos
app.post('/guardar', (req, res) => {
    const { nombre, apellido, dni, fecha, sexo, celular, email, direccion, colesterol, glucosa, hemoglobina, tipo } = req.body;
    
    const sql = 'INSERT INTO pacientes (nombre, apellido, dni, fecha_nacimiento, sexo, celular, email, direccion, colesterol, glucosa, hemoglobina, tipo_seguro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [nombre, apellido, dni, fecha, sexo, celular, email, direccion, colesterol, glucosa, hemoglobina, tipo];
    
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al guardar los datos', err);
            res.status(500).send('Error al guardar los datos');
        } else {
            console.log('Datos guardados correctamente', req.body);
            res.send('Datos guardados correctamente');
        }
    });
});



app.listen(PORT,(req,res)=>{
    console.log(`Servidor conectado en http://${ip}:${PORT}`)
}
)