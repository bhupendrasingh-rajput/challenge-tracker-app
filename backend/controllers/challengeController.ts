import { Request, Response } from 'express';
import Challenge from '../models/challenge';

export const createChallenge = async (req: Request, res: Response) => {
  const { title, description, startDate, endDate, frequency, userId } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const challenge = await Challenge.create({
      title,
      description,
      startDate,
      endDate,
      frequency,
      progress: [],
      userId,
    });

    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const getChallenges = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const challenges = await Challenge.find({ userId });
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const updateChallenge = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, startDate, endDate, frequency } = req.body;

  try {
    const challenge = await Challenge.findByIdAndUpdate(
      id,
      { title, description, startDate, endDate, frequency },
      { new: true, runValidators: true }
    );

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    res.status(200).json(challenge);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const updateChallengeProgress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, completed } = req.body;

  try {
    const challenge = await Challenge.findById(id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    const existingProgress = challenge.progress.find(p => p.date.toISOString() === new Date(date).toISOString());

    if (existingProgress) {
      existingProgress.completed = completed;
    } else {
      challenge.progress.push({ date: new Date(date), completed });
    }

    await challenge.save();

    res.status(200).json({ message: 'Progress updated successfully', challenge });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
