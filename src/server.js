const express = require('express');
const bodyParser = require('body-parser');
const { updateCoinCount, applyPromoCode } = require('./gameLogic');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/updateCoins', async (req, res) => {
    const { userId, coins } = req.body;
    await updateCoinCount(userId, coins);
    res.json({ message: 'Coins updated successfully' });
});

app.post('/applyPromoCode', async (req, res) => {
    const { userId, promoCode } = req.body;
    const result = await applyPromoCode(userId, promoCode);
    res.json(result);
});

app.listen(port, () => {
    console.log(`Music Microservice is listening on port ${port}`);
});
