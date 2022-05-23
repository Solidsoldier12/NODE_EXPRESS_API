import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req,res) => res.send('Hello from homepage'));

//Ctrl+C to stop the Nodemon Server
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));//https://www.w3schools.com/js/js_string_templates.asp
