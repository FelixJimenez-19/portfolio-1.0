/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/control/script/mailbox.js
*/
// MAIN INI
const main = async () => {
    await entity.mailbox.crud.select();
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
            entity.mailbox.index = index;
            if (index !== null) {
                entity.view.form.mailbox_id.value = entity.mailbox.database[index].mailbox_id;
                entity.view.form.mailbox_nombre.value = entity.mailbox.database[index].mailbox_nombre;
                entity.view.form.mailbox_email.value = entity.mailbox.database[index].mailbox_email;
                entity.view.form.mailbox_mensaje.value = entity.mailbox.database[index].mailbox_mensaje;
            }
            entity.view.modalForm.style.top = '0%';
        },


        hideModalForm: () => {
            entity.mailbox.index = null;
            entity.view.form.mailbox_id.value = "";
            entity.view.form.mailbox_nombre.value = "";
            entity.view.form.mailbox_email.value = "";
            entity.view.form.mailbox_mensaje.value = "";
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
            entity.mailbox.index = null;
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
                    <td>${ register.mailbox_nombre }</td>
                    <td>${ register.mailbox_email }</td>
                    <td>${ register.mailbox_mensaje }</td>
                    <td>
                        <button onclick="entity.fun.showModalForm(${ index })">
                            <img src="view/src/icon/edit.png">
                        </button>
                        <button onclick="entity.fun.showModalConfirm('¿Esta seguro de eliminar este registro?', () => entity.mailbox.index = ${ index })">
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
                for (let i = 0; i < entity.mailbox.database.length; i++) {
                    if (
                        textSearch === entity.mailbox.database[i].mailbox_id.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.mailbox.database[i].mailbox_nombre.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.mailbox.database[i].mailbox_email.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.mailbox.database[i].mailbox_mensaje.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.mailbox.database[i].usuario_id.substring(0, textSearch.length).toLowerCase()
                    ) {
                        html += entity.fun.getHtmlTr(entity.mailbox.database[i], i);
                    }
                }
                entity.view.table.innerHTML = html;
            } else {
                entity.mailbox.fun.select();
            }
        },

    },
    mailbox: {
        database: [],
        index: null,
        fun: {

            select: () => {
                let html = "";
                for (let i = 0; i < entity.mailbox.database.length; i++) {
                    html += entity.fun.getHtmlTr(entity.mailbox.database[i], i);
                }
                entity.view.table.innerHTML = html;
            },


            insertOrUpdate: () => {
                if (
                    entity.view.form.mailbox_nombre.value !== "" &&
                    entity.view.form.mailbox_email.value !== "" &&
                    entity.view.form.mailbox_mensaje.value !== "" &&
                    entity.view.form.usuario_id.value !== ""
                ) {
                    if (entity.mailbox.index === null) {
                        entity.mailbox.crud.insert();
                    } else {
                        entity.mailbox.crud.update();
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
                await MailboxDao.selectByUsuarioId(formData).then(res => {
                    entity.mailbox.database = res;
                    entity.mailbox.fun.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            insert: () => {
                MailboxDao.insert(new FormData(entity.view.form)).then(res => {
                    entity.mailbox.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            update: () => {
                MailboxDao.update(new FormData(entity.view.form)).then(res => {
                    entity.mailbox.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            delete: () => {
                let formData = new FormData();
                formData.append("mailbox_id", entity.mailbox.database[entity.mailbox.index].mailbox_id);
                MailboxDao.delete(formData).then(res => {
                    entity.mailbox.crud.select();
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