/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/control/dao/MailboxDao.js
*/



    DataDao = {

        select: () => {
            return fetch(config.getUrl() + "model/script/data/select.php", {
                method: "POST",
                headers: new Headers().append('Accept', 'application/json')
            }).then(res => res.json()).then(res => {
                return res;
            });
        },


        selectByUsuarioId: (formData) => {
            return fetch(config.getUrl() + "model/script/data/selectByUsuarioId.php", {
                method: "POST",
                headers: new Headers().append('Accept', 'application/json'),
                body: formData
            }).then(res => res.json()).then(res => {
                return res;
            });
        },

        selectById: (formData) => {
            return fetch(config.getUrl() + "model/script/data/selectById.php", {
                method: "POST",
                headers: new Headers().append('Accept', 'application/json'),
                body: formData
            }).then(res => res.json()).then(res => {
                return res;
            });
        },


        insert: (formData) => {
            return fetch(config.getUrl() + "model/script/data/insert.php", {
                method: "POST",
                headers: new Headers().append('Accept', 'application/json'),
                body: formData
            }).then(res => res.json()).then(res => {
                return res;
            });
        },


        update: (formData) => {
            return fetch(config.getUrl() + "model/script/data/update.php", {
                method: "POST",
                headers: new Headers().append('Accept', 'application/json'),
                body: formData
            }).then(res => res.json()).then(res => {
                return res;
            });
        },


        delete: (formData) => {
            return fetch(config.getUrl() + "model/script/data/delete.php", {
                method: "POST",
                headers: new Headers().append('Accept', 'application/json'),
                body: formData
            }).then(res => res.json()).then(res => {
                return res;
            });
        },



    }



