import { Cliente } from '../Classes/Cliente';
import { Empleado } from '../Classes/Empleado';
export class Cobranza {

    constructor(
        public id: number, 
        public cliente: string,       
        public empleado: string,
        public fecha: string,
        public abono?: string,
        public total?: string,
        public status?: string,
        ) { 

    }
}

export class Cobranzaformulario{
    constructor(
public cliente: Cliente,
public empleado: Empleado
    ){

    }
}