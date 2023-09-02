import app from "./app.js"
import { connectDB } from "./db.js"

connectDB();


app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'));
console.log(`Servidor en puerto ${app.get('port')}`);