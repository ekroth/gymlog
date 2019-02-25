import { ObjectSchema } from 'realm'

export class ExerciseSchema {
  public static schema: ObjectSchema = {
    name: 'ExerciseSchema',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: { type: 'string' },
      color: { type: 'string' }
    }
  }
}
