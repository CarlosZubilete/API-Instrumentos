**Declaracion de una Clase**

- Clase Name {} , sin los parentesis.
- Dentro de ella declaramos el constructor (palabra reservada)
  ```
  constructor(){
    this.valorA = 1 ;
    this.valorb = 2 ;
  }
  ```

**Creacion de un objeto de una clase**

```
let objetoName = new ClaseName ()
```

**Servidores Web**

- Cuando uno tiene un servidor, este es el hilo (proceso principa),donde van a
  llegar todas las peticiones.

  _Arquitectura cliente servidor._

  - Cliente: envia solicitudes -> request
  - Servidor: atiende o ejecuta las solicitudes -> response

  - Servidor: Identidicado por 3 cosas (IP , Protocolo y Puerto).

  - IP es la computadora fisica donde le llegan las solicitudes del Cliente y se ejecutan
    los servicios.

    - ipconfig en la terminal. (ip de nuestra computadora)
    - ipv6 -> sistema hexadecimal 0 -> F
    - ipv4 -> 4 octetos , desde el 0 hasta 256
    - IP no puede repetirse.

  - Protocolo (Reglas): manera/forma en la que se van a comunicar entre el Servidor y el Cliente.

    - HTTP , protocolo de internet/web , sigue una serie de reglas. Para poder acceder a un servidor web , necesitamos entender el protocolo HTTP
      - DNS: cuando accedes una web , pones el Dominio esta llama al DNS , que tranforma el Dominio en IP. Lo que hace : es qué dominio es qué IP.
        - terminal: ping www.google.com.ar [xxxxxxxxxxxx (IP de google)]
    - HTTPS, mas seguro e incriptado.

  - Puerto, local de la pc , donde estan el servicio a cual queremos acceder. Una computadora tiene muchos servicios. Se conecta al ip de la pc y luego al un puerto local.

  - Para redondar, para poder comunicarte con un servicio de una computadora : IP , el puerto y el protocolo.

    - Estructura de una URL web:
      - Protocolo // IP: Puerto
      - HTTPS//www.google.com:80

  - **Crear un servidor web**

- Un servicio que entienda el protocolo HTTP
- npm init -y // pack.json con las cosas por defecto.
- Servidor HTTP

  - Obtener el protocolo HTTP
  - Node exite un objeto HTTP

  ```
    import http from 'node:http' // importamos el modulo
  ```

  - Una vez que obtengamos el modulo , creamos el servidor.

    ```
    cont app = http.createServer() // recibe todas las peticiones.
    ```

    - Recibe una fx, se va ejecutar por cada una de las peticiones que van llegar.
    - Para poder enviar una respues la fx recibe dos paramtros.
      - request
      - response
        - response.write("HOLA MUNDO") // respuesta a la peticion.
        - response.write(request.url) // retorna lo que usario escribio
        - response.end() // finaliza la peticion , ya no se queda esperando o en loading ...

    ```
      // escucha un puerto particular
      app.Listen(3000,=>{
        console.log('Conectamos al puerto con exito')
      })

    ```

    - Listen(_numero de puerto_, _CallBack_ => ejecuta una vez conectado el servidor) ,
    - Ejecutamos a la tarminal. node nombrarchivo ./servidorHttp.js
      // funciona con power shell.
      // con Run Code si.

    - En la urlweb:
      - http://localhost:3000
        - localhost -> es un puerto local
        - se queda esperando , le enviamos una peticion (request), pero no hay una response.
    - Supongamos que ponemos otra url, con el mismo puerto:

          - http://localhost:3000/miweb
          - http://localhost:3000/miweb/contactos
            // se ejecuta la misma respuesta a esa peticion del puerto.

            ```
              const app = http.createServer((request,response)=>{

              console.log('Recibi una peticion!')

              // (resquest.url) -> captamos lo que escribio el usuario.
                if(request.url === '/miweb'){
                // cada vez que acceda a: http://localhost:3000/miweb
                  response.write(`
                  <h1> Bienvenido a mi web </h1>
                        <p> Estas en otro URL</p>`
                  )
                }

                response.end() // Finaliza la peticion.
              })
            ```

_Importamos un archivo html_

```
  // importamos las promesas  modulo fileSystem
  import fs from 'node:fs/promises';

  // creamos el seridor
  const app = http.createServer((request,response)=>{
    console.log('Recibi una peticion!')

      if(request.url === '/miweb'){
        // readFile -> Fx asincronica
        fs.readFile('miWeb.html')
          .then((data)=>{
            console.log('Leyo con exito') // muestra en mensaje.
            response.write(data.toString())
          })
          .catch(()=>{
            response.write('Error al intentar leer la pagina')
          })
      }

      response.end() // Finaliza la peticion.
  })
```

- fs devuelve un buffer , lo tenemos que tranformar a texto con .toString()
- el data de fs , viene incorporado
  _NO LO EJECUTA , pero muestra el mensaje_

  - El problema es que cuando lee el archivo, lo ejecuta de manera asincronica (espera la promesa).
    Despues con 'response.end()' finaliza el problema.

  _Solución_

  ```
    // creamos el seridor
    const app = http.createServer((request,response)=>{
      console.log('Recibi una peticion!')

      if(request.url === '/miweb'){
        fs.readFile('miWeb.html')
          .then((data)=>{
            console.log('Leyo con exito')
            response.write(data.toString())
          })
          .catch(()=>{
            response.write('Error al intentar leer la pagina')
          })
          .finally(()=>{
            // Solucion!
            response.end() // Finaliza la peticion.
          })
      }
    })
  ```

  _Podemos volverlo sincronico con await, mala practica_

  - solo en casos especificos usamos el await.

  ```
    const app = http.createServer(async(request,response)=>{
      if(request.url === '/miweb'){
        await fs.readFile('miWeb.html')
          .then((data)=>{
            console.log('Leyo con exito')
            response.write(data.toString())
          })
          .catch(()=>{
            response.write('Error al intentar leer la pagina')
          })
          .finally(()=>{
            // Solucion!
            response.end() // Finaliza la peticion.
          })
      }
    })
  ```

**Marcos de trabajo**

- Framework , espacio de trabajo para solucionar un problema especifico:

  - Conjunto de herramiento + un espacio de trabajo + una metodologia
  - Libreria solo brinda herramientas de trabajo. (React)

_Express.js_

- Framework , muy utilizado
- Instalarlo:
  - Terminal:
    - npm install express
  - Agrega una codigo en
    - package.json:
      dependencies:{
      "express": "version"
      }
    - Un archivo package-lock.json.
    - una carpeta node_modules (dependencias de express)

_Crear servidor utilizando express_

```
  // importamos el modulo. (sin 'node' por delante)
  import express from 'express';

  // crear el servidor:
    const app = express();

  // escuchamos el puerto
  app.listen(3000, () => {
  console.log('Servidor levantado de Express! http://localhost:3000');
  })

```

- En la terminal: node ./serverExpress.js
  - Ya no se encuentra cargando la pag ... ahora:
  - cannot GET/ , indica que no se pudo encontrar la solicitud.

_Enviamos una respuesta_

```
  app.get('/' , (request, response) => response.send('Soy una respuesta a la solicitud :) !'))

```

_Enviamos una respuesta con un archivo html_

```
  // atendemos a otra peticion, enviando un domumento (necesitamos el modulo path)
  import path from 'node:path';

  // http://localhost:3000/miweb
  app.get('/miweb' , (request,response) => {
    response.sendFile(path.resolve('./miWeb.html'))
  })
```

- path.resolve() resulve la forma relativa , lo comvierte en absoluto, desde el directorio
  en que los estamos ejecutando

_metodo use()_

```
  app.use('/' , expresee.static('public))
```

- Recibe un objeto , que es un midwar : un intemediario, que se ejecuta cuando llega la peticion y
  antes que lo ejecute la funcion
  - por ejemplo, podemos indicarle que 'antes de enviar un documento , verifique que este existe.'
- '/' , indica la ruta principal, es decir antes de verificar si hay un get que responda a
  dicha solicitud , primero buscara en la carpeta public,
- funcion: express.static('public') -> le indicamos que en la carpeta 'public' estarán los archivos
  estaticos

- Ahora no necesitamos modulo para indicarle la ruta absoluta, porque use() , devolvera todos los
  documentos o archivos que se encuentren el la carpeta 'public'

  _en el navegador_ : http://localhost:3000/miWeb.html

- Todas las framewoork de servidores web tiene el objeto midwar, ya que nos permite analizarlo antes
  de que llegen a las peticiones.
- root: el archivo que es esta ejecutando,

**Creacion de Appis**

_Node para hacer pag dinamicas_

- Para hacer pag web con node:
- Dos sistemas de templates.
- pug
- ejs

```

```
