const fs = require ('fs');

class Contenedor {
    constructor (name){
        this.name = name
    };

    async save (informacion){
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            let ultimoIndice = contenidoJson.length - 1;
            let ultimoId = contenidoJson[ultimoIndice].id;
            informacion.id = ultimoId + 1 ;
            let id = informacion.id;
            contenidoJson.push(informacion);
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidoJson) )

            return id
        }

        catch (error){
            console.log(error)
        }
    };

    async getById (id){
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            let contenidoExtraidoDelArray 
            contenidoJson.forEach(element => {
                if(element.id == id){
                    contenidoExtraidoDelArray = element
                }
            });
            return contenidoExtraidoDelArray

        }
        catch(error){
            console.log(error)
        }

    };

    async getAll () {
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            return contenidoJson
        }
        catch(error){

        };

    };
    
    async deleteById (id) {
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);

        }

        catch (error){
            console.log(error)
        }

    };

    async deleteAll () {

    };
    
};

let contenedor = new Contenedor(`producto.json`)

let informacionNueva = {
    title: 'tijera',                                                                                                                                 
    price: 125.45,                                                                                                                                     
    id: 1
};

contenedor.save(informacionNueva).then ( respuesta => {
    console.log (respuesta)

})

contenedor.getById(2).then( result => {
    console.log(result)
})

contenedor.getAll().then( result => {
    console.log(result)
})