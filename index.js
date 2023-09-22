const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const route = require('./src/routes');
const port = process.env.PORT || 3000
app.use(express.static(path.join(__dirname, 'src','public')));

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname,'src', 'resources', 'views'));


//route
route(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
