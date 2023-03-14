import { User } from "./user";
import {Type} from "./Type";

export interface Conge {
    id?:number,
    departureDate:Date,
    returnDate:Date,
    type?:String,
    typeObject?:Type,
    user?:String,
    userObject?:User
    validation?:boolean
}