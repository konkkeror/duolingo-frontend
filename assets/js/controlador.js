// function mostrarListaUsuarios() {

// }

var usuarios = [];
var categorias = [];
var usuarioSeleccionado = {};
var preguntas = [];
var preguntaActual = 0;
var resultado = {}

const inicializarResultados = () => {
  resultado = {
    aprobada: false,
    category: 0,
    correctas: 0,
    incorrectas: 0
  }
};

inicializarResultados();

const obtenerCategorias = () => {
  fetch('http://localhost:3001/categorias', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json", //MIME Type
    }
  })
  .then((respuesta) => respuesta.json())
  .then((respuestaCategorias) => {
    console.log(respuestaCategorias);
    categorias = respuestaCategorias;
    renderizarCategorias();
  }); 
}

obtenerCategorias();

const renderizarCategorias = () => {
  categorias.forEach(categoria => {
    document.getElementById('categorias').innerHTML +=
      `<div class="contenedor-categoria">
          <div id="${categoria.id}" class="icono-categoria" onclick="obtenerPreguntas(${categoria.id})" style="background-color: ${categoria.color}">
              <i class="${categoria.icono}"></i>
          </div>
          <div>${categoria.nombre}</div>
        </div>`;
  });
  
}

const obtenerUsuarios = () => {
  //Fetch es una funcion asincrona que retorna una promesa (Promise)
  fetch('http://localhost:3001/usuarios', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json", //MIME Type
    }
  })
  .then((respuesta) => respuesta.json())
  .then((respuestaUsuarios) => {
    console.log(respuestaUsuarios);
    usuarios = respuestaUsuarios;
    renderizarUsuarios();
    mostrarListaUsuarios();
  }); 
}

const obtenerPreguntas = (idCategoria) => {
  resultado.category = idCategoria;
  console.log("Obtener preguntas de la categoria", idCategoria);
  fetch(`http://localhost:3001/categorias/${idCategoria}/preguntas`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json", //MIME Type
    }
  }).then((res) => res.json())
  .then((res) => {
    preguntas = res;
    console.log('Preguntas', res);
    renderizarPregunta();
    mostrarListaPreguntas();
  }); 
}

const renderizarPregunta = () => {
  const pregunta = preguntas[preguntaActual];
  document.getElementById('indice-pregunta-actual').innerHTML = `${preguntaActual + 1}/${preguntas.length}`;
  document.getElementById('pregunta').innerHTML = pregunta.palabra;
  document.getElementById('respuestas').innerHTML = '';
  pregunta.respuestas.forEach((respuesta, index) => {
    document.getElementById('respuestas').innerHTML += 
        `<div class="respuesta" onclick="seleccionarRespuesta(${index}, this)">
          ${respuesta.palabra}
        </div>`;
  });
}

const siguientePregunta = () => {
  preguntaActual ++;
  if (preguntaActual >= preguntas.length) {
    if (resultado.correctas == preguntas.length && resultado.incorrectas == 0) {
      resultado.aprobada = true;
      alert("Felicidades!!!");
    } else {
      alert("Fin del cuestionario, suerte a la pr??xima");
    }

    mostrarListaCategorias();
    preguntaActual = 0;
    inicializarResultados();
    return;
  }
  renderizarPregunta();
}

const renderizarUsuarios = () => {
  document.getElementById('lista-usuarios').innerHTML = '';
  usuarios.forEach(usuario => {
    document.getElementById('lista-usuarios').innerHTML +=
      `<div class="contenedor-usuario" onclick="seleccionarUsuario(${usuario.id})">
        <img class="imagen-usuario" src="assets/img/${usuario.imagenPerfil}">
        <div>
          ${usuario.nombre}
        </div>
      </div>`;
  });
}

const seleccionarUsuario = (idUsuario) => {
  console.log("Seleccionar usuario", idUsuario);
  fetch('http://localhost:3001/usuarios/' + idUsuario, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json", //MIME Type
    }
  })
  .then((respuesta) => respuesta.json())
  .then((usuario) => {
    console.log(usuario);
    usuarioSeleccionado = usuario;

    document.getElementById('img-usuario-seleccionado').setAttribute('src', 'assets/img/' + usuarioSeleccionado.imagenPerfil);
    document.querySelector('#contenedor-coronas span').innerHTML = usuario.coronas;
    document.querySelector('#contenedor-vidas span').innerHTML = usuario.vidas;

    //Quitar la clase css de completada a todas las categor??as
    categorias.forEach(categoria => {
      document.getElementById(categoria.id).classList.remove('completada'); 
    });

    // Marcar las categorias completadas.
    usuarioSeleccionado.resultados.forEach(categoria => {
      if (categoria.aprobada) {
        document.getElementById(categoria.category).classList.add('completada'); 
      }
    });

    mostrarListaCategorias();
  }); 
}

const seleccionarRespuesta = (index, etiqueta) => {
  if (preguntas[preguntaActual].contestada) {
    alert("Ya seleccion?? una respuesta, haga click en continuar");
    return;
  }

  const respuesta = preguntas[preguntaActual].respuestas[index];
  console.log("Respuesta seleccionada", respuesta);
  if (respuesta.correcta) {
    etiqueta.classList.add('correcta');
    resultado.correctas++;
  } else {
    etiqueta.classList.add('incorrecta');
    resultado.incorrectas++;
  }
  preguntas[preguntaActual].contestada = true;
  console.log('Resultado: ', resultado);
}

// Paradigma funcional
const mostrarListaUsuarios = () => {
  document.getElementById('seccion-usuarios').style.display = "block";
  document.getElementById('seccion-categorias').style.display = "none";
}

const mostrarListaCategorias = () => {
  document.getElementById('seccion-usuarios').style.display = "none";
  document.getElementById('seccion-preguntas').style.display = "none";
  document.getElementById('seccion-categorias').style.display = "block";
}

const mostrarListaPreguntas = () => {
  document.querySelector('#seccion-preguntas').style.display = "block";
  document.querySelector('#seccion-categorias').style.display = "none";
}


// const p = {
//   nombre: "Juan",
//   apellido: "Perez",
//   edad: 12,
//   soltero: true,
//   carrera: {
//     nombreCarrera: "Ing Sistemas",
//     descripcion: "Poderos??sima carrera de Ing en Sistemas"
//   },
//   gustos: ["Cafe", "Baleadas", "Tortillas con quesillo"],
//   hermanos: [
//     {
//       nombre: "Maria",
//       apellido: "Perez"
//     },
//     {
//       nombre: "Pedro",
//       apellido: "Perez"
//     }
//   ]
// };

// console.log('Persona', p);
// alert(JSON.stringify(p));
// localStorage.setItem('persona', JSON.stringify(p));
const personaGuardada = JSON.parse(localStorage.getItem('persona'));

console.log(personaGuardada);


