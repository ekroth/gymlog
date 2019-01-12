export const callback0 = (cb: (() => void) | undefined) =>
  cb ||
  (() => {
    return
  })

export const callback1 = <T>(cb: ((arg1: T) => void) | undefined) =>
  cb ||
  (() => {
    return
  })

export const callback2 = <T, U>(cb: ((arg1: T, arg2: U) => void) | undefined) =>
  cb ||
  (() => {
    return
  })
