import { ObjectSchema } from 'realm'

export class ExerciseEntrySchema {
  public static schema: ObjectSchema = {
    name: 'ExerciseEntrySchema',
    properties: {
      sets: { type: 'SetSchema[]' }
    }
  }
}
