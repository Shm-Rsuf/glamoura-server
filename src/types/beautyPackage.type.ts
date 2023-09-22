import { Document } from 'mongoose';
import { specialistType } from './speacialist.type';
import { bookingType } from './booking.type';

export type beautyPackageType = {
  title: string;
  description: string;
  category: string;
  images: string;
  price: number;
  specialists: specialistType[];
  bookings: bookingType[];
} & Document;
