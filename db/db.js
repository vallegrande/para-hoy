const mysql = require('mysql2');

connection= mysql.createConnection({
    host:'jossue-14.cbuouomuyh5z.us-east-1.rds.amazonaws.com',
    user:'jossue14',
    password:'jossue-14',
    database:'nube',
    port:'3306'
});

connection.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log('conectado correctamente')
    }
})

module.exports= connection;

