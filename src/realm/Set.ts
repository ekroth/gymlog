import { ObjectSchema } from 'realm'

import { Set } from '../model/Set'
import { CloneRealm } from './CloneRealm'

export class SetSchema implements CloneRealm<Set> {
  public static schema: ObjectSchema = {
    name: 'SetSchema',
    properties: {
      weight: { type: 'int' },
      reps: { type: 'int' }
    }
  }

  public cloneRealm = () => {
    const self = this as { [v: string]: any }
    return {
      weight: self.weight,
      reps: self.reps
    }
  }
}
