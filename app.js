import express from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'


// Creamos una funcion para obtener: 
// !TODOS LOS INSTRUMENTOS: (Inclusive los de baja lógica) 
async function getAllInstrumentos (){
  return fs.readFile(path.resolve('./files/instrumentos.json'))  
    .then((data) => {
      return JSON.parse(data.toString());
    })
    .catch(() => {
      throw Error ('NO SE PUEDE LEER EL ARCHIVO ./files/instrumentos.json')
    })
}

// Cremaos un función para obtener:
// ! Solo los instrumentos activos. 
async function getInstrumentos (){
  const allInstumentos = await getAllInstrumentos();
  
  const instrumentos = allInstumentos.filter((ins) => ins.active == true);
  
  const instrumentosValidos = instrumentos.map((ins) => {
    return {
      "id": ins.id,
      "name": ins.name,
      "price": ins.price,
      "description": ins.description,
      "type": ins.type,
    }
  })

  return instrumentosValidos;
}


// Creamos una funcion para buscar por ID
async function getByID(idInstrumento){
  const instrumentosList = await getInstrumentos();
  
  return instrumentosList.find((elemento) => elemento.id == idInstrumento)
  /* 
    *FIND 
      Ejecuta la función callback una vez por cada índice del array,
      hasta que encuentre uno en el que el callback devuelva un valor verdadero. 
      Si es así, find devuelve inmediatamente el valor del elemento. 
      En caso contrario, find devuelve undefined .
  */
} 

// Agrega un nuevo elemento al final de la lista.
async function addInstrumento(newInstrumento){
  // Obtenemos la lista de los instrumentos
  const instrumentosList = await getAllInstrumentos();
  console.log(newInstrumento)
  // Pusheamos el nuevo instrumento
  instrumentosList.push(newInstrumento);
  // Escribimos el nueva lista 
  return fs.writeFile(path.resolve('./files/instrumentos.json'), JSON.stringify(instrumentosList))
}

// Escrribir en el archivo:
async function setInstrumentos(instrumentosList){
  return fs.writeFile(path.resolve('./files/instrumentos.json'), JSON.stringify(instrumentosList)); 
}


async function deleteByID(idInstrumento){

  const listaInstrumentos = await getAllInstrumentos();

  const instrumentosList = listaInstrumentos.map((elemento) => {
    if ( elemento.id != idInstrumento) return elemento

    return {
      "active": false,
      // !TODO {...elemment}? 
      "id": elemento.id,
      "name":elemento.name,
      "price": elemento.price,
      "description": elemento.description,
      "type":elemento.type
    }
  })

  // return fs.writeFile(path.resolve('./files/instrumentos.json'), JSON.stringify(instrumentosList))
  return setInstrumentos(instrumentosList)
}
/*
  ! GETS... 
*/


const app = express()

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
// ACTUALIZAMOS 
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
  
  const nuevaLista = instrumentosList.map((elemento) => {
    if(elemento.id !== Number(idInstrumento)) return elemento;

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

