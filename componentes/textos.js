class EditableText {
    constructor(text, place, typeOfInput){
        this.text = text;
        this.place = place;
        this.typeOfInput = typeOfInput;
        this.render();
    }

    render(){
        this.div = document.createElement("div");
        this.p = document.createElement("p");

        this.p.innerText = this.text;

        this.p.addEventListener('click', ()=>{
            this.showEditableTextArea.call(this);
        });

        this.div.append(this.p);
        this.place.append(this.div);
    }

    showEditableTextArea() {
        let oldText = this.text;
        this.input = document.createElement(this.typeOfInput);
        this.saveButton = document.createElement("button");

        this.p.remove();
        this.input.value = oldText;
        this.saveButton.innerText = "Guardar";
        this.saveButton.className = "btn-save";
        this.input.classList.add("comment");

        this.saveButton.addEventListener('click', ()=>{
            this.text = this.input.value;
            this.div.remove();
            this.render();
        });

        function clickSaveButton(event, object){
                event.preventDefault();
                object.saveButton.click();
        }

        this.input.addEventListener("blur", (e)=>{
            if(this.typeOfInput == "input"){
                clickSaveButton(e, this);
            }
        });
        this.input.addEventListener("keyup", (e)=>{
            if(this.typeOfInput == "input") {
                if (e.keyCode === 13)
                clickSaveButton(e, this);
            }
        });






        // this.card.menu.addEventListener('click', (e) => {
        //     console.log(e.target);
        //     if(e.target != this.input && e.target != this.p && this.typeOfInput != "textarea") {
        //         e.preventDefault();
        //         this.saveButton.click();
        //     }
        // });

        this.div.append(this.input);

        if(this.typeOfInput == "textarea"){
            this.div.append(this.saveButton);
        }
        this.input.select();
    }

    setText(text) {
        this.text = text;
        this.p.innerText = this.text;
    }
}

class Comment{
    constructor(text, place, card){
        this.text = text;
        this.place = place;
        this.card = card;
        this.render();
    }

    render(){
        this.div = document.createElement('div');
        this.div.className = "comment";
        this.div.innerText = this.text;
        
        this.place.append(this.div);
    }
}
export {EditableText, Comment};