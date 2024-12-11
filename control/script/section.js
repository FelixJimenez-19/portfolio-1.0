/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/control/script/contact.js
*/
// MAIN INI
const main = async () => {
    await entity.section.crud.select();
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
            entity.section.index = index;
            if (index !== null) {
                entity.view.form.section_id.value = entity.section.database[index].section_id;
                entity.view.form.section_titulo.value = entity.section.database[index].section_titulo;
                entity.view.form.section_prioridad.value = entity.section.database[index].section_prioridad;
                // entity.view.form.usuario_id.value = entity.section.database[index].usuario_id;
            }
            entity.view.modalForm.style.top = '0%';
        },


        hideModalForm: () => {
            entity.section.index = null;
            entity.view.form.section_id.value = "";
            entity.view.form.section_titulo.value = "";
            entity.view.form.section_prioridad.value = "";
            // entity.view.form.usuario_id.value = "";

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
                    <td>${ register.section_titulo }</td>
                    <td>${ register.section_prioridad }</td>
                    <td>
                        <button onclick="entity.fun.showModalForm(${ index })">
                            <img src="view/src/icon/edit.png">
                        </button>
                        <button onclick="entity.fun.showModalConfirm('¿Esta seguro de eliminar este registro?', () => entity.section.index = ${ index })">
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
                for (let i = 0; i < entity.section.database.length; i++) {
                    if (
                        textSearch === entity.section.database[i].section_id.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.section.database[i].section_titulo.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.section.database[i].section_prioridad.substring(0, textSearch.length).toLowerCase() 
                        // textSearch === entity.section.database[i].usuario_id.substring(0, textSearch.length).toLowerCase()
                    ) {
                        html += entity.fun.getHtmlTr(entity.section.database[i], i);
                    }
                }
                entity.view.table.innerHTML = html;
            } else {
                entity.section.fun.select();
            }
        },

    },
    section: {
        database: [],
        index: null,
        fun: {

            select: () => {
                let html = "";
                for (let i = 0; i < entity.section.database.length; i++) {
                    html += entity.fun.getHtmlTr(entity.section.database[i], i);
                }
                entity.view.table.innerHTML = html;
            },


            insertOrUpdate: () => {
                if (
                    entity.view.form.section_titulo.value !== "" &&
                    entity.view.form.section_prioridad.value !== "" &&
                    entity.view.form.usuario_id.value !== ""
                ) {
                    if (entity.section.index === null) {
                        entity.section.crud.insert();
                    } else {
                        entity.section.crud.update();
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
                await SectionDao.selectByUsuarioId(formData).then(res => {
                    entity.section.database = res;
                    entity.section.fun.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            insert: () => {
               
                SectionDao.insert(new FormData(entity.view.form)).then(res => {
                    entity.section.crud.select();
                    entity.fun.hideModalForm();
                    console.log("bug encontrado");
                    console.log(res);
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            update: () => {
                SectionDao.update(new FormData(entity.view.form)).then(res => {
                    entity.section.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            delete: () => {
                let formData = new FormData();
                formData.append("section_id", entity.section.database[entity.section.index].section_id);
                SectionDao.delete(formData).then(res => {
                    entity.section.crud.select();
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