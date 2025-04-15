import fs from 'node:fs/promises';
import path from 'node:path'


// 1.Creamos una funcion para obtener: 
// !TODOS LOS INSTRUMENTOS: (Inclusive los de baja lógica) 
async function getAllInstrumentos (){
  return fs.readFile(path.resolve('./data/instrumentos.json'))  
    .then((data) => {
      return JSON.parse(data.toString());
    })
    .catch(() => {
      throw Error ('NO SE PUEDE LEER EL ARCHIVO ./files/instrumentos.json')
      // puede retornar un Array vacio.
    })
}


// 2.Cremaos un función para obtener:
// ! Solo los instrumentos activos. 
async function getInstrumentos(){
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


// 3. Creamos una funcion para buscar por ID
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


// 4. Agrega un nuevo elemento al final de la lista.
async function addInstrumento(newInstrumento){
  // Obtenemos la lista de los instrumentos
  const instrumentosList = await getAllInstrumentos();
  console.log(newInstrumento)
  // Pusheamos el nuevo instrumento
  instrumentosList.push(newInstrumento);
  // Escribimos el nueva lista 
  // !return fs.writeFile(path.resolve('./data/instrumentos.json'), JSON.stringify(instrumentosList))
  return setInstrumentos(instrumentosList);
}

// 5. Escribimos la lista en un archivo
async function setInstrumentos(instrumentosList){
  return fs.writeFile(path.resolve('./data/instrumentos.json'), JSON.stringify(instrumentosList)); 
}

// 6. Eliminamos un archivo, pero de manera lógica. 
async function deleteByID(idInstrumento){

  const listaInstrumentos = await getAllInstrumentos();

  const instrumentosList = listaInstrumentos.map((elemento) => {
    if ( elemento.id != idInstrumento) return elemento

    return {
      // "active": false,
      // ...elemento -> lo pone en true otra vez... 

      ... elemento, // copiamos todos las propiedaes y pisamos solo active.
      "active":false,
    }
  })

  // return fs.writeFile(path.resolve('./files/instrumentos.json'), JSON.stringify(instrumentosList))
  return setInstrumentos(instrumentosList)
}


export {
  getAllInstrumentos,
  getInstrumentos,
  getByID,
  addInstrumento,
  setInstrumentos,
  deleteByID
}

