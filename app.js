import express from 'express'
// import fs from 'node:fs/promises'
// import path from 'node:path'
import cors from 'cors'

import {  getAllInstrumentos,
  getInstrumentos,
  getByID,
  addInstrumento,
  setInstrumentos,
  deleteByID} from './funciones.js';

/*
  *GETS... 
*/

const app = express()

// Permite que las peticiones desde otro computador sean respondidas
app.use(cors());

// Midleware : analiza y procesa solicitudes entrantes en formato JSON
app.use(express.json())

// Atendemos la solicitud: 
// http://localhost:9000 
// Normamente en el HOME '/' estan los archivos staticos.
app.get('/',(req,res)=>{
  res.send('Hola mundirijillo')
})

// Atendemos la solicitud: 
// http://localhost:9000/instrumentos
app.get('/api/instrumentos' , (req,res) => {
  getInstrumentos()
    .then((instrumentosList) => {
      res.json(instrumentosList)
    })
})

// Atendemos la solicitud: 
// http://localhost:9000/instrumentos/:idInstrumento
app.get('/api/instrumentos/:idInstrumento', async (req,res)=>{
  // Hay dos formas:
  // 1. const idInstrumento = req.params.idInstrumento;
  const{idInstrumento} = req.params  // 2. 

  // Buscamos el id en la lista de objetos: 
  const instrumento = await getByID(Number(idInstrumento)); 

  if(instrumento) res.json(instrumento);
  else res.status(400).json({mensaje: "Producto no encontrado"})

})


/*
 * POST - PATCH - DELETE 
*/

// Agregamos un objeto a la lista: 
// http://localhost:9000/instrumentos
app.post('/api/instrumentos',async (req,res) => {

  const instrumentosList = await getAllInstrumentos();
  // Creamos un objeto:
  const instrumento = Object ({
    active:true, 
    id: instrumentosList.length + 1 ,
    "name": req.body.name, 
    "price": req.body.price,
    "description": req.body.description,
    "type": req.body.type,
  })

  addInstrumento(instrumento)
    .then(() => {
      res.status(201).json({mensaje: "Instrumento creado con exito"})
    })
    .catch(()=>{
      res.status(304).json({mensaje: "ERROR! Instrumento no creado"})
    })
})

// Atendemos la solicitud: 
// http://localhost:9000/instrumentos/:idInstrumento
// ACTUALIZAMOS // !TODO: el patch solo necesita saber que propiedad se modificaron y acualizar
app.patch('/api/instrumentos/:idInstrumento', async (req,res)=>{
  // 1. Obtenemos el ID
  const {idInstrumento} = req.params;
  // 2. Buscamos el instrumento (underdined si no exite)
  const instrumento = await getByID(Number(idInstrumento)); 

  if(!instrumento) return res.status(404).json({mensaje: `Instrumento ${idInstrumento} No encontrado`});
  // 3. Cremamos un nuevo instrumento a modificar.
  // const nuevoInstrumento = Object({
  //   id: instrumento.id, 
  //   "name": req.body.name, 
  //   "description": req.body.description,
  //   "type": req.body.type,
  //   active: instrumento.active, 
  // ! PREGUNTAR POR SPLICE.
  // })
  
  const instrumentosList = await getAllInstrumentos();
  
  // 
  
  const nuevaLista = instrumentosList.map((elemento) => {
    if(elemento.id !== Number(idInstrumento)) return elemento;

    // !TODO -> desde el front , puede poner espacios vacios o "" -> se lo asinga igual.
    if ( req.body.name === undefined) { req.body.name  =  elemento.name };
    if ( req.body.price === undefined) { req.body.price =  elemento.price };
    if (req.body.description === undefined) {req.body.description = elemento.description};
    if (req.body.type === undefined) {req.body.type = elemento.type};

    return {
      ...elemento,
      "name": req.body.name,
      "price": req.body.price,
      "description": req.body.description,    
      "type": req.body.type,  
    }
  })

  setInstrumentos(nuevaLista)
    .then(() => {
      res.status(200).json({mensaje: `Instrumento ${idInstrumento} Modificado con exito`})
    })
    .catch(() => {
      res.status(400).json({mensaje: "Producto no encontrado"})
    })
})

// BAJA LOGICA.
app.delete('/api/instrumentos/:idInstrumento', async(req,res) =>{
  
  const{idInstrumento} = req.params;

  const id = Number(idInstrumento)
  const instrumento = await getByID(id); 

  if(!instrumento) return res.status(404).json({mensaje: `Instrumento ${id} No encontrado`});
    
  deleteByID(id)
    .then(()=>{
      res.status(204).json({mensaje: `DELETE EXITOSO`})
    })
    .catch(()=>{
      // 500 Error interno del servidor, un código general que indica que algo salió mal en el servidor 
      res.status(500).json({mensaje: `ERROR DEL SERVIDOR`})
    })
   

  /* 
    1. Tengo dos opciones, lo identifico por el ID o
      lo identifico por su pocisión. 
    2. Una vez intendificado , tengo que darlo de baja logica
      en el array original.
      { valido: false, 
       ... elemento.}
  */

})

// Escuchamos el puerto
app.listen(9000, ()=> {
  console.log('Escuchando el puerto http://localhost:9000')
})

