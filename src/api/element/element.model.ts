import { Express } from 'express';
import { createModel } from '../../util/factory';


export const ElementRoutes = (app: Express) => {

  createModel(app)({
    props: {
      name: { type: String, required: true },
      price: Number,
      otraCosa: { type: Boolean }
    },
    singular: 'element',
    plural: 'elements',
  });

}

