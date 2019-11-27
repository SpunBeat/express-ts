import { Express } from 'express';
import { createModel } from '../../util/factory';

export const Ball = (app: Express) => {

  createModel(app)({
    props: {
      name: { type: String, required: true },
      color: { type: String },
      exist: { type: Boolean, required: true }
    },
    singular: 'ball',
    plural: 'balls',
  });

}

