import * as Joi from 'joi'

export class CreateCatDto {
  readonly name: string
  readonly age: number
  readonly breed: string
}
// Joi 提供了语义化 API 以非常简单的方式创建schema，对对象结构进行验证
export const CreateCatSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number().integer().min(1).max(130),
  breed: Joi.string(),
})
