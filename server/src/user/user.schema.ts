import * as mongoose from 'mongoose'

export interface UserInterface {
    email: string
    password: string
}

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
})

type User = mongoose.InferSchemaType<typeof UserSchema>;

export default mongoose.model<User>("User", UserSchema)