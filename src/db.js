/*import { MongoClient } from "mongodb";
 Replace the uri string with your connection string.
const uri = "mongodb+srv://mcallizaya:Cyb3rn3t!c@cluster0.qofexn3.mongodb.net/proyectos_unsxx?retryWrites=true&w=majority";
const uri='mongodb://127.0.0.1/proyectos_investigacion';
const client = new MongoClient(uri);
export const connectDB = async ()=> {
    try {
      await client.connect();
      //await client.db("user").command({ ping: 1 });
    console.log("Conectado a MongoDB! Atlas", );
      
    } catch(error){
        console.log(error);
    }
  }
  //run().catch(console.dir);*/

import mongoose from 'mongoose'

export const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb+srv://mcallizaya:Cyb3rn3t!c@cluster0.qofexn3.mongodb.net/proyectos_unsxx?retryWrites=true&w=majority');
        console.log('DB conectado');
    }catch(error){
        console.log(error);
    }
};
