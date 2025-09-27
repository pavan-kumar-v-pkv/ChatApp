import express from 'express';
import { getAllContacts, getMessageByUserId, sendMessage, getChatPartners } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const router = express.Router();

// The middlewares are applied in the order they are specified - so requests get rate-limited first, then authenticated.
// this is actually more efficient since autheticated requests get blocked first by arcjet, so we don't waste resources on auth checks
router.use(arcjetProtection ,protectRoute);

router.get('/contacts', getAllContacts);
router.get('/chats', getChatPartners);
router.get('/:id', getMessageByUserId);
router.post('/send/:id', sendMessage);

export default router;