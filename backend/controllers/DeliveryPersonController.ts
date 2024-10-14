import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import multer, { Multer, StorageEngine } from 'multer';
import DeliveryPerson from '../models/deliverypersonModel'; 

const storage: StorageEngine = multer.memoryStorage();
const upload: Multer = multer({ storage });

export const registerDeliveryPerson = [
    upload.single('avatar'),
    async (req: Request, res: Response): Promise<void> => {
        const { name, email, phoneNumber, address, password,avatar } = req.body;
       

        try {
           
            const deliveryPersonExists = await DeliveryPerson.findOne({ email });
            if (deliveryPersonExists) {
                res.status(400).json({ message: 'Delivery person already exists' });
                return;
            }

        
            const newDeliveryPerson = new DeliveryPerson({
                name,
                email,
                phoneNumber,
                address,
                password: await bcrypt.hash(password, 10), 
                avatar
            });

            
            await newDeliveryPerson.save();

            res.status(201).json({
                message: 'Delivery person registered successfully.',
            });
        } catch (error) {
            res.status(500).json({ message: 'Registration failed, please try again.' });
        }
    },
];
