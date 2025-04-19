import fs from 'node:fs/promises';
import path from 'node:path';
import cryto from 'node:crypto';


// 1. !Obtenemos la lista, y fitlramos!  
async function getInstruments({ isDeleted = true} = {}) {
  return fs.readFile(path.resolve('./','data/instruments.json'))
    .then((data) => JSON.parse(data)) // parsesamos cadenas de objetos a valores de objetos.. 
    .catch((err) => []) // En caso de error retorna un array vacio
    .then((instrumentsList) => {
      if(isDeleted) return instrumentsList; // retorna todos los instrumentos 
      return instrumentsList.filter((element) => element.isDeleted === undefined);
    })
}

// 2. ¡Obtenemos un instrumentos por ID!
async function getInstrumentByID(id){
  const instrumentList = await getInstruments({isDeleted:false});
  return instrumentList.find((element) => element.id === id);
}

// 3. ¡ Agregamos un instrumento a la lista de instrumentos ! 
async function addInstrument(instrument){
  const instrumentList = await getInstruments(); // Todos los instrumentos 
  
  // error crea un id de más 
    // const newInstrument = new Object({...instrument, id:cryto.randomUUID()}); 
  const newInstrument = {...instrument, id:cryto.randomUUID()} ;

  // instrumentList.push({...instrument, id:cryto.randomUUID()});
  instrumentList.push(newInstrument);

  await setInstruments(instrumentList);

  return newInstrument;
}


// 4. Escribimos la lista en un archivo
async function setInstruments(instrumentosList){
  return fs.writeFile(path.resolve('./' , 'data/instruments.json'), JSON.stringify(instrumentosList)); 
}


async function updateInstrument(changes,id) {
  const instrumentosList = await getInstruments(); // Obtenemos todos los instrumentos

  const index = instrumentosList.findIndex(element => element.id === id)

  if (index === -1 ) return false; 

  instrumentosList[index] = {...instrumentosList[index], ...changes, id};
  
  await setInstruments(instrumentosList);

  return true;
}


export {
  updateInstrument,
  getInstrumentByID,
  getInstruments,
  addInstrument,
}

