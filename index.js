const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const productFeedbackRoutes = require('./routes/productFeedbackRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wrmw0mh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        app.locals.db = client.db("techhub");

        app.get('/', (req,res) => {
            res.send('Runningg latest.' + process.env.DB_USER + '11111111111')
        })

        app.use('/users', userRoutes);
        app.use('/auth', authRoutes);
        app.use('/products', productRoutes);
        app.use('/product-feedback', productFeedbackRoutes);

        app.listen(5000, () => {
            console.log(`Server is running on port 5000`);
        });
    } finally {
    }
}
run().catch(console.dir);