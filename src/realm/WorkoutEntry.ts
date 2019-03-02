import { ObjectSchema } from 'realm'

import { WorkoutEntry } from '../model/WorkoutEntry'
import { CloneRealm } from './CloneRealm'
import { ExerciseEntrySchema } from './ExerciseEntry'

export class WorkoutEntrySchema implements CloneRealm<WorkoutEntry> {
  public static schema: ObjectSchema = {
    name: 'WorkoutEntrySchema',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      timestamp: { type: 'int' },
      exercises: { type: 'ExerciseEntrySchema[]' }
    }
  }

  public cloneRealm = () => {
    const self = this as { [v: string]: any }
    return {
      id: self.id,
      timestamp: self.timestamp,
      exercises: Array.from(self.exercises as ExerciseEntrySchema[]).map(v =>
        v.cloneRealm()
      )
    }
  }
}
