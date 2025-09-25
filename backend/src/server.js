// basic API
import express from 'express';
import path from 'path';

import { ENV } from './lib/env.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';



const app = express();
const __dirname = path.resolve()
const PORT = ENV.PORT || 3000;

app.use(express.json()); // to parse json data, request body
app.use(cookieParser()); // to parse cookies

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// make it ready for deplyment
if(ENV.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    })
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
})