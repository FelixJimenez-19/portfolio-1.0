
const main = async () => {
    await entity.works.crud.select();
}
// MASTER OBJECT INI
const entity = {
    view: {
        table: document.getElementById("idea_table"),
        modalForm: document.getElementById("idea_modal_form"),
        form: document.getElementById("idea_form"),
        modalMessage: document.getElementById("idea_modal_message"),
        message: document.getElementById("idea_message"),
        modalConfirm: document.getElementById("idea_modal_confirm"),
        confirm: document.getElementById("idea_confirm"),
        search: document.getElementById("idea_search")
    },
    fun: {

        showModalForm: (index) => {
            entity.works.index = index;
            if (index !== null) {
                entity.view.form.works_id.value = entity.works.database[index].works_id;
                entity.view.form.works_nombre.value = entity.works.database[index].works_nombre;
                entity.view.form.works_descripcion.value = entity.works.database[index].works_descripcion;
                entity.view.form.works_link.value = entity.works.database[index].works_link;
            }
            entity.view.modalForm.style.top = '0%';
        },


        hideModalForm: () => {
            entity.works.index = null;
            entity.view.form.works_id.value = "";
            entity.view.form.works_nombre.value = "";
            entity.view.form.works_descripcion.value = "";
            entity.view.form.works_link.value = "";
            entity.view.modalForm.style.top = '-100%';
        },

        showModalMessage: (msg) => {
            entity.view.modalMessage.style.top = '0%';
            entity.view.message.innerHTML = msg;
        },
        hideModalMessage: () => {
            entity.view.modalMessage.style.top = '-100%';
            entity.view.message.innerHTML = '';
        },
        showModalConfirm: (msg, action) => {
            entity.view.modalConfirm.style.top = '0%';
            entity.view.confirm.innerHTML = msg;
            action();
        },
        hideModalConfirm: () => {
            entity.works.index = null;
            entity.view.modalConfirm.style.top = '-100%';
            entity.view.confirm.innerHTML = '';
        },
        pressYesModalConfirm: (action) => {
            action();
            entity.fun.hideModalConfirm();
        },
        submitForm: (evt) => {
            evt.preventDefault();
        },

        getHtmlTr: (register, index) => {
            return `
                <tr>
                    <td>${ register.works_nombre }</td>
                    <td>${ register.works_link }</td>
                    <td><img src="${ (register.works_imagen !== null) ? 'view/src/files/works_imagen/' + register.works_imagen : 'view/src/img/avatar.png' }"/></td>
                    <td>
                        <button onclick="entity.fun.showModalForm(${ index })">
                            <img src="view/src/icon/edit.png">
                        </button>
                        <button onclick="entity.fun.showModalConfirm('¿Esta seguro de eliminar este registro?', () => entity.works.index = ${ index })">
                            <img src="view/src/icon/delete.png">
                        </button>
                    </td>
                </tr>
            `;
        },


        search: (evt) => {
            let textSearch = evt.srcElement.value.toLowerCase();
            if (textSearch !== "") {
                let html = "";
                for (let i = 0; i < entity.works.database.length; i++) {
                    if (
                        textSearch === entity.works.database[i].works_id.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.works.database[i].works_nombre.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.works.database[i].works_descripcion.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.works.database[i].works_link.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.works.database[i].usuario_id.substring(0, textSearch.length).toLowerCase()
                    ) {
                        html += entity.fun.getHtmlTr(entity.works.database[i], i);
                    }
                }
                entity.view.table.innerHTML = html;
            } else {
                entity.works.fun.select();
            }
        },

    },
    works: {
        database: [],
        index: null,
        fun: {

            select: () => {
                let html = "";
                for (let i = 0; i < entity.works.database.length; i++) {
                    html += entity.fun.getHtmlTr(entity.works.database[i], i);
                }
                entity.view.table.innerHTML = html;
            },


            insertOrUpdate: () => {
                if (
                    entity.view.form.works_nombre.value !== "" &&
                    entity.view.form.works_descripcion.value !== "" &&
                    entity.view.form.works_link.value !== "" &&
                    entity.view.form.usuario_id.value !== ""
                ) {
                    if (entity.works.index === null) {
                        entity.works.crud.insert();
                    } else {
                        entity.works.crud.update();
                    }
                } else {
                    entity.fun.showModalMessage("Debe llenar todos los campos!");
                }
            },

        },
        crud: {
            select: async () => {
                let formData = new FormData();
                formData.append("usuario_id", master_usuario_id);
                await WorksDao.selectByUsuarioId(formData).then(res => {
                    entity.works.database = res;
                    entity.works.fun.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            insert: () => {
                WorksDao.insert(new FormData(entity.view.form)).then(res => {
                    entity.works.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            update: () => {
                WorksDao.update(new FormData(entity.view.form)).then(res => {
                    entity.works.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            delete: () => {
                let formData = new FormData();
                formData.append("works_id", entity.works.database[entity.works.index].works_id);
                WorksDao.delete(formData).then(res => {
                    entity.works.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            }
        }
    }

}
// EVENTS
entity.view.form.onsubmit = (evt) => entity.fun.submitForm(evt);
entity.view.search.onkeyup = (evt) => entity.fun.search(evt);
// MAIN CALL
main();