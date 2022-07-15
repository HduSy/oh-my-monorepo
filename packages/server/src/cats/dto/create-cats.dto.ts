import Joi from '@hapi/joi';

export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

// export const CreateCatSchema = Joi.object({
//   name: Joi.string(),
//   age: Joi.number().integer().min(1).max(130),
//   breed: Joi.string(),
// });
