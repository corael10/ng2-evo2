export class Pedido {

    constructor(
        public id: number,
        public cliente: string,
        public empleado: string,
        public empleadosustituto: String,
        public fecha: string,        
        public total: number,
        public productos: Array<ProductoPedido>,
    ) {

    }
    
    
}

export class ProductoPedido {

    constructor( 
        public id: number,
        public codigo: string,           
        public nombre: string,
        public familia: string,
        public precio: string,
        public unidades?: number,
        public total?: number,
    ) { 

    }
}