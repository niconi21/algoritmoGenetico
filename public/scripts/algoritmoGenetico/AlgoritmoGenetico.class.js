class AlgoritmoGenetico {

    constructor(cntSujetos, min, max, expresion) {
        this.cntSujetos = cntSujetos;
        this.min = min;
        this.max = max;
        this.expresion = expresion;
    }

    inicializar() {
        this.crearSujetos();
        this.calculoPostCreacion()
        this.buscarMejoresPadres()
        this.penalizarHijos()
    }
    asignarSujetos(poblaciones = []) {
        this.sujetos = [];
        this.total = 0;
        poblaciones.forEach((poblacion,index) =>{
            let sujeto = new Sujeto(index, poblacion);
            this.calcularFuncion(sujeto)
            this.total += sujeto.funcion;
            this.sujetos.push(sujeto)

        })
        this.calculoPostCreacion()
        this.buscarMejoresPadres()
        this.penalizarHijos()
    }

    crearSujetos() {
        this.sujetos = [];
        this.total = 0;
        for (let index = 0; index < this.cntSujetos; index++) {
            let poblacion = Math.floor(Math.random() * (this.max - this.min) + this.min)
            let sujeto = new Sujeto(index, poblacion);
            this.calcularFuncion(sujeto)
            this.total += sujeto.funcion;
            this.sujetos.push(sujeto)
        }
    }

    calculoPostCreacion() {
        let acumulado = 0;
        this.sujetos.forEach(sujeto => {
            sujeto.fitness = sujeto.funcion / this.total
            acumulado += sujeto.fitness;
            sujeto.acumulado = acumulado;
        })
    }

    buscarMejoresPadres() {
        this.sujetos.forEach(sujeto => {
            let ruleta = sujeto.ruleta;
            let diferencia = Math.abs(ruleta - this.sujetos[0].acumulado)
            let sujetoPadre = this.sujetos[0];
            this.sujetos.forEach(sujetoComparar => {
                let diferenciaComparar = Math.abs(ruleta - sujetoComparar.acumulado);
                if (diferencia > diferenciaComparar) {
                    diferencia = diferenciaComparar
                    sujetoPadre = sujetoComparar
                }
            })
            sujeto.padre = sujetoPadre
            sujeto.generarHijo()
            sujeto.mutarHijo()
        })
    }

    calcularFuncion(sujeto = new sujeto()) {
        sujeto.funcion = Number(math.simplify(this.expresion).evaluate({x:sujeto.poblacion}))
    }

    penalizarHijos() {
        this.sujetos.forEach(sujeto => {
            sujeto.hijoPenalizado = 
                sujeto.hijoResultante > this.max ? this.max :
                sujeto.hijoResultante < this.min ? this.min : sujeto.hijoResultante;
        })
    }

    obtenerResultados() {
        return this.sujetos;
    }


}

class Sujeto {


    constructor(id, poblacion) {
        this.id = id;
        this.poblacion = poblacion;
        this.cromosoma = this.toBinary(this.poblacion);
        this.funcion = 0;
        this.fitness = 0;
        this.acumulado = 0;
        this.ruleta = Math.random();
        this.padre = 1000;
        this.cruze = Math.floor(Math.random() * (8 - 1) + 1)
        this.bitMutacion = Math.floor(Math.random() * (8 - 1) + 1)
        this.hijoPenalizado = -1;
    }


    toBinary(number) {
        let num = number;
        let binary = (num % 2).toString();
        for (; num > 1;) {
            num = parseInt(num / 2);
            binary = (num % 2) + (binary);
        }
        if (binary.length < 8) {
            let ceros = '';
            let diferencia = 8 - binary.length;
            for (let index = 0; index < diferencia; index++)
                ceros += '0';
            binary = ceros + binary;
        }
        return binary;
    }

    toDecimal(number) {
        return parseInt(number, 2)
    }

    generarHijo() {
        let padre = this.padre.cromosoma;
        let actual = this.cromosoma;
        this.hijo = actual.substr(0, 4) + padre.substr(4, 7)
    }

    mutarHijo() {
        let bit = this.hijo[this.bitMutacion]
        bit = bit == 0 ? 1 : 0
        this.hijoMutado = this.hijo.substr(0, this.bitMutacion) + bit + this.hijo.substr(this.bitMutacion + 1, this.hijo.length - 1)
        this.hijoResultante = this.toDecimal(this.hijoMutado)
    }

}