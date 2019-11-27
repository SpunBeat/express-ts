import { Schema } from 'mongoose';
import { Entity } from '../../interfaces/project.interfaces';

export const createEntity = (props: any): Schema<Entity | any> => {
  return new Schema({
    ...props,
    id: { type: Number, default: 0 },
    creation: {
      created: Date
    },
    updates: [
      {
        type: Schema.Types.Mixed
      }
    ],
    active: { type: Boolean, default: true }
  });
}