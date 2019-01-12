export const callback0 = (cb: (() => void) | undefined) => {
  if (cb !== undefined) {
    cb()
  }
}

export const callback1 = <T>(cb: ((arg1: T) => void) | undefined, arg1: T) => {
  if (cb !== undefined) {
    cb(arg1)
  }
}

export const callback2 = <T, U>(
  cb: ((arg1: T, arg2: U) => void) | undefined,
  arg1: T,
  arg2: U
) => {
  if (cb !== undefined) {
    cb(arg1, arg2)
  }
}
