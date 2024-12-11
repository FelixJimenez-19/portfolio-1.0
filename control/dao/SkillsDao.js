/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/control/dao/SkillsDao.js
*/
SkillsDao = {

    select: () => {
        return fetch(config.getUrl() + "model/script/skills/select.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json')
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    selectById: (formData) => {
        return fetch(config.getUrl() + "model/script/skills/selectById.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },

    selectByUsuarioId: (formData) => {
        return fetch(config.getUrl() + "model/script/skills/selectByUsuarioId.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    insert: (formData) => {
        return fetch(config.getUrl() + "model/script/skills/insert.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    update: (formData) => {
        return fetch(config.getUrl() + "model/script/skills/update.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    delete: (formData) => {
        return fetch(config.getUrl() + "model/script/skills/delete.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },



}