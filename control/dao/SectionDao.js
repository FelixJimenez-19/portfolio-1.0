
SectionDao = {

    select: () => {
        return fetch(config.getUrl() + "model/script/section/select.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json')
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    selectById: (formData) => {
        return fetch(config.getUrl() + "model/script/section/selectById.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },
    selectByUsuarioId: (formData) => {
        return fetch(config.getUrl() + "model/script/section/selectByUsuarioId.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    insert: (formData) => {
        return fetch(config.getUrl() + "model/script/section/insert.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    update: (formData) => {
        return fetch(config.getUrl() + "model/script/section/update.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },


    delete: (formData) => {
        return fetch(config.getUrl() + "model/script/section/delete.php", {
            method: "POST",
            headers: new Headers().append('Accept', 'application/json'),
            body: formData
        }).then(res => res.json()).then(res => {
            return res;
        });
    },



}

