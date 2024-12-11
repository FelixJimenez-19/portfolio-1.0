
const main = async () => {
    await entity.usuario.crud.select();

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
            entity.usuario.index = index;
            if (index !== null) {
                entity.view.form.usuario_id.value = entity.usuario.database[index].usuario_id;
                entity.view.form.usuario_nombre.value = entity.usuario.database[index].usuario_nombre;
                entity.view.form.usuario_profesion.value = entity.usuario.database[index].usuario_profesion;
                entity.view.form.usuario_email.value = entity.usuario.database[index].usuario_email;
                entity.view.form.usuario_pass.value = entity.usuario.database[index].usuario_pass;
                entity.view.form.usuario_descripcion.value = entity.usuario.database[index].usuario_descripcion;
                entity.view.form.usuario_experiencia.value = entity.usuario.database[index].usuario_experiencia;
                entity.view.form.usuario_proyectos.value = entity.usuario.database[index].usuario_proyectos;
                entity.view.form.usuario_segundos.value = entity.usuario.database[index].usuario_segundos;
                entity.view.form.usuario_authorize.value = entity.usuario.database[index].usuario_authorize;

                entity.view.form.usuario_nacimiento.value = entity.usuario.database[index].usuario_nacimiento;
                entity.view.form.usuario_direccion.value = entity.usuario.database[index].usuario_direccion;
                entity.view.form.usuario_celular.value = entity.usuario.database[index].usuario_celular;
                entity.view.form.usuario_cuidad.value = entity.usuario.database[index].usuario_cuidad;
                entity.view.form.usuario_estado_civil.value = entity.usuario.database[index].usuario_estado_civil;
                entity.view.form.usuario_cedula.value = entity.usuario.database[index].usuario_cedula;

            }
            entity.view.modalForm.style.top = '0%';
        },


        hideModalForm: () => {
            entity.usuario.index = null;
            entity.view.form.usuario_id.value = "";
            entity.view.form.usuario_nombre.value = "";
            entity.view.form.usuario_profesion.value = "";
            entity.view.form.usuario_email.value = "";
            entity.view.form.usuario_pass.value = "";
            entity.view.form.usuario_descripcion.value = "";
            entity.view.form.usuario_experiencia.value = "";
            entity.view.form.usuario_proyectos.value = "";
            entity.view.form.usuario_segundos.value = "";
            entity.view.form.usuario_authorize.value = "";
            entity.view.form.usuario_nacimiento.value = "";
            entity.view.form.usuario_direccion.value = "";
            entity.view.form.usuario_celular.value = "";
            entity.view.form.usuario_cuidad.value = "";
            entity.view.form.usuario_estado_civil.value = "";
            entity.view.form.usuario_cedula.value = "";
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
            entity.usuario.index = null;
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
                    <td>${register.usuario_nombre}</td>
                    <td>${register.usuario_profesion}</td>
                    <td>${register.usuario_email}</td>
                    <td><img src="${(register.usuario_foto !== null) ? 'view/src/files/usuario_foto/' + register.usuario_foto : 'view/src/img/avatar.png'}"/></td>
                    <td><img src="${(register.usuario_logo !== null) ? 'view/src/files/usuario_logo/' + register.usuario_logo : 'view/src/img/avatar.png'}"/></td>
                    <td><img src="${(register.usuario_portada1 !== null) ? 'view/src/files/usuario_portada1/' + register.usuario_portada1 : 'view/src/img/avatar.png'}"/></td>
                    <td><img src="${(register.usuario_portada2 !== null) ? 'view/src/files/usuario_portada2/' + register.usuario_portada2 : 'view/src/img/avatar.png'}"/></td>
                    <td><a target="_blank" href="model/script/usuario/curriculum.php?usuario_id=${register.usuario_id}" ><img src='view/src/icon/link.png' /></a></td>
                    <td>
                        <button onclick="entity.fun.showModalForm(${index})">
                            <img src="view/src/icon/edit.png">
                        </button>
                        <button onclick="entity.fun.showModalConfirm('¿Esta seguro de eliminar este registro?', () => entity.usuario.index = ${index})">
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
                for (let i = 0; i < entity.usuario.database.length; i++) {
                    if (
                        textSearch === entity.usuario.database[i].usuario_id.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_nombre.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_profesion.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_email.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_pass.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_descripcion.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_experiencia.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_proyectos.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_segundos.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_authorize.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_nacimiento.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_direccion.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_celular.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_cuidad.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_estado_civil.substring(0, textSearch.length).toLowerCase() ||
                        textSearch === entity.usuario.database[i].usuario_cedula.substring(0, textSearch.length).toLowerCase()
                    ) {
                        html += entity.fun.getHtmlTr(entity.usuario.database[i], i);
                    }
                }
                entity.view.table.innerHTML = html;
            } else {
                entity.usuario.fun.select();
            }
        },

    },
    usuario: {
        database: [],
        index: null,
        fun: {

            select: () => {
                let html = "";
                for (let i = 0; i < entity.usuario.database.length; i++) {
                    html += entity.fun.getHtmlTr(entity.usuario.database[i], i);
                }
                entity.view.table.innerHTML = html;
            },


            insertOrUpdate: () => {
                if (
                    entity.view.form.usuario_nombre.value !== "" &&
                    entity.view.form.usuario_profesion.value !== "" &&
                    entity.view.form.usuario_email.value !== "" &&
                    entity.view.form.usuario_pass.value !== "" &&
                    entity.view.form.usuario_descripcion.value !== "" &&
                    entity.view.form.usuario_experiencia.value !== "" &&
                    entity.view.form.usuario_proyectos.value !== "" &&
                    entity.view.form.usuario_segundos.value !== "" &&
                    entity.view.form.usuario_authorize.value !== "" &&
                    entity.view.form.usuario_nacimiento.value !== "" &&
                    entity.view.form.usuario_direccion.value !== "" &&
                    entity.view.form.usuario_celular.value !== "" &&
                    entity.view.form.usuario_cuidad.value !== "" &&
                    entity.view.form.usuario_estado_civil.value !== "" &&
                    entity.view.form.usuario_cedula.value !== ""
                ) {
    if (entity.usuario.index === null) {
        entity.usuario.crud.insert();
    } else {
        entity.usuario.crud.update();
    }
} else {
    entity.fun.showModalMessage("Debe llenar todos los campos!");
}
            },

        },
crud: {
    select: async () => {
        if (master_usuario_authorize == 1) {
            await UsuarioDao.select().then(res => {
                entity.usuario.database = res;
                entity.usuario.fun.select();
                entity.fun.hideModalForm();
            }).catch(res => {
                entity.fun.showModalMessage("Problemas al conectar con el servidor");
            });
        } else {
            let formData = new FormData();
            formData.append("usuario_id", master_usuario_id);
            await UsuarioDao.selectById(formData).then(res => {
                entity.usuario.database = res;
                entity.usuario.fun.select();
                entity.fun.hideModalForm();
            }).catch(res => {
                entity.fun.showModalMessage("Problemas al conectar con el servidor");
            });
        }
    },
        insert: () => {
            UsuarioDao.insert(new FormData(entity.view.form)).then(res => {
                entity.usuario.crud.select();
                entity.fun.hideModalForm();
            }).catch(res => {
                entity.fun.showModalMessage("Problemas al conectar con el servidor");
            });
        },
            update: () => {
                UsuarioDao.update(new FormData(entity.view.form)).then(res => {
                    entity.usuario.crud.select();
                    entity.fun.hideModalForm();
                }).catch(res => {
                    entity.fun.showModalMessage("Problemas al conectar con el servidor");
                });
            },
                delete: () => {
                    let formData = new FormData();
                    formData.append("usuario_id", entity.usuario.database[entity.usuario.index].usuario_id);
                    UsuarioDao.delete(formData).then(res => {
                        entity.usuario.crud.select();
                        entity.fun.hideModalForm();
                    }).catch(res => {
                        entity.fun.showModalMessage("Problemas al conectar con el servidor");
                    });
                }
}
    },

selects: {

}

}
// EVENTS
entity.view.form.onsubmit = (evt) => entity.fun.submitForm(evt);
entity.view.search.onkeyup = (evt) => entity.fun.search(evt);
// MAIN CALL
main();