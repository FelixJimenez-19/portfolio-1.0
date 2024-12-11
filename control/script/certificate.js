
const main = async () => {
    await entity.certificate.crud.select();
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
            entity.certificate.index = index;
            if (index !== null) {
                entity.view.form.certificate_id.value = entity.certificate.database[index].certificate_id;
                // entity.view.form.certificate_file.value = entity.certificate.database[index].certificate_file;
                entity.view.form.certificate_descripcion.value = entity.certificate.database[index].certificate_descripcion;
                entity.view.form.certificate_estado.value = entity.certificate.database[index].certificate_estado;
                // entity.view.form.usuario_id.value = entity.certificate.database[index].usuario_id;
            }
            entity.view.modalForm.style.top = '0%';
        },


        hideModalForm: () => {
            entity.certificate.index = null;
            entity.view.form.certificate_id.value = "";
            // entity.view.form.certificate_file.value = "";
            entity.view.form.certificate_descripcion.value = "";
            entity.view.form.certificate_estado.value = 1;
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
            entity.certificate.index = null;
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
            let estado='';
                if(register.certificate_estado==1){ estado='SI';}else{estado='NO';}
            return `
    <tr>
    <td>${register.certificate_descripcion}</td>
    <td><img src="${ (register.certificate_file !== null) ? 'view/src/files/certificate_file/' + register.certificate_file : 'view/src/img/avatar.png' }"/></td>
    <td>${estado}</td>
    <td>
    <button onclick="entity.fun.showModalForm(${index})"><img src="view/src/icon/edit.png"></button>
    <button onclick="entity.fun.showModalConfirm('¿Esta seguro de eliminar este registro?', () => entity.certificate.index = ${index})">
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
                for (let i = 0; i < entity.certificate.database.length; i++) {
                    if (
                        textSearch === entity.certificate.database[i].certificate_id.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.certificate.database[i].certificate_descripcion.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.certificate.database[i].certificate_estado.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.certificate.database[i].usuario_id.substring(0, textSearch.length).toLowerCase()
                    ) {
                        html += entity.fun.getHtmlTr(entity.certificate.database[i], i);
                    }
                }
                entity.view.table.innerHTML = html;
            } else {
                entity.certificate.fun.select();
            }
        },

    },
    certificate: {
        database: [],
        index: null,
        fun: {

            select: () => {
                let html = "";
                for (let i = 0; i < entity.certificate.database.length; i++) {
                    html += entity.fun.getHtmlTr(entity.certificate.database[i], i);
                }
                entity.view.table.innerHTML = html;
            },


            insertOrUpdate: () => {
                if (
                    // entity.view.form.certificate_file.value !== "" &&
                    entity.view.form.certificate_descripcion.value !== "" &&
                    entity.view.form.certificate_estado.value !== "" &&
                    entity.view.form.usuario_id.value !== ""
                ) {
                    if (entity.certificate.index === null) {
                        entity.certificate.crud.insert();
                    } else {
                        entity.certificate.crud.update();
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
                await CertificateDao.selectByUsuarioId(formData).then(res => {
                    entity.certificate.database = res;
                    entity.certificate.fun.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            insert: () => {
                CertificateDao.insert(new FormData(entity.view.form)).then(res => {
                    entity.certificate.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            update: () => {
                CertificateDao.update(new FormData(entity.view.form)).then(res => {
                    entity.certificate.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            delete: () => {
                let formData = new FormData();
                formData.append("certificate_id", entity.certificate.database[entity.certificate.index].certificate_id);
                CertificateDao.delete(formData).then(res => {
                    entity.certificate.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            }
        }
    },


}
// EVENTS
entity.view.form.onsubmit = (evt) => entity.fun.submitForm(evt);
entity.view.search.onkeyup = (evt) => entity.fun.search(evt);
// MAIN CALL
main();

