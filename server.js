const express = require('express');
const axios = require('axios');
const app = express();
const port = 5500;

//Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));


//routes
app.get('/', async (req, res) => {
    try {
        const randomQuote = await getRandomQuote();
        const categories = await getCategories();
        res.render('index', { quote: randomQuote, categories });
    }catch (error) {
        res.status(500).send('Error fetching data from the Chuck Norris API');
    }
});

app.get('/quote/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const randomQuote = await getRandomQuote(category);
        const categories = await getCategories();
        res.render('index', { quote: randomQuote, categories, selectedCategory: category});
    } catch (error) {
        res.status(500).send('Error fetching data from the Chuck Norris API.');
    }
});

//helper functions to interact with Chuck Norris API
async function getRandomQuote(category = '') {
    const apiUrl = category
    ? `https://api.chucknorris.io/jokes/random?category=${category}`
    : 'https://api.chucknorris.io/jokes/random';
    const response = await axios.get(apiUrl);
    return response.data.value;
}  

async function getCategories() {
    const response = await axios.get('https://api.chucknorris.io/jokes/categories');
    return response.data;
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});