import { regla, tiposVariable, oprels, literal} from "../clases.js";
import { EditableText } from "./textos.js";

class ListaRegla {
    constructor(place, title, listaVariables) {
        this.place = place;
        this.title = title;
        this.listaVariables = listaVariables;
        this.cardReglaArray = []; //lista de tarjetas reglas
    }

    get getReglas() {
        return this.cardReglaArray.map(card => card.objeto);
    }

    agregarRegla() {
        const tmp = new regla('Regla', 'Agrega una descripción', [], [], true);
        const tmpCard = new CardRegla(tmp, this.div, this);
        tmpCard.showMenu();
    }

    llenarDesdeArchivo(reglas) {
        let currentCommentsDOM = Array.from(this.div.childNodes);
        currentCommentsDOM.forEach(commentDOM =>{
            commentDOM.remove();
        });
        this.cardReglaArray = [];
        reglas.forEach((r) => {
            let {nombre, descripcion, literales, conclusion, activa} = r;
            literales = literales.map((l) => {
                let {variable, oprel, valor} = l;
                return new literal(variable, oprel, valor);
            });
            const rule = new regla(nombre, descripcion, literales, conclusion,activa);
            const tmp = new CardRegla(rule, this.div, this);
            this.cardReglaArray.push(tmp);
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
            this.agregarRegla.call(this);
        });

        this.head.appendChild(this.h2);
        this.head.appendChild(this.button);
        this.todoListElement.appendChild(this.head);
        this.todoListElement.append(this.div);
        this.todoListElement.classList.add("todoList");
        this.place.append(this.todoListElement);
    }
}

class CardRegla {
    constructor(objeto, place, todoList){
        this.place = place;
        this.todoList = todoList;
        this.objeto = objeto;
        this.CardLiteral = [];

        this.listaVariables = todoList.listaVariables;
    }

    render(){
        this.card = document.createElement('div');
        this.card.classList.add("card");

        this.card.addEventListener('click', (e)=>{
            if(e.target != this.deleteButton){
                this.showMenu.call(this);
            }
        });
               
        this.p = document.createElement('p');
        this.p.innerText = this.objeto.nombre;
        
        this.p2 = document.createElement('p');
        this.p2.innerText = this.objeto.conclu;

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

    showMenu() {
        //Create elements
        this.menu = document.createElement("div");
        this.menu.className = "menu";
        this.menuContainer = document.createElement("div");
        this.menuContainer.className = "menuContainer";
        this.menuTitle = document.createElement("div");
        this.menuTitle.className = "menuTitle";
        this.menuDescription = document.createElement("div");
        this.menuDescription.className = "menuDescription";
        // creando combo boxes
        this.selectVar = document.createElement('select');
        this.selectOprel = document.createElement('select');
        this.selectValor = document.createElement('select');
        this.selectVar.classList = "comment";
        this.selectOprel.classList = "comment";
        this.selectValor.classList = "comment";
            //opciones para prueba
            this.opt = document.createElement('option');
            this.opt.value = "";
            this.opt.textContent = "-Variable-";
            this.selectVar.appendChild(this.opt);

            this.opt2 = document.createElement('option');
            this.opt2.value = "";
            this.opt2.textContent = "-Oprel-";
            this.selectOprel.appendChild(this.opt2);

            this.opt3 = document.createElement('option');
            this.opt3.value = "";
            this.opt3.textContent = "-Valor-";
            this.selectValor.appendChild(this.opt3);
        //el contenedor de los combo boxes
        this.comboBoxDiv = document.createElement("div");
        this.comboBoxDiv.className = "menu-radio";
        //los 2 botones
        this.botonAgregarLiteral = document.createElement('button');
        this.botonAgregarLiteral.classList = "btn-guardar btn-save";
        this.botonAgregarLiteral.innerText = "Agregar premisa";
        this.botonGuardar = document.createElement('button');
        this.botonGuardar.classList = "btn-guardar btn-save";
        
        
        //la parte visual de las condiciones
        this.si = document.createElement('p');
        this.si.innerText = "SI";
        this.si.style.display = "block";
        this.entonces = document.createElement('p');
        this.entonces.innerText = "ENTONCES";
        this.entonces.style.display = "block";
        
        //el contenedor de la premisa //literales
        this.literalesDiv = document.createElement('div');
        this.literalesDiv.className = "menuComments";

        //los combobox de la conclusion
        this.varConclusion = document.createElement('select');
        this.valorConclusion = document.createElement('select');
        this.varConclusion.classList = "comment";
        this.valorConclusion.classList = "comment";

        //la parte de obtener las variables (modificar)
        this.varList = this.todoList.listaVariables.getVariales;

        // const usedVars = this.objeto.literales.map(l => l.variable);
        // this.varList = this.varList.filter(v => !usedVars.includes(v.nombre));

        this.opt4 = document.createElement('option');
        this.opt4.value = "";
        this.opt4.textContent = "-Variable-";
        this.varConclusion.appendChild(this.opt4);

        this.opt5 = document.createElement('option');
        this.opt5.value = "";
        this.opt5.textContent = "-Valor-";
        this.valorConclusion.appendChild(this.opt5);    
        //agregando las variables disponibles para crear un literal
        this.varList.forEach((v) => {
            const op = document.createElement('option');
            op.value = v.nombre;
            op.text = v.nombre;
            const oq = document.createElement('option');
            oq.value = v.nombre;
            oq.text = v.nombre;
            this.selectVar.appendChild(op);
            this.varConclusion.appendChild(oq);
        });
        

        //EVENT LISTENERS

        //reparado parcialmente
        this.selectVar.addEventListener('change', () => {
            let sel = this.selectVar.options[this.selectVar.selectedIndex].value;
            const selectVar = this.varList.filter((v) => v.nombre === sel)[0];
            if (selectVar != undefined) {
                //se actualiza la parte de seleccionar un oprel
                this.selectOprel.innerText = "";
                let c='';
                for (let clave in tiposVariable) {
                    if (tiposVariable[clave] === selectVar.tipo) {
                      c = clave;
                      break;
                    }
                }
                oprels[c].forEach((o) => {
                    const op = document.createElement('option');
                    op.value = o;
                    op.text = o;
                    this.selectOprel.appendChild(op);
                });

                //se actualiza la parte del input
                if (c === 'numerica') {
                    this.selectValor.remove();
                    this.selectValor = document.createElement('input');
                    this.selectValor.setAttribute('type', 'number');
                    this.selectValor.classList = 'comment';
                    this.selectValor.style.width = '80px';
                    this.comboBoxDiv.appendChild(this.selectValor);
                } else {
                    this.selectValor.remove();
                    this.selectValor = document.createElement('select');
                    this.selectValor.classList = 'comment';
                    selectVar.valores.forEach((v) => {
                        const op = document.createElement('option');
                        op.value = v;
                        op.text = v;
                        this.selectValor.appendChild(op);
                    });
                    this.comboBoxDiv.appendChild(this.selectValor);
                } 
            } else {
                // quiere decir que no he seleccionado nada. Entonces lo llevo a default
                this.selectOprel.innerHTML = '';
                this.selectOprel.appendChild(this.opt2);
                this.selectValor.remove();
                this.selectValor = document.createElement('select');
                this.selectValor.classList = 'comment';
                this.selectValor.appendChild(this.opt3);
                this.comboBoxDiv.appendChild(this.selectValor);
            }
            /*
            if (this.varConclusion.value === sel || this.varConclusion.value === '' || sel === '') {
                this.varConclusion.innerHTML = "";
                this.varList.forEach((v) => {
                    if (v.nombre != sel) {
                        const xxx = document.createElement('option');
                        xxx.value = v.nombre;
                        xxx.text = v.nombre;
                        this.varConclusion.appendChild(xxx);
                    }
                });
                this.varConclusion.dispatchEvent(new Event('change'));
            }
            if (sel === '') {
                this.varConclusion.value = '';
            }
            */
            this.updateBotonSalvar();
        });
        //falta verificar el rango, si es numerica con rango
        this.varConclusion.addEventListener('change', () => {
            let sel = this.varConclusion.options[this.varConclusion.selectedIndex].value;
            if (sel === '') {
                this.valorConclusion.remove();
                this.valorConclusion = document.createElement('select');
                this.valorConclusion.classList = 'comment';
                this.valorConclusion.appendChild(this.opt5);
                this.cConclusion.appendChild(this.valorConclusion); 
                return;
            }
            const selectVar = this.varList.filter((v) => v.nombre === sel)[0];
            let c='';
            for (let clave in tiposVariable) {
                if (tiposVariable[clave] === selectVar.tipo) {
                  c = clave;
                  break;
                }
            }
            if (c === 'numerica') {
                this.valorConclusion.remove();
                this.valorConclusion = document.createElement('input');
                this.valorConclusion.setAttribute('type', 'number');
                this.valorConclusion.classList = 'comment';
                this.valorConclusion.style.width = '80px';
                this.cConclusion.appendChild(this.valorConclusion);
            } else {
                this.valorConclusion.remove();
                this.valorConclusion = document.createElement('select');
                this.valorConclusion.classList = 'comment';
                selectVar.valores.forEach((v) => {
                    const op = document.createElement('option');
                    op.value = v;
                    op.text = v;
                    this.valorConclusion.appendChild(op);
                });
                this.cConclusion.appendChild(this.valorConclusion);
            }
            this.updateBotonSalvar(); 
        });

        this.menuContainer.addEventListener('click', (e)=>{
            if(e.target.classList.contains("menuContainer")) {
                this.menuContainer.classList.add('eliminado');
                this.menuContainer.addEventListener('animationend',  () => {
                    this.menuContainer.remove();
                });
            }
        });
        //falta la logica para evitar guardar (mejor copiar al refactorizar la regla)
        this.botonGuardar.addEventListener('click', ()=> {
            if (this.editableTitle.text != "" && this.valorConclusion.value) {
                const xd = this.todoList.getReglas.filter(va => va.nombre === this.editableTitle.text);
                if (xd.length != 0 && this.objeto.nombre != this.editableTitle.text) return;
                if (xd.length != 0 && this.objeto.conclusion.length === 0) return;
                const conclu = [this.varConclusion.value, this.valorConclusion.value];
                this.objeto.nombre = this.editableTitle.text;
                this.objeto.descripcion = this.editableDescription.text;
                this.objeto.activa = true;
                if (this.objeto.conclusion.length === 0) {
                    this.todoList.cardReglaArray.push(this);
                    this.render();   
                }
                this.objeto.conclusion = conclu;
                this.menuContainer.remove();        
                this.p.innerText = this.objeto.nombre;
                this.p2.innerText = this.objeto.conclu;

            }
        });
        //Revisar el tema de los literales 
        this.botonAgregarLiteral.addEventListener('click', () => {
            let sel = this.selectVar.options[this.selectVar.selectedIndex].value;
            const selectVar = this.varList.filter((v) => v.nombre === sel)[0];

            let va = this.selectValor.value;
            if (va === '' || this.selectOprel.value === '' || this.selectValor.value === '') {
                return;
            }
            //EN DESARROLLO LA PARTE DEL RANGO NUMERICO
            va = Number(va);
            const vals = selectVar.valores[0];
            if (vals != '' && va < (Number(vals.substring(0, vals.indexOf('.'))) || va > Number(vals.substring(vals.lastIndexOf('.')+1, vals.length)))) {
                return;
            }
            const lit = new literal(this.selectVar.value, this.selectOprel.value, this.selectValor.value);

            this.objeto.literales.push(lit);
            this.CardLiteral.push(new CardLiteral(lit, this.literalesDiv, this));
            this.selectVar.selectedIndex = 0;
            this.selectVar.dispatchEvent(new Event('change'));
 
            //estamos eliminando un objeto de las variables disponibles
           
            /*
            this.varList = this.varList.filter((v) => {
                if (v.nombre != this.selectVar.value) {
                    return v;       
                }
            });
            */

            //y vamos a reconstruir todo

            /*
            this.selectVar.innerHTML = '';
            this.selectVar.appendChild(this.opt);
            this.varList.forEach((v) => {
                const op = document.createElement('option');
                op.value = v.nombre;
                op.text = v.nombre;
                this.selectVar.appendChild(op);
            });
            this.selectVar.dispatchEvent(new Event('change'));
            */

        }); 

        this.updateBotonSalvar = function() {
            console.log(this.varConclusion.value);
            const varsPremisa = this.objeto.literales.map(lit => lit.variable);
            const indexVar = varsPremisa.indexOf(this.varConclusion.value);
            if (this.CardLiteral.length === 0) {
                this.botonGuardar.disabled = true;
                this.botonGuardar.style.backgroundColor = 'rgb(140 215 119)';
            } else if (this.varConclusion.value === '' || indexVar != -1) {
                this.botonGuardar.disabled = true;
                this.botonGuardar.style.backgroundColor = 'rgb(140 215 119)';
            } else {
                this.botonGuardar.disabled = false;
                this.botonGuardar.style.backgroundColor = '#5aac44';
            }

        }
    
        //Append
        const cGuardar = document.createElement('div');
        cGuardar.style.display = "flex";
        cGuardar.style.justifyContent = "space-evenly";
        cGuardar.style.marginBottom = "20px";
        cGuardar.appendChild(this.botonAgregarLiteral);
        cGuardar.appendChild(this.botonGuardar);

        this.menu.append(this.menuTitle);

        //los combo box
        this.comboBoxDiv.appendChild(this.selectVar);
        this.comboBoxDiv.appendChild(this.selectOprel);
        this.comboBoxDiv.appendChild(this.selectValor);

        this.menu.append(this.menuDescription);

        this.menu.appendChild(this.comboBoxDiv);
        
        //botones
        this.menu.appendChild(cGuardar);
        this.menu.appendChild(this.si);
        this.menu.appendChild(this.literalesDiv);
        this.menu.appendChild(this.entonces);
    
        this.cConclusion = document.createElement('div');
        this.cConclusion.style.display = "flex";
        this.cConclusion.style.justifyContent = "center";
        this.cConclusion.style.alignItems = "center";
        this.cConclusion.style.marginBottom = "20px";
        const pIgual = document.createElement('p');
        pIgual.innerText = "=";
        pIgual.style.marginLeft = '15px';
        pIgual.style.marginRight = '15px';
        this.cConclusion.appendChild(this.varConclusion);
        this.cConclusion.appendChild(pIgual);
        this.cConclusion.appendChild(this.valorConclusion);

        this.menu.appendChild(this.cConclusion);

        this.menuContainer.append(this.menu);
        root.append(this.menuContainer);

        this.editableDescription = new EditableText(this.objeto.descripcion, this.menuDescription, "textarea");
        this.editableTitle = new EditableText(this.objeto.nombre, this.menuTitle, "input");

        
        if (this.objeto.conclusion.length != 0) {
            this.botonGuardar.innerText = "Actualizar regla";
            this.varConclusion.value = this.objeto.conclusion[0];
            this.varConclusion.dispatchEvent(new Event('change'));
            this.valorConclusion.value = this.objeto.conclusion[1];
        } else {
            this.botonGuardar.innerText = "Crear Regla";
        }     
        this.renderPremisa();
        this.updateBotonSalvar();
    }

    deleteCard() {
        this.card.classList.add('eliminado-fast');
        this.card.addEventListener('animationend',  () => {
            this.card.remove();
        });
        let i = this.todoList.cardArray.indexOf(this);
        this.todoList.cardArray.splice(i,1);
    }

    renderPremisa () {
        let premisaActual = Array.from(this.literalesDiv.childNodes);

        premisaActual.forEach(premisa =>{
            premisa.remove();
        });
        this.CardLiteral = [];

        this.objeto.literales.forEach(literal =>{
            this.CardLiteral.push(new CardLiteral(literal, this.literalesDiv, this));
        });
    }
}

class CardLiteral{
    constructor(objeto, place, todoList){
        this.place = place;
        this.todoList = todoList;
        this.objeto = objeto;
        this.render();
    }

    render(){
        this.card = document.createElement('div');
        this.card.classList.add("card");

        this.p = document.createElement('p');
        this.p.innerText = this.objeto.variable;

        this.p2 = document.createElement('p');
        this.p2.innerText = this.objeto.oprel;
        
        this.p3 = document.createElement('p');
        this.p3.innerText = this.objeto.valor;

        this.deleteButton = document.createElement('button');
        this.deleteButton.innerText = "X";
        this.deleteButton.addEventListener('click', ()=> {
            this.deleteCard.call(this);
        });
        this.card.append(this.p);
        this.card.appendChild(this.p2);
        this.card.appendChild(this.p3);
        this.card.append(this.deleteButton);
        this.place.append(this.card);
    }

    deleteCard() {
        this.card.classList.add('eliminado-fast');
        this.card.addEventListener('animationend',  () => {
            this.card.remove();
        });
        let i = this.todoList.CardLiteral.indexOf(this);
        this.todoList.CardLiteral.splice(i,1);
        this.todoList.objeto.literales.splice(i,1);
        this.todoList.updateBotonSalvar();
    }
}

export {ListaRegla};
