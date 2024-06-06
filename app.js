const express = require('express');
const { engine } = require('express-handlebars')
const path = require('path')
const app = express();
const pgp = require('pg-promise')()

const client = {
    user:'postgres',
    host: 'localhost',
    port: '5432',
    password: 'admin',
    database: 'postgres'
}
const db = pgp(client)
app.engine('hbs', engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')))
console.log(path.join(__dirname, '/public'))
// Route cho trang chính
app.get('/', async (req, res) => {
    let data = await db.one('select * from edudb.class limit 1') 
    console.log(req.query)
    // Render template cho trang chính
    res.render('home', {

    });
});

// Route cho trang phụ
const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config()
 
const connectDb = async () => {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
 
        await client.connect()
        const res = await client.query('SELECT * FROM some_table')
        console.log(res)
        await client.end()
    } catch (error) {
        console.log(error)
    }
}
 
connectDb()

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});