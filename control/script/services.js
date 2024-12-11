/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/control/script/services.js
*/
// MAIN INI
const main = async () => {
    await entity.services.crud.select();
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
            entity.services.index = index;
            if (index !== null) {
                entity.view.form.services_id.value = entity.services.database[index].services_id;
                entity.view.form.services_nombre.value = entity.services.database[index].services_nombre;
                entity.view.form.services_descripcion.value = entity.services.database[index].services_descripcion;
            }
            entity.view.modalForm.style.top = '0%';
        },


        hideModalForm: () => {
            entity.services.index = null;
            entity.view.form.services_id.value = "";
            entity.view.form.services_nombre.value = "";
            entity.view.form.services_descripcion.value = "";
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
            entity.services.index = null;
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
                    <td>${ register.services_nombre }</td>
                    <td>${ register.services_descripcion }</td>
                    <td>
                        <button onclick="entity.fun.showModalForm(${ index })">
                            <img src="view/src/icon/edit.png">
                        </button>
                        <button onclick="entity.fun.showModalConfirm('¿Esta seguro de eliminar este registro?', () => entity.services.index = ${ index })">
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
                for (let i = 0; i < entity.services.database.length; i++) {
                    if (
                        textSearch === entity.services.database[i].services_id.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.services.database[i].services_nombre.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.services.database[i].services_descripcion.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.services.database[i].usuario_id.substring(0, textSearch.length).toLowerCase()
                    ) {
                        html += entity.fun.getHtmlTr(entity.services.database[i], i);
                    }
                }
                entity.view.table.innerHTML = html;
            } else {
                entity.services.fun.select();
            }
        },

    },
    services: {
        database: [],
        index: null,
        fun: {

            select: () => {
                let html = "";
                for (let i = 0; i < entity.services.database.length; i++) {
                    html += entity.fun.getHtmlTr(entity.services.database[i], i);
                }
                entity.view.table.innerHTML = html;
            },


            insertOrUpdate: () => {
                if (
                    entity.view.form.services_nombre.value !== "" &&
                    entity.view.form.services_descripcion.value !== "" &&
                    entity.view.form.usuario_id.value !== ""
                ) {
                    if (entity.services.index === null) {
                        entity.services.crud.insert();
                    } else {
                        entity.services.crud.update();
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
                await ServicesDao.selectByUsuarioId(formData).then(res => {
                    entity.services.database = res;
                    entity.services.fun.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            insert: () => {
                ServicesDao.insert(new FormData(entity.view.form)).then(res => {
                    entity.services.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            update: () => {
                ServicesDao.update(new FormData(entity.view.form)).then(res => {
                    entity.services.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            delete: () => {
                let formData = new FormData();
                formData.append("services_id", entity.services.database[entity.services.index].services_id);
                ServicesDao.delete(formData).then(res => {
                    entity.services.crud.select();
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