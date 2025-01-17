import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config();

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("TOKEN IS ", token);
    if(!token) {
        res.status(401).json({message: "Access denied, no token provided!"})
        return
    }

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        console.log("DECODED INFO ", decoded);
        (req as any).user = decoded
        next()
    } catch (error : any) {
        res.status(403).json({message: "Invalid token"})
        return
    }
}