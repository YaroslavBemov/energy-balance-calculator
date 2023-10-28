import { gender } from './types'

// gender: 1 - мужчина, 0 - женщина
export const getActivityRatio = (gender: gender, lifestyle: string): number => {
  if (gender === '1') {
    if (lifestyle == '2') {
      return 1.11
    } else if (lifestyle == '3') {
      return 1.25
    } else if (lifestyle == '4') {
      return 1.48
    }
  } else {
    if (lifestyle == '2') {
      return 1.12
    } else if (lifestyle == '3') {
      return 1.27
    } else if (lifestyle == '4') {
      return 1.45
    }
  }

  return 1
}
