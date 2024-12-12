import * as mongoose from 'mongoose'

export interface ChatInterface {
    
    parcipantsEmails: string[]
}

export const ChatSchema = new mongoose.Schema({
    parcipantsEmails:[ { type: String, required: true}]
})

type Chat = mongoose.InferSchemaType<typeof ChatSchema>;

export default mongoose.model<Chat>("Chat", ChatSchema)