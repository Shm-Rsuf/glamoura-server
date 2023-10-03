import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';

import mongoose from 'mongoose';
import SpecialistModel from '../models/specialist.model';

export default class SpecialistController {
  constructor() {}

  public async getAllSpecialist(req: Request, res: Response) {
    try {
      await Promise.resolve().then(async () => {
        const specialists = await SpecialistModel.find({});
        res.status(200).json(specialists);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getSingleSpecialist(req: Request, res: Response) {
    try {
      const { sid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ message: 'Specialist not found!' });
      }

      await Promise.resolve().then(async () => {
        const specialists = await SpecialistModel.findById({});
        res.status(200).json(specialists);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async createSingleBeautyPackage(req: Request, res: Response) {
    try {
      const { name, designaion, bio, photoUrl, dateOfBirth } = req.body;

      await Promise.resolve().then(async () => {
        const specialists = await SpecialistModel.create({
          name,
          designaion,
          bio,
          photoUrl,
          dateOfBirth,
        });
        res.status(200).json(specialists);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async updateBeautyPackage(req: Request, res: Response) {
    try {
      const { name, designaion, bio, photoUrl, dateOfBirth } = req.body;
      const { sid } = req.params;

      if (mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ message: 'specialist not found!' });
      }

      await Promise.resolve().then(async () => {
        const specialists = await SpecialistModel.findByIdAndUpdate(
          sid,
          {
            name,
            designaion,
            bio,
            photoUrl,
            dateOfBirth,
          },
          { new: true }
        );
        res.status(200).json(specialists);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteBeautyPackage(req: Request, res: Response) {
    try {
      const { sid } = req.params;

      if (mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ message: 'user not found!' });
      }

      await Promise.resolve().then(async () => {
        const beautyPackage = await SpecialistModel.findByIdAndDelete(sid);
        res.status(200).json(beautyPackage);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
