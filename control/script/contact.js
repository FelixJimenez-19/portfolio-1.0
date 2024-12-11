
const main = async () => {
    await entity.contact.crud.select();
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
            entity.contact.index = index;
            if (index !== null) {
                entity.view.form.contact_id.value = entity.contact.database[index].contact_id;
                entity.view.form.contact_nombre.value = entity.contact.database[index].contact_nombre;
                entity.view.form.contact_url.value = entity.contact.database[index].contact_url;
                entity.view.form.contact_icon.value = entity.contact.database[index].contact_icon;
            }
            entity.view.modalForm.style.top = '0%';
        },


        hideModalForm: () => {
            entity.contact.index = null;
            entity.view.form.contact_id.value = "";
            entity.view.form.contact_nombre.value = "";
            entity.view.form.contact_url.value = "";
            entity.view.form.contact_icon.value = "";
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
            entity.contact.index = null;
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
                    <td>${ register.contact_nombre }</td>
                    <td>${ register.contact_url }</td>
                    <td><i class="fa ${ register.contact_icon }"></i></td>
                    <td>
                        <button onclick="entity.fun.showModalForm(${ index })">
                            <img src="view/src/icon/edit.png">
                        </button>
                        <button onclick="entity.fun.showModalConfirm('¿Esta seguro de eliminar este registro?', () => entity.contact.index = ${ index })">
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
                for (let i = 0; i < entity.contact.database.length; i++) {
                    if (
                        textSearch === entity.contact.database[i].contact_id.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.contact.database[i].contact_nombre.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.contact.database[i].contact_url.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.contact.database[i].contact_icon.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.contact.database[i].usuario_id.substring(0, textSearch.length).toLowerCase()
                    ) {
                        html += entity.fun.getHtmlTr(entity.contact.database[i], i);
                    }
                }
                entity.view.table.innerHTML = html;
            } else {
                entity.contact.fun.select();
            }
        },

    },
    contact: {
        database: [],
        index: null,
        fun: {

            select: () => {
                let html = "";
                for (let i = 0; i < entity.contact.database.length; i++) {
                    html += entity.fun.getHtmlTr(entity.contact.database[i], i);
                }
                entity.view.table.innerHTML = html;
            },


            insertOrUpdate: () => {
                if (
                    entity.view.form.contact_nombre.value !== "" &&
                    entity.view.form.contact_url.value !== "" &&
                    entity.view.form.contact_icon.value !== "" &&
                    entity.view.form.usuario_id.value !== ""
                ) {
                    if (entity.contact.index === null) {
                        entity.contact.crud.insert();
                    } else {
                        entity.contact.crud.update();
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
                await ContactDao.selectByUsuarioId(formData).then(res => {
                    entity.contact.database = res;
                    entity.contact.fun.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            insert: () => {
                ContactDao.insert(new FormData(entity.view.form)).then(res => {
                    entity.contact.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            update: () => {
                ContactDao.update(new FormData(entity.view.form)).then(res => {
                    entity.contact.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            delete: () => {
                let formData = new FormData();
                formData.append("contact_id", entity.contact.database[entity.contact.index].contact_id);
                ContactDao.delete(formData).then(res => {
                    entity.contact.crud.select();
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