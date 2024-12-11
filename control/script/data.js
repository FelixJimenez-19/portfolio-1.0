
const main = async () => {
    await entity.data.crud.select();
    await entity.selects.section();
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
            entity.data.index = index;
            if (index !== null) {
                entity.view.form.data_id.value = entity.data.database[index].data_id;
                entity.view.form.data_titulo.value = entity.data.database[index].data_titulo;
                entity.view.form.data_detalle.value = entity.data.database[index].data_detalle;
                entity.view.form.data_fecha.value = entity.data.database[index].data_fecha;
                entity.view.form.section_id.value = entity.data.database[index].section_id;
            }
            entity.view.modalForm.style.top = '0%';
        },


        hideModalForm: () => {
            entity.data.index = null;
            entity.view.form.data_id.value = "";
            entity.view.form.data_titulo.value = "";
            entity.view.form.data_detalle.value = "";
            entity.view.form.data_fecha.value = "";
            entity.view.form.section_id.value = "";
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
            entity.data.index = null;
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
    <td>${register.data_id}</td>
    <td>${register.data_titulo}</td>
    <td>${register.data_detalle}</td>
    <td>${register.data_fecha}</td>
    <td>${register.section_titulo}</td>
    
    <td>
    <button onclick="entity.fun.showModalForm(${index})"><img src="view/src/icon/edit.png"></button>
    <button onclick="entity.fun.showModalConfirm('¿Esta seguro de eliminar este registro?', () => entity.data.index = ${index})">
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
                for (let i = 0; i < entity.data.database.length; i++) {
                    if (
                        textSearch === entity.data.database[i].data_id.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.data.database[i].data_titulo.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.data.database[i].data_detalle.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.data.database[i].data_fecha.substring(0, textSearch.length).toLowerCase()
                        // textSearch === entity.data.database[i].section_id.substring(0, textSearch.length).toLowerCase()
                    ) {
                        html += entity.fun.getHtmlTr(entity.data.database[i], i);
                    }
                }
                entity.view.table.innerHTML = html;
            } else {
                entity.data.fun.select();
            }
        },

    },
    data: {
        database: [],
        index: null,
        fun: {

            select: () => {
                let html = "";
                for (let i = 0; i < entity.data.database.length; i++) {
                    html += entity.fun.getHtmlTr(entity.data.database[i], i);
                }
                entity.view.table.innerHTML = html;
            },


            insertOrUpdate: () => {
                if (
                    entity.view.form.data_titulo.value !== "" &&
                    entity.view.form.data_detalle.value !== "" &&
                    entity.view.form.data_fecha.value !== "" &&
                    entity.view.form.section_id.value !== ""
                ) {

                    console.log(entity.view.form.data_titulo.value);
                    console.log(entity.view.form.data_detalle.value);
                    console.log(entity.view.form.data_fecha.value);
                    console.log(entity.view.form.section_id.value);

                    if (entity.data.index === null) {
                        entity.data.crud.insert();
                        console.log("insertamos");
                    } else {
                        entity.data.crud.update();
                        console.log("actualizamos");
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
                await DataDao.selectByUsuarioId(formData).then(res => {
                    entity.data.database = res;
                    entity.data.fun.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            insert: () => {
                DataDao.insert(new FormData(entity.view.form)).then(res => {
                    entity.data.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            update: () => {
                
                DataDao.update(new FormData(entity.view.form)).then(res => {
                    entity.data.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    console.log(res);
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
            delete: () => {
                let formData = new FormData();
                formData.append("data_id", entity.data.database[entity.data.index].data_id);
                DataDao.delete(formData).then(res => {
                    entity.data.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            }
        }
    },

    selects: {

        section: async () => {
            await SectionDao.select().then(res => {
                let html = `<option value="">SECTION</option>`;

                for (let i = 0; i < res.length; i++) {
                    if(res[i].usuario_id==master_usuario_id){

                        html += `
                        <option value="${res[i].section_id}">${res[i].section_titulo}</option>
                        `;
                    }
                }
                entity.view.form.section_id.innerHTML = html;
            });
        }

    }

}
// EVENTS
entity.view.form.onsubmit = (evt) => entity.fun.submitForm(evt);
entity.view.search.onkeyup = (evt) => entity.fun.search(evt);
// MAIN CALL
main();

