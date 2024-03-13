// Creamos un array para guardar los contactos y sus transacciones
const contactos = [];

// Recuperamos las transacciones del local storage
const contactos_storage = localStorage.getItem('contactos');

// Función para agregar un contacto y enviar dinero
function agregarContacto(){
    const nombre = document.getElementById('nombre').value;
    const cuenta = document.getElementById('cuenta').value;
    const alias = document.getElementById('alias').value;
    const banco = document.getElementById('banco').value;
    const monto = document.getElementById('monto').value;
    // recuperamos el saldo del usuario
    const saldo = localStorage.getItem('saldo');
    const saldo_int = parseInt(saldo);
    // comparamos si el monto es mayor al saldo
    if (monto > saldo_int) {
        alert('No tienes suficiente saldo');
        return;
    }

    // restamos el monto al saldo
    new_saldo = saldo_int - monto;
    localStorage.setItem('saldo', new_saldo);
    contactos.push({nombre, cuenta, alias, banco, monto});
    // Guardamos el array de contactos en el local storage
    localStorage.setItem('contactos', JSON.stringify(contactos));

    // Mostramos las transacciones
    mostrarContactos(contactos);

    // Limpiamos los campos
    document.getElementById('nombre').value = '';
    document.getElementById('cuenta').value = '';
    document.getElementById('alias').value = '';
    document.getElementById('banco').value = '';
    document.getElementById('monto').value = '';
}

// Función para mostrar las transacciones
function mostrarContactos(contacto) {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    contacto.forEach((contacto, index) => {

        // Creamos un elemento tr
        const tr = document.createElement('tr');
        // Le agregamos el contenido
        tr.innerHTML = 
        `
            <td>${contacto.nombre}</td>
            <td>${contacto.cuenta}</td>
            <td>${contacto.alias}</td>
            <td>${contacto.banco}</td>
            <td>${contacto.monto}</td>
        `;
        contactList.appendChild(tr);
    });
}

// Función para recuperar las transacciones del local storage
function recoverTransactions(contactos_storage){
    // Si no hay transacciones, no hacemos nada
    if (!contactos_storage) {
        return
    }
    // Si hay transacciones, las recuperamos y las mostramos en la tabla
    const contactos = JSON.parse(contactos_storage);
    mostrarContactos(contactos);
}

// Recuperamos las transacciones para las tablas
recoverTransactions(contactos_storage);