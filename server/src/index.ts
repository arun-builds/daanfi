import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nacl from 'tweetnacl'; 
import bs58 from 'bs58';

import { User, Nonce } from './db/schema';
import { requireAuth } from './middlewares/middleware';

const NONCE_TTL_MS = 5 * 60 * 1000;

const app = express();
app.use(cors());
app.use(express.json());


dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET || 'daanfi_secret_key';
try {
    await mongoose.connect(DATABASE_URL!);
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('Error connecting to MongoDB', err);
}


app.get('/adddata',requireAuth, async(req, res) => {
   const name = "authhhh";
   const email = "authhhh@example.com";
   const password = "password";
    const user = await User.create({ name, email, password });
    res.status(200).json(user);
});

app.get('/getdata',requireAuth, async(req, res) => {
    console.log("inside getdata");
    
    const users = await User.find();
    res.status(200).json(users);
});

app.get('/api/auth/challenge', async(req, res) => {
    const publicKey = req.query.publicKey as string;

    if (!publicKey) {
        return res.status(400).json({ message: "Solana public key is required." });
    }

    try {
        // 1. Generate unique nonce message
        const nonceValue = crypto.randomBytes(16).toString('hex');
        const message = `Sign this message to prove ownership: ${nonceValue}`;
        
        const expiryDate = new Date(Date.now() + NONCE_TTL_MS);

        // 2. Store the nonce (updates if wallet already requested a challenge)
        const nonceRecord = await Nonce.findOneAndUpdate(
            { publicKey },
            { $set: { nonce: message, createdAt: new Date(), expiresAt: expiryDate } },
            { upsert: true, new: true }
        );

        // 3. Send the message back for signing
        return res.json({ nonce: message });

    } catch (error) {
        console.error('Challenge generation error:', error);
        return res.status(500).json({ message: "Server error during challenge creation." });
    }
});

app.post('/api/auth/verify', async(req, res) => {
    const { publicKey, nonce, signature } = req.body;
    if (!publicKey || !nonce || !signature) {
        return res.status(400).json({ message: "Missing required authentication fields." });
    }

    try {
        // 1. Retrieve the stored nonce for this public key
        const nonceRecord = await Nonce.findOne({ publicKey });
        if (!nonceRecord) {
            return res.status(400).json({ message: "No challenge found for this public key." });
        }

        const signatureBytes = bs58.decode(signature);
        const messageBytes = new TextEncoder().encode(nonce);
        const publicKeyBytes = bs58.decode(publicKey);
        
        const isVerified = nacl.sign.detached.verify(
            messageBytes,
            signatureBytes,
            publicKeyBytes
        );

        if (!isVerified) {
            return res.status(401).json({ message: "Signature verification failed. Invalid key or message." });
        }

        let user = await User.findOneAndUpdate(
            { walletAddress: publicKey },
            { $set: { lastLogin: new Date() } },
            { upsert: true, new: true }
        );
        if (!user) {
            return res.status(401).json({ message: "error getting user from database." });
        }

        await Nonce.deleteOne({ _id: nonceRecord._id });


        const payload = {
            userId: user.walletAddress,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });

        return res.json({ token, userId: user.walletAddress });


       
        
    } catch (error) {
        console.error('Verification error:', error);
        return res.status(500).json({ message: "Server error during verification." });
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
