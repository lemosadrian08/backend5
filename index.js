const express = require('express');
const path =require('path');
const apiRoutes = require('./routers/app.routers');
const { engine } = require ('express-handlebars')
const contenedor1 = require ('./contenedor')


const app = express();
const PORT = process.env.PORT || 8080;

app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: path.resolve(__dirname, './views/hbs/layouts'),
  partialsDir: path.resolve(__dirname, './views/hbs/partials')
}))

//ejs
/* app.set('views', './views/ejs');
app.set('view engine', 'ejs'); */

//hbs
app.set('views', './views/hbs/layouts');
app.set('view engine', 'hbs');

//pug
/* app.set('views', './views/pug');
app.set('view engine', 'pug'); */

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(express.static('public')) */
app.use(express.static(path.resolve(__dirname, './public')));


// Routes
app.use('/api', apiRoutes)


app.get('/products', (req,res)=>{
  contenedor1.getAll().then((products) => 
  res.render('index', {products})) 
})

app.post('/products', (req,res)=>{
  contenedor1.save(req.body)
  res.redirect('/products')
}) 


const connectedServer = app.listen(PORT, ()=> {
  console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.error('Error: ', error);
})
