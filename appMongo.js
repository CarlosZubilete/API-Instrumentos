import { MongoClient, ObjectId } from "mongodb";
import express from 'express';
import Joi from 'joi';

const client = new MongoClient('mongodb://127.0.0.1:27017/');

const app = express(); 
// Middleware para parsear JSON
app.use(express.json());

let db;


const schemaInstrument = Joi.object({
  name: Joi.string().min(3).max(20).required().messages(
    {'any.required': "El nombre es requerido"}),
  price: Joi.number().positive().precision(2).required().messages(
    {'any.required' : "El precio es requerido"}),
})

function validateData(req,res,next){
  const { error, value} = schemaInstrument.validate(req.body);
  if(error){
    return res.status(400).json({message: error.details[0].message , error});
  }
  req.body = value;
  next();
}

// Conectar una vez, al iniciar el servido
client.connect()
  .then((client)=>{
    console.log('We are connecting to the Data Base Mongo :)');  
     db = client.db('DB_Instrumentos')
    app.listen(9000,()=> console.log('Servidor en http://localhost:9000'))
  })
  .catch((err)=>{
    console.log('Something was bad ',err);
  })

/**FUNCIONES */

// OBTENER LOS INSTRUMENTOS:
async function getInstruments (){
  return db.collection('Instrumentos').find().toArray();
}

async function getInstrumentByID(id){
  return db.collection('Instrumentos').findOne({_id: new ObjectId(id)})
}
// AGREGAR UN INSTRUMENTO: 
async function addInstrument(instrument) {
  return db.collection('Instrumentos').insertOne(instrument);

} 

async function updateInstrument(changes,id) {
  // Obtenemos todos los instrumentos
  // Obtenemos el index. 
  return db.collection('Instrumentos').updateOne({_id :  new ObjectId(id)},{
    $set:changes 
  })
}
/**FIN FUNCIONES */


app.get('/', (req,res ) => {
  res.send('Hello world');
})

// Uso de la connexion de la ruta.
app.get('/instruments' ,async (req,res)=>{
  //res.send({ message:'Hola mundirijillo' })

  const documento = await getInstruments()
  
  if(documento) res.json(documento); 
  else res.status(400).json({message: 'Resource has not found'})

})

// Agregamos un instrumento
app.post('/instruments' , validateData ,async (req,res) => {

  const result  = await addInstrument(req.body);

  if(result.acknowledged) return res.status(201).json({message: "¡Created resource successfully!", id: result.insertedId})
    return res.status(304).json({message: "ERROR! Resource couldn't create"})
})

// Buscamos un isntrumentos
app.get('/instruments/:id', async (req,res) => {
  const{id} = req.params;

  const documento = await getInstrumentByID(id);

  if(documento) res.json(documento);
  else res.status(400).json({mensaje: "Resource has not found"});
})


// Editamos un intrument
app.patch('/instruments/:id', async (req,res) => {

  const{id} = req.params;

  // Obntemos el documento a modificar...
  const documento = await getInstrumentByID(id);

  if(!documento) return res.status(404).json({mensaje: "Resource has not found"});

  /* Validamos is hay algun cambio...*/
  if (!req.body.name) { req.body.name  =  documento.name };
  if (!req.body.price) { req.body.price =  documento.price };

  const newDocument = await updateInstrument({
    name: req.body.name, 
    price: req.body.price,
  },id)
  
  if(newDocument) return res.status(201).json({menssage: "Resource has benn modificated successfully!"})

  return res.status(304).json({mensaje: "ERROR! Resource couldn't modificated"})

})
  
  
//Eliminamos un documento(logicamente)
app.delete('/instruments/:id', async (req,res) => {
  const{id} = req.params;

  // Obntemos el documento a modificar...
  const documento = await getInstrumentByID(id);

  if(!documento) return res.status(404).json({mensaje: "Resource has not found"});

  /* Validamos is hay algun cambio...*/
  if (!req.body.name) { req.body.name  =  documento.name };
  if (!req.body.price) { req.body.price =  documento.price };

  const newDocument = await updateInstrument({
    name: req.body.name, 
    price: req.body.price,
    isDeleted:true
  },id)
  
  if(newDocument) return res.status(201).json({menssage: "Resource has benn deleted successfully!"})

  return res.status(304).json({mensaje: "ERROR! Resource couldn't deleted"})
})

/*
!TODO: para validar un nuevo instrumento e actualizar , usamos el mimo esquema de validación?
TODO: 1. Filtrar los documento -> isDeleted: underfined.
TODO: 2. Patch y delete son casi lo mismo, bucar la manera de modularizarlos.
*/

