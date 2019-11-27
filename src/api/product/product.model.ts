import { Express } from 'express';
import { createModel } from '../../util/factory';


export const ProductRoutes = (app: Express) => {

  createModel(app)({
    props: {
      name: { type: String, required: true }
    },
    singular: 'product',
    plural: 'products',
  });

}