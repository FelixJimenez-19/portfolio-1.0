/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/control/dao/MailboxDao.js
*/
MailboxDao = {

    select: () => {
        return fetch(config.getUrl() + "model/script/mailbox/select.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json')
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    selectByUsuarioId: (formData) => {
        return fetch(config.getUrl() + "model/script/mailbox/selectByUsuarioId.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    insert: (formData) => {
        return fetch(config.getUrl() + "model/script/mailbox/insert.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    update: (formData) => {
        return fetch(config.getUrl() + "model/script/mailbox/update.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    delete: (formData) => {
        return fetch(config.getUrl() + "model/script/mailbox/delete.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },



}