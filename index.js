const express = require('express');
const path = require('path');
const app = express();


app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', 'views');


const checkWorkingHours = (req, res, next) => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); 
    const hourOfDay = currentDate.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 23) {
        next(); 
    } else {
        res.send('Sorry, our website is only available during working hours (Monday to Friday, from 8 to 9:59 ).');
    }
};

app.get('/', checkWorkingHours, (req, res) => {
    res.render('home'); 
});

app.get('/home', checkWorkingHours, (req, res) => {
    res.render('home'); 
});

app.get('/services', checkWorkingHours, (req, res) => {
    res.render('services'); 
});

app.get('/contact', checkWorkingHours, (req, res) => {
    res.render('contact'); 
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

app.use("/",express.static("./node_modules/bootstrap/dist/"));
