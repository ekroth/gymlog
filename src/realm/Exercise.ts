import { ObjectSchema } from 'realm'

export class ExerciseSchema {
  public static schema: ObjectSchema = {
    name: 'ExerciseSchema',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      name: { type: 'string' },
      color: { type: 'string' }
    }
  }
}
