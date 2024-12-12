import * as mongoose from 'mongoose'

export interface ContactInterface {
    ownerEmail: string
    contactEmail: string
}

export const ContactSchema = new mongoose.Schema({
    ownerEmail: { type: String, required: true },
    contactEmail: { type: String, required: true}
})

type Contact = mongoose.InferSchemaType<typeof ContactSchema>;

export default mongoose.model<Contact>("Contact", ContactSchema)