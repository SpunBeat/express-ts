import { Express } from 'express';
import { FactoryModel, createFactory } from '../../util/factory';


export class Ball {

  config = {
    props: {
      name: { type: String, required: true },
      color: { type: String },
      exist: { type: Boolean, required: true }
    },
    singular: 'ball',
    plural: 'balls',
  };

  constructor(private app: Express) {
    new FactoryModel(this.config, this.app)
  }

}
