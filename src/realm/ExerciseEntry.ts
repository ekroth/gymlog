import { ObjectSchema } from 'realm'

export class ExerciseEntrySchema {
  public static schema: ObjectSchema = {
    name: 'ExerciseEntrySchema',
    properties: {
      exercise: { type: 'ExerciseSchema' },
      sets: { type: 'SetSchema[]' },
      color: { type: 'string' }
    }
  }
}
