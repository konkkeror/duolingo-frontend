// function mostrarListaUsuarios() {

// }

var usuarios = [];
var categorias = [];
var usuarioSeleccionado = {};

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
          <div class="icono-categoria" onclick="mostrarListaPreguntas()" style="background-color: ${categoria.color}">
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
    mostrarListaCategorias();
  }); 
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
//     descripcion: "Poderosísima carrera de Ing en Sistemas"
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


