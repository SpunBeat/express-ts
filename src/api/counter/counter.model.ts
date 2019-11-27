import { model } from 'mongoose';
import { Express } from 'express';
import { createEntity } from '../../util/entity';
import { createFactory } from '../../util/factory';


const CounterSchema = createEntity({
  ref: { type: String, required: true, unique: true },
  sequence: { type: Number, default: 1 },
})

export const CounterModel = () => model('Counter', CounterSchema);

export const CounterRoutes = (app: Express) => {
  const createExpressFactory = createFactory(app);

  createExpressFactory({
    ref: CounterModel(),
    singular: 'counter',
    plural: 'counters',
    props: {
      name: 'name'
    }
  })

}
