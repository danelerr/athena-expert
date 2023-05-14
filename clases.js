const tiposVariable = {
    numerica: 'Numérica',
    escalar: 'Escalar'
}

const tiposDescripcion = {
    numerica: 'Rango Ej: -10..6 o 0..1000 (vacio = sin rango)',
    escalar: 'Valores ej: perro, gato, 45, hola'
}

const oprels = {
    numerica: ['<','>','=','<=', '>=', '!='],
    escalar: ['=', '!=']
}

class variable {
    constructor(nombre, valores, tipo, descripcion="") {
        this.nombre = nombre;
        this.valores = valores;
        this.tipo= tipo;
        this.descripcion = descripcion;
    }
}

class regla {
    constructor(nombre, descripcion, literales, conclusion, activa=true) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.literales = literales;
        this.conclusion = conclusion;
        this.activa;
    }

    get conclu() {
        return this.conclusion[0] + " = " + this.conclusion[1]; 
    }
}

class literal {
    constructor(variable, oprel, valor) {
        this.variable = variable;
        this.oprel = oprel;
        this.valor = valor;
    }
}


export {regla, variable, tiposVariable, tiposDescripcion, oprels, literal};
