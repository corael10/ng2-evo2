export class Application {

    constructor(
        public id: number, 
        public app_id: string,       
        public name: string,
        public version?: string,
        ) { 

    }
}


export class VersionApp {
    
        constructor(
            public id: number, 
            public version: string,             
            ) { 
    
        }
    }