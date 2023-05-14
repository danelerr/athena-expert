import { ListaVariable } from "./componentes/variable.js";
import { ListaRegla } from "./componentes/regla.js";
import { MenuCarga } from "./componentes/descargar.js";
import { crearDescarga } from "./archivos/archivos.js";
import { EditableText } from "./componentes/textos.js";

let datos = {};

let root = document.getElementById("root");

let listaVariables = new ListaVariable(root, 'Lista de variables');
let listaReglas = new ListaRegla(root, 'Lista de reglas',listaVariables);

listaVariables.render();
listaReglas.render();

const titulo = document.getElementById('titulo');
const tituloText = new EditableText('Archivo sin titulo', titulo, "input");

const descarga = document.getElementById('descargar-archivo');
descarga.addEventListener('click', () => {
   datos = {};
   datos.variables = listaVariables.getVariales;
   datos.reglas = listaReglas.getReglas;

   crearDescarga(datos, tituloText.text);
});
const carga = document.getElementById('cargar-archivo');
carga.addEventListener('click', () => {
   const loadPopUp = document.createElement('div');
   const loadMenu = document.createElement('div');
   const carga = new MenuCarga(loadMenu);

   loadMenu.className = "menu";
   loadPopUp.className = "menuContainer";

   loadPopUp.addEventListener('click', (e)=> {
      if(e.target.classList.contains("menuContainer")){
         loadPopUp.remove();
      }
   });

   loadMenu.addEventListener('change', () => {
      if (carga.file != null)  {
         datos = carga.file;
         datos.nombre = datos.nombre.substring(0, datos.nombre.lastIndexOf('.'));
         llenarDatos();
         loadPopUp.remove();
      }
   });

   loadPopUp.appendChild(loadMenu);
   root.appendChild(loadPopUp);
   carga.render();
});

const cerrarArchivo = document.getElementById('cerrar-archivo');
cerrarArchivo.addEventListener('click', () => {
   datos = {};
   datos.variables = [];
   datos.reglas = [];
   llenarDatos();   
});

function llenarDatos() {
   if (datos.nombre === undefined) {
      tituloText.setText('Archivo sin título');
   } else {
      tituloText.setText(datos.nombre);
   }
   listaVariables.llenarDesdeArchivo(datos.variables);
   listaReglas.llenarDesdeArchivo(datos.reglas);
}

 