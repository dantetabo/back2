const fs = require ('fs');

class Contenedor {
    constructor (name){
        this.nombre = name
    };
    
    async save (informacion){
        try{
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            let ultimoIndice = contenidoJson.length - 1;
            let ultimoId = contenidoJson[ultimoIndice].id;
            informacion.id = ultimoId + 1 ;
            let id = informacion.id;
            contenidoJson.push(informacion);
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(contenidoJson) )

            return id
        }

        catch (error){
            console.log(error)
        }
    };

    async getById (id){
        try{
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            contenidoJson = contenidoJson.filter(item => item.id == id)
            
            return contenidoJson
        }
        catch(error){
            console.log(error)
        }

    };

    async getAll () {
        try{
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            return contenidoJson
        }
        catch(error){
            console.log(error)
        };

    };
    
    async deleteById (id) {
        try {
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            contenidoJson = contenidoJson.filter(item => item.id != id)
            
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(contenidoJson))
        } catch (error) {
            console.log(error)
        }

    };

    async deleteAll () {
        try {
            await fs.promises.writeFile(`./${this.nombre}`, [])

        } catch (error) {
            console.log(`Error in function deleteAll: ${error}`)
        }
    };
    
};

let contenedor = new Contenedor(`producto.json`)

let informacionNueva = {
    title: 'tijera',                                                                                                                                 
    price: 125.45,                                                                                                                                     
};

// contenedor.save(informacionNueva).then ( respuesta => {
//     console.log (respuesta)

// })

contenedor.getById(2).then( result => {
    console.log(result)
})

// contenedor.getAll().then( result => {
//     console.log(result)
// })

// contenedor.deleteById(1).then(result => {
//     console.log(`Enter delete By id`)
// })
// contenedor.deleteAll().then(result => {
//     console.log(`Enter delete all`)
// })