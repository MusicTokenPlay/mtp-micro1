const axios = require('axios');
require('dotenv').config();

const centralServerUrl = process.env.CENTRAL_SERVER_URL;

async function updateCoinCount(telegramUserId, coinCount) {
    try {
        const response = await axios.post(`${centralServerUrl}/updateCoins`, { userId: telegramUserId, coins: coinCount });
        console.log('Coins updated:', response.data);
    } catch (error) {
        console.error('Error updating coins:', error);
    }
}

async function applyPromoCode(telegramUserId, promoCode) {
    try {
        const response = await axios.post(`${centralServerUrl}/applyPromoCode`, { userId: telegramUserId, promoCode });
        return response.data;
    } catch (error) {
        console.error('Error applying promo code:', error);
        return { success: false, message: 'Failed to apply promo code' };
    }
}

module.exports = {
    updateCoinCount,
    applyPromoCode
};
inCount, applyPromoCode };