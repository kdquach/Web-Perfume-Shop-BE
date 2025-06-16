import { Request, Response } from 'express';
import { createUser, getUsers, loginUser } from '../services/user.service';
import { UserInterface } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData: UserInterface = req.body;
    const user = await createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await loginUser(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Tạo accessToken
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      user, 
      accessToken
    });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
