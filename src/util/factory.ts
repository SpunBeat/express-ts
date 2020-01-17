import { Request, Response, Express } from 'express';
import { EntityConfiguration, MetaResponse, RouteConfiguration, RouteMethod } from '../../interfaces/project.interfaces'
import { CounterModel } from '../api/counter/counter.model';
import { setPropsFrom, capitalize } from './common';
import { createEntity } from './entity';
import { model } from 'mongoose';

export const createMeta = (request: string, success: boolean, data: any) => {
  const response: MetaResponse = {
    meta: {
      request,
      success
    },
    data
  };
  return response;
}

export const createModel = (app: Express) => (config: any) => {

  const modelName = capitalize(config.singular)

  const ElementSchema = createEntity(config.props)

  const ElementModel = () => model(modelName, ElementSchema);

  const createExpressFactory = createFactory(app);

  createExpressFactory({
    ref: ElementModel(),
    singular: config.singular,
    plural: config.plural,
    props: config.props
  })

}

export class FactoryModel {

  modelName = capitalize(this.config.singular)

  ElementSchema = createEntity(this.config.props)

  ElementModel = () => model(this.modelName, this.ElementSchema);

  createExpressFactory = createFactory(this.app);

  constructor(private config: any, private app: Express) {
    this.createExpressFactory({
      ref: this.ElementModel(),
      singular: config.singular,
      plural: config.plural,
      props: config.props
    })
  }

}

export const createFactory = (app: Express) => async (config: EntityConfiguration) => {

  const { ref, conditions = {}, by = 'id', props, plural, singular, routes = [] } = config

  const getMany = () => async (req: Request, res: Response) => {
    const method = 'getMany';
    try {
      // 2. start the query
      const documentQuery = ref.find(conditions)
      // 3. await to responds
      const data = await documentQuery.exec()
      // 4. response to server
      res.status(200).json(createMeta(method, true, { [plural]: data }))
    } catch (error) {
      res.status(500).json(createMeta(method, false, { error }))
    }
  }

  const getOne = () => async (req: Request, res: Response) => {
    const method = 'getById';
    try {
      // 2. start the query
      const documentQuery = ref.findById(req.params.id)
      // 3. await to responds
      const data = await documentQuery.exec()
      // 4. response to server
      res.status(200).json(createMeta(method, true, { [singular]: data }))
    } catch (error) {
      res.status(500).json(createMeta(method, false, { error }))
    }
  }

  const createOne = () => async (req: Request, res: Response) => {
    const method = 'createOne';
    try {
      // 2. start the query
      const instance = new ref(req.body)
      // 3. await to responds
      const data = await instance.save()

      const counterRef = CounterModel()

      const counterFound = await counterRef.findOne(
        { ref: singular }
      )

      let counter: any

      if (counterFound) {
        counter = await counterRef.findOneAndUpdate(
          { ref: singular },
          { $inc: { sequence: 1 } },
          { new: true }
        ).select({ __v: 0, active: 0, updates: 0 })
      }  else {
        const counterInstance = new counterRef({ref: singular})
        counter = await counterInstance.save()
      }

      const updatedData = await ref.findByIdAndUpdate(
        data._id,
        { id: (counter as any).sequence },
        { new: true }
      );

      // 4. response to server
      res.status(200).json(createMeta(method, true, { [singular]: updatedData }))
    } catch (error) {
      res.status(500).json(createMeta(method, false, { error }))
    }
  }

  const updateOne = () => async (req: Request, res: Response) => {
    const method = 'updateOne';
    try {
      // console.log(setPropsFrom({ props, from: req.body }));
      const document = await ref.findById(req.params[by]).exec()

      // 2. start the query
      const documentQuery = ref.findByIdAndUpdate(
        // a. find by
        req.params[by],
        // b. set properties - ie. $set: { a: req.body.a, ... }
        setPropsFrom({ props, from: req.body }, (document as any).updates),
        // c. options
        { new: true }
      ).select({ __v: 0, active: 0, updates: 0 })
      // 3. await to responds
      const data = await documentQuery.exec()
      // 4. response to server
      res.status(200).json(createMeta(method, true, { [singular]: data }))
    } catch (error) {
      res.status(500).json(createMeta(method, false, { error }))
    }
  }

  const deleteOne = () => async (req: Request, res: Response) => {
    const method = 'deleteOne';
    try {
      // 3. start the query
      const documentQuery = ref.findByIdAndRemove(req.params[by])
      // 4. await to responds
      const data = await documentQuery.exec()
      // 5. response to server
      res.status(200).json(createMeta(method, true, { [singular]: data }))
    } catch (error) {
      res.status(500).json(createMeta(method, false, { error }))
    }
  }

  const createRoute = async (route: RouteConfiguration) => {
    const { path, generator } = route;
    const [method, cb] = generator;
    switch (method) {
      case RouteMethod.Get:
        app.route(`/api/${path}`).get(cb)
        return Promise.resolve();
      case RouteMethod.Post:
        app.route(`/api/${path}`).post(cb)
        return Promise.resolve();
      case RouteMethod.Patch:
        app.route(`/api/${path}`).patch(cb)
        return Promise.resolve();
      case RouteMethod.Delete:
        app.route(`/api/${path}`).delete(cb)
        return Promise.resolve();
      case RouteMethod.Put:
        app.route(`/api/${path}`).put(cb)
        return Promise.resolve();
      default:
        break;
    }
  }

  for (const route of routes) {
    await createRoute(route)
  }

  if (ref) {
    app.route(`/api/${plural}`)
      .get(getMany())
      .post(createOne())
  
    app.route(`/api/${singular}/:id`)
      .get(getOne())
      .patch(updateOne())
      .delete(deleteOne())
  }

}
