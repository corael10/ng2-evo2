export class Producto {

    constructor(public id: number,
        public nombre: string,        
        public marca: string,
        public descripcion?: string,
        public familia?: string,
        public precio_proveedor?: number, 
        public unidades?: number,
        public precio_1?: number,
        public precio_2?: number,
        public precio_3?: number,) {

    }
}

export class PrecioPromo {

    constructor(   
        public id:number,        
        public precio?: number, 
        public activa?: boolean, 
        public quitar?: boolean,
        ) {

    }
}
export class ProductoInventario {

    constructor( 
        public id: number,
        public codigo: string,           
        public nombre: string,
        public familia: string,
        public precio_proveedor: string,
        public unidades?: number,
        public total?: number,
    ) { 

    }
}
export class Marca {

    constructor(public id: number,       
        public nombre?: string,
        public proveedor?: string) {

    }
}
export class Familia {

    constructor(
        public id: number,       
        public nombre?: string,
        public descripcion?: string,
        public marca?: string,
        public promoactiva?: string,
        
    ) {

    }
}

