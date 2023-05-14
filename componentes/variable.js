import { variable, tiposVariable, tiposDescripcion } from "../clases.js";
import { EditableText, Comment } from "./textos.js";


class ListaVariable {
    constructor(place, title) {
        this.place = place;
        this.title = title;
        this.cardVariableArray = [];
    }

    get getVariales() {
        return this.cardVariableArray.map(card => card.objeto);
    }

    agregarVariable() {
        const tmp = new variable('Nombre', [''], tiposVariable['numerica'], 'Agrega una descripción');
        const tmpCard = new CardVariable(tmp, this.div, this);
        tmpCard.showMenu();
    }

    llenarDesdeArchivo(variables) {
        let currentCommentsDOM = Array.from(this.div.childNodes);
        currentCommentsDOM.forEach(commentDOM =>{
            commentDOM.remove();
        });
        this.cardVariableArray = [];
        variables.forEach((v) => {
            let {nombre, valores, tipo, descripcion} = v;
            const vari = new variable(nombre, valores, tipo, descripcion);
            const tmp = new CardVariable(vari, this.div, this);
            this.cardVariableArray.push(tmp);
            tmp.render();
        });
    }

    render() {
        this.head = document.createElement('div');
        this.head.classList.add('todo-list-head');
        this.h2 = document.createElement('h2');
        this.h2.innerText = this.title;

        this.button = document.createElement('button');
        this.button.innerText = 'Agregar';
        this.button.classList.add("btn-save");
        this.button.id = "to-do-list-button";
        this.div = document.createElement('div'); //div donde van las cards
        this.todoListElement = document.createElement('div');

        //Add Event listener
        this.button.addEventListener('click', ()=>{
            this.agregarVariable.call(this);
        });

        //Append elements to the to-do list element
        this.head.appendChild(this.h2);
        this.head.appendChild(this.button);
        this.todoListElement.appendChild(this.head);
        this.todoListElement.append(this.div);
        this.todoListElement.classList.add("todoList");
        this.place.append(this.todoListElement);
    }
}

class CardVariable {
    constructor(objeto, place, todoList){
        this.place = place;
        this.todoList = todoList;
        this.objeto = objeto;
        this.comments = [];
    }

    render(){
        this.card = document.createElement('div');
        this.card.classList.add("card");

        this.card.addEventListener('click', (e)=>{
            if(e.target != this.deleteButton) {
                this.btnText = 'Actualizar valores';
                this.showMenu.call(this);
            }
        });

        this.p = document.createElement('p');
        this.p.innerText = this.objeto.nombre;
        this.p2 = document.createElement('p');
        if (this.objeto.valores[0] === '') {
            this.p2.innerText = this.objeto.tipo; 
        } else {
            this.p2.innerText = this.objeto.valores;
        } 

        this.deleteButton = document.createElement('button');
        this.deleteButton.innerText = "X";
        this.deleteButton.addEventListener('click', ()=> {
            //agregar posteriormente la logica para
            //marca como no activa la regla (activa = true)
            this.deleteCard.call(this);
        });

        this.card.append(this.p);
        this.card.appendChild(this.p2);
        this.card.append(this.deleteButton);
        this.place.append(this.card);
    }

    deleteCard() {
        this.card.classList.add('eliminado-fast');
        this.card.addEventListener('animationend',  () => {
            this.card.remove();
        });
        let i = this.todoList.cardVariableArray.indexOf(this);
        this.todoList.cardVariableArray.splice(i,1);
    }

    showMenu() {
        //Create elements
        this.menu = document.createElement("div");
        this.menuContainer = document.createElement("div");
        this.menuTitle = document.createElement("div");
        this.inputValores = document.createElement("input");
        this.menuRadio = document.createElement("div");
        this.menuDescription = document.createElement("div");
        this.botonGuardar = document.createElement('button');
        // Parte de los comentarios.
        this.commentsInput = document.createElement("input");
        this.commentsButton = document.createElement('button');
        this.menuComments = document.createElement("div");

        Object.keys(tiposVariable).forEach((key) => {
            const label = document.createElement("label");
            label.setAttribute("for", tiposVariable[key]);
            label.textContent = tiposVariable[key];

            const input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("id", tiposVariable[key]);
            input.setAttribute("name", 'tipovar');
            input.setAttribute("value",tiposVariable[key]);
            this.objeto.tipo === tiposVariable[key] ? input.setAttribute("checked", "checked") : null;

            input.addEventListener('change', (e) => {
                this.inputValores.placeholder = tiposDescripcion[key];
                
                const text = this.inputValores.value;

                if (e.target.value === tiposVariable["escalar"]) {
                    if (text === '') {
                        this.botonGuardar.disabled = true;
                        this.botonGuardar.style.backgroundColor = 'rgb(140 215 119)';
                    } else {
                        this.botonGuardar.disabled = false;
                        this.botonGuardar.style.backgroundColor = '#5aac44';
                    }
                }
                if (e.target.value === tiposVariable["numerica"]) {
                    if (text === '') {
                        this.botonGuardar.disabled = false;
                        this.botonGuardar.style.backgroundColor = '#5aac44';
                    }
                    else if (text.match(/\-?\d+\.\.\d+/) && Number(text.substring(0, text.indexOf('.'))) < Number(text.substring(text.lastIndexOf('.')+1, text.length))) {
                        this.botonGuardar.disabled = false;
                        this.botonGuardar.style.backgroundColor = '#5aac44';
                    } else {
                        this.botonGuardar.disabled = true;
                        this.botonGuardar.style.backgroundColor = 'rgb(140 215 119)'; 
                    }
                }
            });

            const optionContainer = document.createElement("div");
            optionContainer.className = "option-container";
            optionContainer.appendChild(label);
            optionContainer.appendChild(input);
            this.menuRadio.appendChild(optionContainer);
        });

        //Add class names
        this.menu.className = "menu";
        this.menuContainer.className = "menuContainer";
        this.menuTitle.className = "menuTitle";
        this.menuRadio.className = "menu-radio";
        this.inputValores.classList = "comment valores-input";
        this.menuDescription.className = "menuDescription";
        this.botonGuardar.classList = "btn-guardar btn-save";
        // Parte de los comentarios
        this.menuComments.className = "menuComments";
        this.commentsInput.className = "commentsInput comment";
        this.commentsButton.className = "commentsButton btn-save";

        //Add inner Text
        this.commentsButton.innerText = "Agregar";
        this.commentsInput.placeholder = "Escribe un comentario...";

        //Add inner Text
        if (this.btnText != undefined) {
            this.botonGuardar.innerText = this.btnText;
        } else {
            this.botonGuardar.innerText = "Crear variable";
        }

        this.commentsButton.innerText = "Agregar";
        this.commentsInput.placeholder = "Escribe un comentario...";

        if (this.objeto.valores[0] === '') {
            this.inputValores.placeholder = tiposDescripcion['numerica'];
        } else {
            this.inputValores.value = this.objeto.valores;
        }

        //Event listeners
        this.menuContainer.addEventListener('click', (e)=>{
            if(e.target.classList.contains("menuContainer")) {
                this.menuContainer.classList.add('eliminado');
                this.menuContainer.addEventListener('animationend',  () => {
                    this.menuContainer.remove();
                });
            }
        });

        this.inputValores.addEventListener('keyup', (e) => {
            const s = document.querySelector('input[name="tipovar"]:checked');
            const text = e.target.value;

            if (s.value === tiposVariable["escalar"]) {
                if (text === '') {
                    this.botonGuardar.disabled = true;
                    this.botonGuardar.style.backgroundColor = 'rgb(140 215 119)';
                } else {
                    this.botonGuardar.disabled = false;
                    this.botonGuardar.style.backgroundColor = '#5aac44';
                }
            }
            if (s.value === tiposVariable["numerica"]) {
                if (text === '') {
                    this.botonGuardar.disabled = false;
                    this.botonGuardar.style.backgroundColor = '#5aac44';
                }
                else if (text.match(/\-?\d+\.\.\d+/) && Number(text.substring(0, text.indexOf('.'))) < Number(text.substring(text.lastIndexOf('.')+1, text.length))) {
                    this.botonGuardar.disabled = false;
                    this.botonGuardar.style.backgroundColor = '#5aac44';
                } else {
                    this.botonGuardar.disabled = true;
                    this.botonGuardar.style.backgroundColor = 'rgb(140 215 119)'; 
                }
            }
        });
        
        this.botonGuardar.addEventListener('click', ()=> {
            const s = document.querySelector('input[name="tipovar"]:checked');
            if (this.editableTitle.text != "") {

                //verificar las reglas proximamente
                const xd = this.todoList.getVariales.filter(va => va.nombre === this.editableTitle.text);
                if (xd.length != 0 && this.objeto.nombre != this.editableTitle.text) return;
                if (xd.length != 0 && this.btnText === undefined) return;
                this.inputValores.value =  this.inputValores.value.replace(/\s+/g, '');

                this.objeto.nombre = this.editableTitle.text;
                this.objeto.valores =  this.inputValores.value.split(',');
                this.objeto.tipo =  s.value;
                this.objeto.descripcion = this.editableDescription.text;

                if (this.btnText === undefined) {
                    this.todoList.cardVariableArray.push(this);
                    this.render();
                } 
                this.p.innerText = this.editableTitle.text;
                if (this.objeto.valores[0] === '') {
                    this.p2.innerText = s.value; 
                } else {
                    this.p2.innerText = this.inputValores.value;
                } 
                this.menuContainer.remove();
            }
        });

        this.commentsButton.addEventListener('click', ()=>{
            if(this.commentsInput.value != ""){
            this.comments.push(this.commentsInput.value);
            this.renderComments();
            this.commentsInput.value = "";
            }
        })

        //Append
        const cGuardar = document.createElement('div');
        cGuardar.style.display = "flex";
        cGuardar.style.justifyContent = "center";
        cGuardar.style.marginBottom = "50px";
        cGuardar.appendChild(this.botonGuardar);

        this.menu.append(this.menuTitle);

        this.menu.append(this.inputValores);
        this.menu.appendChild(this.menuRadio);
        
        this.menu.append(this.menuDescription);
        
        this.menu.appendChild(cGuardar);

        this.menu.appendChild(document.createElement('hr'));
        this.menu.append(this.commentsInput);
        this.menu.append(this.commentsButton);
        this.menu.append(this.menuComments);
        this.menuContainer.append(this.menu);
        root.append(this.menuContainer);

        this.editableDescription = new EditableText(this.objeto.descripcion, this.menuDescription, "textarea");
        this.editableTitle = new EditableText(this.objeto.nombre, this.menuTitle, "input");
        
        this.renderComments();
    }
    
    renderComments(){

        let currentCommentsDOM = Array.from(this.menuComments.childNodes);

        currentCommentsDOM.forEach(commentDOM =>{
            commentDOM.remove();
        });

        this.comments.forEach(comment =>{
            new Comment(comment, this.menuComments, this);
        });
    }
}




export { ListaVariable };
