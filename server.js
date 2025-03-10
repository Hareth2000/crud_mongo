// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes'); // استيراد المسارات

const app = express();
app.use(express.json());

// الاتصال بـ MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('متصل بـ MongoDB Atlas'))
    .catch(err => console.error('خطأ في الاتصال بـ MongoDB:', err));

// استخدام المسارات
app.use('/api', itemRoutes); // كل المسارات ستكون تحت /api

// بدء السيرفر على البورت المحدد
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 السيرفر يعمل على http://localhost:${PORT}`);
});
