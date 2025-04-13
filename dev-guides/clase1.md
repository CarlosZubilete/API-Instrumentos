Nodejs -> es un entorno de ejecución.

No es compilado , es interpretado (v8).

v8 , es la versión que se esta ejecutando.

Del lado del BackEnd:

- Ejecuta el servicio, el hilo de ejecución ()
  - Muchos programas , muchos procesos.
- Node trabaja con un solo hilo.
- Sistema event loop :

  - Es un hilo aparte, cualquier petición que tardará , se lo asigna.
  - Ventajas con respecto a los recursos.

- PHP no funciona asi. Cuando llega una petición abre el interprete,
  lo compilo , y doy a la respuesta. - por cada peticion , abre un PHP.

LTS -> Lastest Stable

-> -> -> -> -> ->

nvm -> administrador de versiones de node.

-> node --version
-> nvm list
-> nvm use (número de versión)
-> nvm install (numero de version)

Para crear un terminal nueva

<CTRL + SHIFT + B>

[CreateNewTerminalInThisArea]

[Document] en el entorno de Node, no exite.

Node nos porporciona modulos:

- Lo vemos en la API de node.

- OS -> [nodeModel] habla de sistema opertivo en donde se esta ejecutando el scritp.
  `const os = require('node:os');`
  `console.log(os.platform())` // min 32

- Commonjs es el sistema de modulos de node.

  - En la web no sirve `require() ` , no es de js.

- Cada modulo es independiente del uno con el otro.

- Cuando importas modulos , se importan la misma funcion en todos los imports.

"ECMAScript es el nombre del lenguaje de JavaSript"

- Para poder utilizar Nodejs con ECMAScript.
  - Crear un proyecto y a este decirle que vamos a utilizar ECMAScript.
    - npm init:
      - Nombre de proyeco , descripcion, punto de partida ,etc.
      - CTRL + C for quiet.
    - Nos crea un package.json con las caracteristica especificadas.
      - agregamos -> "type":"module"
      - Ok, ahora trabajamos con 'ECMAScript model'
  - Cuando creamos archivos extension .mjs

Cada Archivo js , se considera un Modulo:

- **Exportamos e Importamos modulos**
  ```
  - Funcion x funcion :
  - import {funcion1 ,funcion2 } from './ruta-del/archivo';
    - Usamos directamente.
  - export default funcion1;
  - export default funcion2 ;
  - export {
      funcion1,
      funcion2,
    }
  ```
  - Ejemplo de uso el main.js :
    - funcion1();
    - funcion2();
  ```
  - import Objeto form './ruta-del/archivo';
    - Lo usamos como un objeto
  - export default () {
    funcion1,
    funcion2
  };
  ```
  - Ejemplo de uso el main.js :
  - Objeto.funcion1();
  - Objeto.funcion2();

Pegarle una ojeada a los modulos : API => conjunto de funcionalidades, para que otro programa lo utlice

- Path
- OS (Operation System)
- REPI
- File system.

- famializarse con el objetoj:
  - console de js. (console es un objeto que te lo da el entorno de JavaScript)
- servidos.
- sistemas de archivos.

Los modulos cuando los importas:

- Se importa la misma funcion, en todos los imports.
- Si importa el mimo "modulo"
