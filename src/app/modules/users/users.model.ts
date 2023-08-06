import { Schema, model, Model } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser, IUserMethod } from './users.interface'
import config from '../../../config'
const userSchema = new Schema<IUser, Record<string, never>, IUserMethod>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

type UserModel = Model<IUser, Record<string, unknown>, IUserMethod>

userSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  )
  return user
}

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isPassMatched = await bcrypt.compare(givenPassword, savedPassword)
  return isPassMatched
}

userSchema.pre('save', async function (next) {
  // this represents user
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
