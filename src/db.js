import mongoose from "mongoose";


//run().catch(console.dir);*/

//import mongoose from 'mongoose'

export const connectDB = async()=>{
  try{
      await mongoose.connect('mongodb+srv://mcallizaya:Cyb3rn3t!c@cluster0.qofexn3.mongodb.net/proyectos_unsxx?retryWrites=true&w=majority');
      console.log('DB conectado');
  }catch(error){
      console.log(error);
  }

};
