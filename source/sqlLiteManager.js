const sqlite3 = require('sqlite3');
const sqlVerbose = sqlite3.verbose();
const path = require('path');

const databaseName = path.join(__dirname,"db","database.bd");
const db = new sqlVerbose.Database(databaseName,(err)=>{
    if(err)console.log(err)
    else console.log('Exito conectando a la db')
});

const sqlCreate = `SELECT * FROM PRODUCTOS`;
db.run(sqlCreate,(err)=>{
    if(err)console.log(err,res)
    else{
        db.each(sqlCreate,(err,row)=>{
            console.dir(row);
        });
    }
});