export class Proveedor {

    constructor(
        public id: number,
        public nombre: string,        
        public fecha_registro: string,
        public direccion?: string,
        public ciudad?: string,
        public telefono?: string,
        public saldo?: string, 
        ) {
    }
}