import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    if (!user) return res.status(400).json({ message: 'Invalid User Data!' });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY as string);

    res.status(201).json({ message: 'User Created!', user, token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'User Not Found!' });

    const matched = await bcrypt.compare(password, user?.password);

    if (!matched) return res.status(401).json({ message: 'Wrong Password!' });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY as string);

    res.status(200).json({ message: 'User Logged In!', user, token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
