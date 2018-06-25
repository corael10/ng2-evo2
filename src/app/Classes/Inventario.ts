import { Producto,ProductoInventario } from '../Classes/Producto';
export class Inventario {

    constructor(
        public id: number,
        public folio: string,        
        public proveedor: string,
        public fecha: string,
        public fecha_proveedor: string,
        public total: number,
        public productos: Array<ProductoInventario>,
        
        ) {

    }
}
export class Unidad {
    constructor(
        public unidades: number,  
                      
        ) {
    }
}


