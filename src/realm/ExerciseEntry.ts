import { ObjectSchema } from 'realm'

import { ExerciseEntry } from '../model/ExerciseEntry'
import { CloneRealm } from './CloneRealm'
import { ExerciseSchema } from './Exercise'
import { SetSchema } from './Set'

export class ExerciseEntrySchema implements CloneRealm<ExerciseEntry> {
  public static schema: ObjectSchema = {
    name: 'ExerciseEntrySchema',
    properties: {
      exercise: { type: 'ExerciseSchema' },
      sets: { type: 'SetSchema[]' },
      color: { type: 'string' }
    }
  }

  public cloneRealm = () => {
    const self = this as { [v: string]: any }
    return {
      exercise: (self.exercise as ExerciseSchema).cloneRealm(),
      sets: Array.from(self.sets as SetSchema[]).map(v => v.cloneRealm()),
      color: self.color
    }
  }
}
