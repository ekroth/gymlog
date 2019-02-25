import { ObjectSchema } from 'realm'

export class SetSchema {
  public static schema: ObjectSchema = {
    name: 'SetSchema',
    properties: {
      weight: { type: 'int' },
      reps: { type: 'int' }
    }
  }
}
