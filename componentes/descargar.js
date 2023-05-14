import { cargarArchivo } from "../archivos/archivos.js";

class MenuCarga {
    constructor(place) {
        this.place = place;
        this.file = null;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'drop-area-container';

        const dropArea = document.createElement('div');
        dropArea.className = 'drop-area';

        const dragText = document.createElement('h2');
        dragText.textContent  = 'Arrastra tu archivo aqui';

        const span = document.createElement('span');
        span.textContent = 'O';

        const button = document.createElement('button');
        button.textContent = 'Selecciona tu archivo';

        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('name', 'nombre');
        input.setAttribute('id', 'input-file');
        input.setAttribute('hidden', '');

        button.addEventListener('click', (e) => {
            input.click();
        });

        input.addEventListener('change', async (e) => {
            this.file = await cargarArchivo(input.files);
            this.place.dispatchEvent(new Event('change'));
        });

        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropArea.classList.add('active');
            dragText.textContent = 'Suelta para subir el archivo';
        });

        dropArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropArea.classList.remove('active');
            dragText.textContent = 'Arrastra y suelta tu archivo';
        });

        dropArea.addEventListener('drop', async (e) => {
            e.preventDefault();
            this.file = await cargarArchivo(e.dataTransfer.files);
            this.place.dispatchEvent(new Event('change'));
            dropArea.classList.remove('active');
            dragText.textContent = 'Arrastra y suelta tu archivo';
        });

        dropArea.appendChild(dragText);
        dropArea.appendChild(span);
        dropArea.appendChild(button);
        dropArea.appendChild(input);
        container.appendChild(dropArea);
        this.place.appendChild(container);
    }

}

export { MenuCarga }; 

