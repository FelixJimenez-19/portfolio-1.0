
const main = async () => {
    await entity.componente.crud.select();
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
            entity.componente.index = index;
            if (index !== null) {
                entity.view.form.componente_id.value = entity.componente.database[index].componente_id;
                entity.view.form.componente_nombre.value = entity.componente.database[index].componente_nombre;
                entity.view.form.componente_prioridad.value = entity.componente.database[index].componente_prioridad;
                entity.view.form.componente_archivo.value = entity.componente.database[index].componente_archivo;
            }
            entity.view.modalForm.style.top = '0%';
        },


        hideModalForm: () => {
            entity.componente.index = null;
            entity.view.form.componente_id.value = "";
            entity.view.form.componente_nombre.value = "";
            entity.view.form.componente_prioridad.value = "";
            entity.view.form.componente_archivo.value = "";
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
            entity.componente.index = null;
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
                <td>${ register.componente_nombre }</td>
                <td>${ register.componente_prioridad }</td>
                <td>${ register.componente_archivo }</td>
                <td>
                    <button onclick="entity.fun.showModalForm(${ index })">
                        <img src="view/src/icon/edit.png">
                    </button>
                    <button onclick="entity.fun.showModalConfirm('¿Esta seguro de eliminar este registro?', () => entity.componente.index = ${ index })">
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
                for (let i = 0; i < entity.componente.database.length; i++) {
                    if (
                        textSearch === entity.componente.database[i].componente_id.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.componente.database[i].componente_nombre.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.componente.database[i].componente_prioridad.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.componente.database[i].componente_archivo.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.componente.database[i].usuario_id.substring(0, textSearch.length).toLowerCase()
                    ) {
                        html += entity.fun.getHtmlTr(entity.componente.database[i], i);
                    }
                }
                entity.view.table.innerHTML = html;
            } else {
                entity.componente.fun.select();
            }
        },

    },
    componente: {
        database: [],
        index: null,
        fun: {

            select: () => {
                let html = "";
                for (let i = 0; i < entity.componente.database.length; i++) {
                    html += entity.fun.getHtmlTr(entity.componente.database[i], i);
                }
                entity.view.table.innerHTML = html;
            },


            insertOrUpdate: () => {
                if (
                    entity.view.form.componente_nombre.value !== "" &&
                    entity.view.form.componente_prioridad.value !== "" &&
                    entity.view.form.componente_archivo.value !== "" &&
                    entity.view.form.usuario_id.value !== ""
                ) {
                    if (entity.componente.index === null) {
                        entity.componente.crud.insert();
                    } else {
                        entity.componente.crud.update();
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
                await ComponenteDao.selectByUsuarioId(formData).then(res => {
                    entity.componente.database = res;
                    entity.componente.fun.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            insert: () => {
                ComponenteDao.insert(new FormData(entity.view.form)).then(res => {
                    entity.componente.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            update: () => {
                ComponenteDao.update(new FormData(entity.view.form)).then(res => {
                    entity.componente.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            delete: () => {
                let formData = new FormData();
                formData.append("componente_id", entity.componente.database[entity.componente.index].componente_id);
                ComponenteDao.delete(formData).then(res => {
                    entity.componente.crud.select();
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