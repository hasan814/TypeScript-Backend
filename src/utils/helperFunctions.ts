import { genSaltSync, hashSync } from "bcrypt"

export const HashString = (data: string): string => {
  const salt: string = genSaltSync(10)
  const hashedString: string = hashSync(data, salt)
  return hashedString
}