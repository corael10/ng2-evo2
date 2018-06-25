export class Empleado {

    constructor(
        public id: number, 
        public nombre: string, 
        public apellido: string,        
        public fecha_contra: string,
        public direccion?: string,
        public telefono?: string,
        public ciudad?: string,
        public estatus?: number,
        public saldo?: number,
    ) { 

    }
}