import express from "express";
import dotenv from "dotenv";
/******
IMPORTS
*******/
/*************************** USERS ****************************/
import login_router from './routes/user/login.js';
/*************************** DATABASES ****************************/
import databases from './routes/databases/databases.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use((req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Content, Accept, Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));


/*************************** USERS ****************************/
app.use('/api', login_router);
/*************************** DATABASES ****************************/
app.use('/api', databases);



function onStart() {
    console.log(`Server running on port ${port}`);
}

app.listen(port, onStart);

export default app;