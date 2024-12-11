/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/control/dao/ServicesDao.js
*/
ServicesDao = {

    select: () => {
        return fetch(config.getUrl() + "model/script/services/select.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json')
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    selectByUsuarioId: (formData) => {
        return fetch(config.getUrl() + "model/script/services/selectByUsuarioId.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    insert: (formData) => {
        return fetch(config.getUrl() + "model/script/services/insert.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    update: (formData) => {
        return fetch(config.getUrl() + "model/script/services/update.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    delete: (formData) => {
        return fetch(config.getUrl() + "model/script/services/delete.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },



}