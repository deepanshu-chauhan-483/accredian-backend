// backend/routes/referral.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import sendReferralEmail from '../emailService.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { name, email, refereeEmail } = req.body;

  // Validate required fields
  if (!name || !email || !refereeEmail) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the email already exists
    const existingReferral = await prisma.referral.findUnique({
      where: { email },
    });

    if (existingReferral) {
      return res.status(400).json({ error: 'This email has already been referred' });
    }

    // Save new referral
    const newReferral = await prisma.referral.create({
      data: { name, email, refereeEmail },
    });

    // Send referral email
    await sendReferralEmail(name, email, refereeEmail);

    res.status(201).json({ message: 'Referral submitted successfully', referral: newReferral });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
