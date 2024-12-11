/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/control/dao/config.js
*/
config = {
    protocol: "http",
    host: "localhost",
    proyect: "portfolio",
    getUrl: () => {
        // return `${ config.protocol }://${ config.host }/${ config.proyect }/`;
        return "./";
    }
}