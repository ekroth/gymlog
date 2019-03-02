import { ObjectSchema } from 'realm'

import { Exercise } from '../model/Exercise'
import { CloneRealm } from './CloneRealm'

export class ExerciseSchema implements CloneRealm<Exercise> {
  public static schema: ObjectSchema = {
    name: 'ExerciseSchema',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: { type: 'string' },
      color: { type: 'string' }
    }
  }

  public cloneRealm = () => {
    const self = this as { [v: string]: any }
    return {
      id: self.id,
      name: self.name,
      color: self.color
    }
  }
}
