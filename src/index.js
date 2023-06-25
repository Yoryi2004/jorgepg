// 1 importar módulos terceros
const express = require ("express");
import {Route} from "./router/index"
import cors from "cors"
// 2. declarar variables auxiliares
const PORT = process.env.PORT || 4000;

// 3. inicializando express 
let app= express();
//explicar 
//todo el mundo (*)
app.use(cors());
//7. habilitar json en body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1",Route);

// 4. levantar el servidor express
app.listen(PORT,()=>{
console.log(`servidor levantado en el puerto ${PORT}`);
})