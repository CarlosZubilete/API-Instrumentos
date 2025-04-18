import express from 'express'
import cors from 'cors'

import {
  updateInstrument,  
  getInstruments,
  getInstrumentByID,
  addInstrument} from './funciones.js';

/*
  *GETS... 
*/

// Midleware : analiza y procesa solicitudes entrantes en formato JSON
const app = express()
app.use(express.json())
// Permite que las peticiones desde otro computador sean respondidas
app.use(cors());


// Atendemos la solicitud: 
// http://localhost:9000 
// Normamente en el HOME '/' estan los archivos staticos.
app.get('/',(req,res)=>{
  res.send('Hola mundirijillo')
})

// Atendemos la solicitud: 
// http://localhost:9000/instruments
app.get('/instruments' , async(req,res) => {
  const instrumentsList = await getInstruments({isDeleted:false});
  res.json(instrumentsList)
})

// Atendemos la solicitud: 
// http://localhost:9000/instrumentos/:idInstrumento
app.get('/instruments/:id', async (req,res)=>{
  // Hay dos formas:
  // 1. const idInstrumento = req.params.idInstrumento;
  const{id} = req.params  // 2. 

  // Buscamos el id en la lista de objetos: 
  const instrumento = await getInstrumentByID(id); 

  if(instrumento) res.json(instrumento);
  else res.status(400).json({mensaje: "Resource has not found"});

})


/*
 * POST - PATCH - DELETE 
*/

// Agregamos un objeto a la lista: 
// http://localhost:9000/instruments
app.post('/instruments',async (req,res) => {

  const instrument = await addInstrument({
    name: req.body.name, 
    price: req.body.price,
    description: req.body.description,
    type: req.body.type 
  })

  //if(instrument) return res.status(201).json({mensaje:`Recurso creado: \n ${JSON.stringify(instrument,null,2)}`})
  if(instrument) return res.status(201).json({menssage: "¡Created resource successfully!"})
  return res.status(304).json({mensaje: "ERROR! Resource couldn't create"})

})

// Atendemos la solicitud: 
// http://localhost:9000/instrumentos/:idInstrumento
// ACTUALIZAMOS // !TODO: el patch solo necesita saber que propiedad se modificaron y acualizar
app.patch('/instruments/:id', async (req,res)=>{
  // 1. Obtenemos el ID
  const {id} = req.params;
  // 2. Buscamos el instrumento (underdined si no exite)
  const instrumento = await getInstrumentByID(id);

  if(!instrumento) return res.status(404).json({mensaje: "Resource has not found"});
  
  //  Averiguar cual propiedad fue cambiada, 
  //  y setearle un objeto. con las propiedades cambiadas... 

  if (!req.body.name) { req.body.name  =  instrumento.name };
  if (!req.body.price) { req.body.price =  instrumento.price };
  if (!req.body.description) {req.body.description = instrumento.description};
  if (!req.body.type) {req.body.type = instrumento.type};

  const newInstrument =  await updateInstrument({
    name: req.body.name, 
    price: req.body.price,
    description: req.body.description,
    type: req.body.type 
  },id);
  
  if (newInstrument) return  res.status(201).json({menssage: "Resource has benn modificated successfully!"})

  return res.status(304).json({mensaje: "ERROR! Resource couldn't modificated"})
 
})

// Eiminación lógica.
app.delete('/instruments/:id', async(req,res) =>{
  
  const{id} = req.params;

  const instrumento = await getInstrumentByID(id); 

  if(instrumento === undefined) return res.status(404).json({mensaje: "Resouce has not found"});
    
  const isDeleted = await updateInstrument( { isDeleted:true } ,id)

  if(isDeleted) return res.status(202).json({mensaje:"Resouce has been deleted"}) 

  return res.status(404).json({mensaje:"Resouce has not found"})
})

// Escuchamos el puerto
app.listen(9000, ()=> {
  console.log('Escuchando el puerto http://localhost:9000')
})

