const express = require('express');
const Controller = require('./controllers/controller');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('');
app.get('');
app.get(''); 
app.get('');
app.post('');
app.get('');
app.get(''); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
