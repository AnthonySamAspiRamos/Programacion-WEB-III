//                 PRACTIA 1
// Nombre: Aspi Rasmoa, Anthony Sam
//
// JAVA SCRIPT
//
/* 1.- Crear una función que cuente cuántas veces aparece cada vocal en un texto y devuelva el
 * resultado en un objeto.
*/
const vocal = (x) =>{
    const textmin= x.toLowerCase();
    const voc=`aeiou`;
    const res={};
    for(let voca of voc){
        res[voca]=0;
    }
    for(let letra of textmin){
        if(voc.includes(letra)){
            res[letra]++;
        }
    }
    return res
};

let obj = vocal("euforia");
console.log(obj);
/* 2.- Crear una función que invierta el orden de las palabras en una frase.
*/
const inv = (x) =>{
    let invert=``;
    for(let letra=x.length-1; letra>=0;letra--){
        invert += x[letra];
    }
    return invert
};
let cad= inv("abcd");
console.log(cad);
/* 3.- Crear una función que reciba un arreglo de números y devuelva en un objeto a los pares
 * e impares:
*/
const parimp = (x) =>{
    const res={pares:[],impares:[] };
    for(let n in x){
        if(n%2===0){
            res.pares.push(n);
        }
        else{
            res.impares.push(n);
        }
    }
    return res;
}
let obj2=parimp([1,2,3,4,5]);
console.log(obj2);

/* 4.- Crear una función que reciba un arreglo de números y devuelva el número mayor y el
 * menor, en un objeto.
*/
const maymen =(x)=>{
    const res={mayor: 0, menor: x[0]};
    console.log(x[0]);
    for(let i=0; i<x.length;i++){
        if(x[i] > res.mayor){
            res.mayor = x[i];
        }
        if(x[i] < res.menor){
            res.menor = x[i];
        }
    }
    return res;
}
let obj3 = maymen([3,1,5,4,2]);
console.log(obj3); 
/* 5.- Crear una función que determine si una cadena es palíndromo (se lee igual al derecho y
 * al revés).
*/
const palin = (x) => {
    const limp=x.toLowerCase();
    for( let i=0; i<limp.length / 2; i++){
        if(limp[i]!==limp[limp.length-1-i]){
            return false;
        }
    }
    return true;
}
let band = palin("oruro");
console.log(band) // true
let band2 = palin("hola");
console.log(band2) // false

/* 6.- Tomar los dos primeros elementos de un arreglo y almacenarlos en dos variables
 * mediante desestructuración.
*/

const primseg = (x) =>{
    const [prim, seg]= x;
    return {prim, seg};
}
const res= primseg([100,200,300,400]);
console.log(res);
/* 7.- Almacenar el resto de los elementos de un arreglo sin tomar en cuenta los dos primeros
 * elementos de un arreglo, mediante desestructuración
*/
const rest = (x) =>{
    const [prim, seg, ...rest]=x
    return rest;
}
const res2 = rest([100,200,300,400,500,600]);
console.log(res2);

// CALLBACK Y PROMESAS EN JS
/* 8.- Realizar un código para ejecutar una función callback después 2 segundos.
*/
const prueba = () =>{
    console.log("Esto se ejecuto despues de 2 segundos");
}
 const retr = (callback) => {
    setTimeout(() => {
        callback();
    }, 2000);
};

retr(prueba);
/* 9.- Crear una promesa que devuelva un mensaje de éxito después de 3 segundos.
*/
const promExito = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Éxito: La operación se completó después de 3 segundos.");
  }, 3000);
});
promExito.then(mensaje => {
  console.log(mensaje);
}).catch(error => {
  console.error("Error:", error);
});

/* 10.- ¿Cuando es conveniente utilizar un callback, y cuando es necesario utilizar una
 * promesa?
 * Respuesta:
 * Los callbacks y promesas depende del tipo de tarea asincrónica, la complejidad del flujo, 
 * y el manejo de errores que necesita.
 * - El CallBack es necesario utilizarlo cuando: 
 * La operaion es muy simple o sincronica simulada, no necesita encadenar multiples tareas asincronicas
 * - La promesa es necesario utilizarlo cuando: 
 * La operación es asincrónica real, cuando quieres encadenar varias operaciones asincrónicas de forma clara.
*/
/* 11.- Proporcione un ejemplo concreto de encadenamiento de promesas
 * En el siguiente ejemplo simulamos una creacionde una cuenta email, obtencion del perfin y enviar un email al perfil
*/
function crearUsuario() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Usuario creado.");
      resolve({nombre: "Juan" });
    }, 4000);
  });
}

function obtenerPerfil(usuario) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Perfil obtenido para:", usuario.nombre);
      resolve({ ...usuario, perfil: "Estándar" });
    }, 1000);
  });
}

function enviarEmail(usuarioConPerfil) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Email enviado a ${usuarioConPerfil.nombre}`);
      resolve("Proceso completado");
    }, 1000);
  });
}

// Encadenamiento de promesas
crearUsuario()
  .then(usuario => obtenerPerfil(usuario))
  .then(usuarioConPerfil => enviarEmail(usuarioConPerfil))
  .then(resultadoFinal => console.log(resultadoFinal))
  .catch(error => console.error(" Error en el proceso:", error));

/* 12.- Proporcione un ejemplo concreto donde el anidamiento de callbacks se puede
 * reescribir mejor con async/await haciendo el código más limpio y mantenible.
 * 
 Ejemplo con anidamiento de callbacks

Supongamos que estamos trabajando con tres funciones asincrónicas simuladas con setTimeout:

Obtener usuario

Obtener publicaciones del usuario

Obtener comentarios de la primera publicación

function obtenerUsuario(callback) {
  setTimeout(() => {
    console.log("Usuario obtenido");
    callback({ id: 1, nombre: "Carlos" });
  }, 1000);
}

function obtenerPublicaciones(idUsuario, callback) {
  setTimeout(() => {
    console.log("Publicaciones obtenidas");
    callback([{ id: 101, titulo: "Mi primer post" }]);
  }, 1000);
}

function obtenerComentarios(idPublicacion, callback) {
  setTimeout(() => {
    console.log( Comentarios obtenidos");
    callback(["Buen post", "Muy interesante"]);
  }, 1000);
}

// Callback Hell
obtenerUsuario((usuario) => {
  obtenerPublicaciones(usuario.id, (publicaciones) => {
    obtenerComentarios(publicaciones[0].id, (comentarios) => {
      console.log("Resultado final:", comentarios);
    });
  });
});

 * Reescrito con async/await
*/
function obtenerUsuario() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(" Usuario obtenido");
      resolve({ id: 1, nombre: "Carlos" });
    }, 7000);
  });
}

function obtenerPublicaciones(idUsuario) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Publicaciones obtenidas");
      resolve([{ id: 101, titulo: "Mi primer post" }]);
    }, 1000);
  });
}

function obtenerComentarios(idPublicacion) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Comentarios obtenidos");
      resolve(["Buen post", "Muy interesante"]);
    }, 1000);
  });
}

async function ejecutarProceso() {
  try {
    const usuario = await obtenerUsuario();
    const publicaciones = await obtenerPublicaciones(usuario.id);
    const comentarios = await obtenerComentarios(publicaciones[0].id);
    console.log("Resultado final:", comentarios);
  } catch (error) {
    console.error("Error en el proceso:", error);
  }
}

ejecutarProceso();

/* 13.- Proporcione un ejemplo concreto donde el anidamiento de promesas se puede
 * reescribir mejor con async/await haciendo el código más limpio y mantenible
 * Supongamos que tenemos tres funciones asincrónicas:
 * -iniciarSesion()
 * -obtenerPerfil()
 * -obtenerHistorial()
 * NOTA: cada una depende del anterior
*/
function iniciarSesion() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Sesión iniciada");
      resolve({ userId: 42 });
    }, 10000);
  });
}

function obtenerPerfil(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Perfil obtenido");
      resolve({ userId, nombre: "María" });
    }, 1000);
  });
}

function obtenerHistorial(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Historial cargado");
      resolve(["Item 1", "Item 2", "Item 3"]);
    }, 1000);
  });
}

// Anidamiento de promesas
/*
iniciarSesion()
  .then(usuario => {
    return obtenerPerfil(usuario.userId);
  })
  .then(perfil => {
    return obtenerHistorial(perfil.userId);
  })
  .then(historial => {
    console.log("Historial del usuario:", historial);
  })
  .catch(error => {
    console.error("Error:", error);
  });
  */
 // con async/await
 async function cargarDatosUsuario() {
  try {
    const usuario = await iniciarSesion();
    const perfil = await obtenerPerfil(usuario.userId);
    const historial = await obtenerHistorial(perfil.userId);
    console.log("Historial del usuario:", historial);
  } catch (error) {
    console.error("Error:", error);
  }
}

cargarDatosUsuario();

/* 14.- Proporcione un ejemplo para convertir una promesa en un callback.
 * 
*/
function obtUs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = true;
      if (exito) {
        resolve({ id: 1, nombre: "Juan" });
      } else {
        reject("No se pudo obtener el usuario");
      }
    }, 13000);
  });
}

function obtUsCall(callback) {
  ObtUs()
    .then((usuario) => {
      callback(null, usuario);
    })
    .catch((error) => {
      callback(error);
    });
}

// Uso:
ObtUsCall((error, usuario) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Usuario obtenido:", usuario);
  }
});

/* 15.- Proporcione un ejemplo para convertir un callback en una promesa.
*/
function leerArchivo(ruta, callback) {
  setTimeout(() => {
    if (!ruta) {
      callback("Ruta no válida", null);
    } else {
      callback(null, "Contenido del archivo en " + ruta);
    }
  }, 14000);
}

// Uso tradicional:
leerArchivo("archivo.txt", (error, contenido) => {
  if (error) {
    console.error(error);
  } else {
    console.log(contenido);
  }
});

function leerArchivoPromesa(ruta) {
  return new Promise((resolve, reject) => {
    leerArchivo(ruta, (error, resultado) => {
      if (error) {
        reject(error);
      } else {
        resolve(resultado);
      }
    });
  });
}
// Uso con async/await:
async function main() {
  try {
    const contenido = await leerArchivoPromesa("archivo.txt");
    console.log("Resultado:", contenido);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();

/* 16.- Proporcione un ejemplo para migrar una función con promesas a async/await.
*/
function obtenerDatos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = true;
      if (exito) {
        resolve("Datos recibidos");
      } else {
        reject("Error al obtener los datos");
      }
    }, 16000);
  });
}

// Uso con .then()
obtenerDatos()
  .then(resultado => {
    console.log("Resultado:", resultado);
  })
  .catch(error => {
    console.error(" Error:", error);
  });

  async function cargarDatos() {
  try {
    const resultado = await obtenerDatos();
    console.log("Resultado:", resultado);
  } catch (error) {
    console.error("Error:", error);
  }
}

cargarDatos();