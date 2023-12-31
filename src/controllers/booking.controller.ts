import { Request, Response } from 'express';
import BookingtModel from '../models/booking.model';
import { handleError } from '../errors/handle.error';
import mongoose from 'mongoose';
import BeautyPackageModel from '../models/beautyPackage.model';
import UserModel from '../models/user.model';
import { bookingType } from '../types/booking.type';

export default class BookingController {
  constructor() {}

  public async createSingleBooking(req: Request, res: Response): Promise<void> {
    try {
      const { bid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(bid)) {
        res.status(404).json({ message: 'beauty package not found!' });
      }

      const user = await UserModel.findById(req.user?._id).populate('bookings');
      const alreadyBooked = user?.bookings.find(
        (booking: bookingType) => bid === booking.beautyPackage._id.toString()
      );

      if (alreadyBooked) {
        res.status(403).json({ message: 'beauty package already booked' });
        return;
      }

      await Promise.resolve().then(async () => {
        const booking = await BookingtModel.create({
          beautyPackage: bid,
          user: req.user?._id,
        });

        await BeautyPackageModel.findByIdAndUpdate(bid, {
          $addToSet: {
            bookings: booking?._id,
          },
        });

        await UserModel.findByIdAndUpdate(req.user?._id, {
          $addToSet: {
            bookings: booking?._id,
          },
        });

        res.status(200).json(booking);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteSingleBooking(req: Request, res: Response): Promise<void> {
    try {
      const { bid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(bid)) {
        res.status(404).json({ message: 'beauty package not found!' });
      }

      const existedBooking = await BookingtModel.findById(bid);
      if (!existedBooking) {
        res.status(404).json({ message: 'booking does not exist' });
        return;
      }

      const user = await UserModel.findById(req.user?._id);
      const matchBooking = user?.bookings.find(
        (booking: bookingType) => bid === booking._id.toString()
      );

      if (!matchBooking) {
        res.status(404).json({ message: 'booking does not exist' });
        return;
      }

      await Promise.resolve().then(async () => {
        const booking = await BookingtModel.findByIdAndDelete(bid);
        res.status(200).json(booking);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getAllBookings(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const bookings = await BookingtModel.find({}).populate(
          'beautyPackage user'
        );
        res.status(200).json(bookings);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
