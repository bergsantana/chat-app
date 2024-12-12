import axios from "axios"

export const apiConfig = {
    url: "http://localhost:3000"
}

export interface User {
    email: string, password: string
}

export class ChatAPiService {
    static async register(data: User) {
        const req = await axios.post("/user/register", data, {
            baseURL: apiConfig.url
        }).catch(e => console.log("Erro ao registrar", e))

        return req

    }

    static async login(email: string) {
        const req = await axios.get("/user/login/" + email, {
            baseURL: apiConfig.url
        }).catch(e => console.log("Erro ao registrar", e))

        return req

    }

    static async createContact(data: { "ownerEmail": string, "contactEmail": string }){
        console.log('enviando oq', data)
        const req = await axios.post('/contact/create-contact', data, {
            baseURL: apiConfig.url
        })

        return req

    }

    static async getContacts(email: string){
        const req = await axios.get("contact/owner/"+email, {
            baseURL: apiConfig.url
        })

        return req 
    }

    static async createChat(emails: string[]){
        const req = await axios.post("chats/create-chat", {
            parcipantsEmails: emails
        }, {
            baseURL: apiConfig.url
        })

        return req 
    }

    static async getAllChat(email: string){
        const req = await axios.get("chats/parctipant/"+email, {
            baseURL: apiConfig.url
        })

        return req 
    }

    
}