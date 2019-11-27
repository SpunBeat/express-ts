import { Model, Document } from 'mongoose';
import { Request, Response } from 'express';

export interface Entity {
  _id: string;
  id?: number;

  creation: {
    created: string | Date;
  };

  updates: {
    updated: string | Date;
  }[] | null;

  active: boolean;
}

export interface MetaResponse {
  meta: {
    request: string;
    success: boolean;
  };
  data: any;
}

export interface EntityConfiguration {
  ref?: Model<Document, {}>;
  by?: string;
  plural?: string;
  singular?: string;
  conditions?: any;
  props?: any;
  routes?: RouteConfiguration[]
}
export enum RouteMethod {
  Get,
  Post,
  Delete,
  Patch,
  Put
}

export interface RouteConfiguration {
  path: string;
  generator: [RouteMethod, (req: Request, res: Response) => any]
}