import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { shortUrl, getOriginalUrl } from './Controllers/url.js';
import dotenv from 'dotenv';

const app = express(); 

app.use(express.urlencoded({extended:true}))
dotenv.config(); // Load env variables from .env file

mongoose.connect(process.env.MONGO_URI, 

// mongoose.connect(
//     "mongodb+srv://mukul:1010@nodecluster0.hurza.mongodb.net/?retryWrites=true&w=majority&appName=NodeCluster0",
    {
        dbName:"URLshort"
    }
)
.then(() => {
    console.log("MongoDb connected..!!")
})
.catch((err) => {
    console.log(err)
})

// rendering the html
app.get('/', (req, res) => {
    res.render('index.ejs', {shortUrl: null});
});

//post route for submit  => shorting url logic
app.post('/short', shortUrl)


//dynamic route -> redirect to original url
app.get('/:shortCode', getOriginalUrl)


const port = 1000;
app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
    console.log("http://localhost:1000/");
});




