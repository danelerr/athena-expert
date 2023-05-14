export async function cargarArchivo(fileList) {
    const file = fileList[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        await new Promise(resolve => reader.onload = resolve);
        const ret = JSON.parse(reader.result);
        ret.nombre = file.name; 
        return ret;
    }
}

export function crearDescarga(data, nombre='Datos') {
    const jsonContent = JSON.stringify(data);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    let name = nombre + '.dct';
    downloadLink.download = name;
    // Agregamos el enlace al DOM y hacemos clic en él para iniciar la descarga
    document.body.appendChild(downloadLink);
    downloadLink.click();
    // Liberamos la URL del objeto Blob
    URL.revokeObjectURL(downloadUrl);;
}
