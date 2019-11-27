import { Express } from 'express';
import { createModel } from '../../util/factory';
import { Schema } from 'mongoose';


export const Hero = (app: Express) => {

  createModel(app)({
    props: {
      name: { type: String, required: true },
      lastName: { type: String },
      power: { type: Boolean, required: true },
      element: { type: Schema.Types.ObjectId, ref: 'Element' }
    },
    singular: 'hero',
    plural: 'heroes',
  });

}

