const express = require('express');
const userRouter = require('./routers/userRouter');
const cors = require('cors');
const app = express();

require('dotenv').config();

require('./db/connect');

const port = process.env.PORT | 8000;

app.use(express.json());
app.use(express.urlencoded({ extended:false })); 
// app.use(cors({ origin:process.env.DEV_URL,credentials:true }));
app.use(cors({ origin:"*",credentials:true }));

app.get('/', (req,res) => {res.status(200).send('hello bro')});

app.use('/v1/api/user',userRouter);

app.listen(port,() => console.log(`server is running at port:${port}`));

