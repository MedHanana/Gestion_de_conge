export interface User
{
    id?:number,
    name: String,
    email: String,
    adress: String,
    password: String,
    roles?: [String],
    solde?:number
    create_at?:Date
    updated_at?:Date

}

