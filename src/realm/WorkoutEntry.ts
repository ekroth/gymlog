import { ObjectSchema } from 'realm'

export class WorkoutEntrySchema {
  public static schema: ObjectSchema = {
    name: 'WorkoutEntrySchema',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      timestamp: { type: 'int' },
      exercises: { type: 'ExerciseEntrySchema[]' }
    }
  }
}
