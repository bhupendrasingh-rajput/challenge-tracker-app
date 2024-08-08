import express from 'express';
import { createChallenge, getChallenges, updateChallenge, updateChallengeProgress } from '../controllers/challengeController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createChallenge);
router.get('/', protect, getChallenges);
router.put('/:id', protect, updateChallenge);
router.post('/progress/:id', protect, updateChallengeProgress);

export default router;

