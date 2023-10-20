import mongoose from "mongoose";
import userSchema from "./models/user.model.js";
import enviarMail from "./email.js";

const uri =
  "mongodb+srv://mcallizaya:Cyb3rn3t!c@cluster0.qofexn3.mongodb.net/proyectos_unsxx?retryWrites=true&w=majority";

// Definir el esquema del modelo de usuario
const usuarioSchema = new mongoose.Schema({
  // Define la estructura del documento de usuario aquí
  // Por ejemplo, puedes tener propiedades como nombre, correo, etc.
});

// Crear el modelo de usuario
const Admin = userSchema;
const imprimirDocumentos= async()=> {
    try {
      // Conectarse a la base de datos
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Consultar y obtener todos los documentos de la colección
      const admins = await Admin.find({}, "email notification");
      //console.log(admins);
      if (admins.length > 0) {
        // Imprimir los correos en la consola
        console.log('Correos de la colección "Admin":');
        admins.forEach(admin => {
          console.log((admin.email));
          console.log(admin.notification);
          const correo=admin.email;
          if(admin.notification){
            enviarMail(correo);
          }
        });
      } else {
        console.log('No se encontraron documentos en la colección "Admin".');
      }
    }catch(error){
      console.log(error);
    }
  };
  export default imprimirDocumentos;