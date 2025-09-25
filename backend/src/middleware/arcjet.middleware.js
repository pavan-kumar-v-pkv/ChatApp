import aj from '../lib/arcjet.js';
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.inspect(req);
        if (decision.isDenied()) {
            if(decision.reason.isRateLimit()){
                return res.status(429).json({ message: 'Too many requests. Please try again later.' });
            }
        
            else if(decision.reason.isBot()){
                return res.status(403).json({ message: 'Forbidden. Bot traffic is not allowed.' });
            }
            else{
                return res.status(403).json({ message: 'Forbidden. Suspicious activity detected.' });
            }
        }

        // check for spoofed bots
        if(decision.results.some(isSpoofedBot)) {
            return res.status(403).json({ 
                error: "Spoofed Bot Detected",
                message: 'Malicious bot activity detected.' });
        }
        next();
    } catch (error) {
        console.error('Arcjet protection error:', error);
        next();
    }
}