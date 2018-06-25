export class Cliente {

    constructor(
        public id: number, 
        public nombre: string,       
        public fecha_registro: string,
        public empleado: string,
        public direccion?: string,
        public telefono?: string,
        public ciudad?: string,
        public saldo?: number,) { 

    }
}
export class Rango {

    constructor(
        public fechaD: string, 
        public fechaA: string,       
        ) { 

    }
}

