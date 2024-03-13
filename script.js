
$(document).ready(function () {
    // Función para verificar las credenciales del usuario y redirigir al menú
    $("#form").submit(function (event) {
        event.preventDefault();
        var nombreUsuario = $("#username").val();
        var password = $("#password").val();

        // Verificamos las credenciales
        verificarCredenciales(nombreUsuario, password);
    });

    // Función para verificar las credenciales del usuario
    function verificarCredenciales(username, password) {
        // Leer el archivo JSON
        $.getJSON('users.json', function (data) {
            var usuarioEncontrado = false;

            $.each(data, function (index, user) {
                // Verificamos si el usuario y la contraseña son correctos
                if (user.username === username && user.password === password) {
                    // Guardamos el saldo y el nombre de usuario en localStorage
                    saldo = user.saldo;
                    localStorage.setItem('saldo', saldo);
                    localStorage.setItem('username', username);
                    usuarioEncontrado = true;
                    return false; // Termina el bucle si encuentra una coincidencia
                }
            });
            // Redirigimos al menú si el usuario fue encontrado
            if (usuarioEncontrado) {
                window.location.href = 'menu.html';
            } else {
                // Mostramos un mensaje de error si el usuario no fue encontrado
                alert("Contraseña o usuario incorrectos");
            }
        });
    }
    // Función para sumar dinero al saldo del usuario
    $(".paymentForm").submit(function (event) {
        event.preventDefault();

        // Obtenemos el monto ingresado por el usuario
        var amount = parseFloat($("input[name='number']").val());

        // Verificamos si el monto es válido
        if (!isNaN(amount) && amount > 0) {

            // Obtenemos el saldo actual del usuario
            var currentBalance = localStorage.getItem('saldo');
            // Lo convertimos a número
            var currentBalance = parseFloat(currentBalance);
            // Sumamos el monto ingresado al saldo actual
            var newBalance = currentBalance + amount;
            // Actualizamos el saldo en localStorage
            localStorage.setItem('saldo', newBalance);
            // Actualizamos el saldo en el HTML
            document.getElementById("saldo").innerHTML = " " + newBalance;
        } else {
            // Mostramos un mensaje de error si el monto no es válido
            alert("Por favor, ingrese un monto válido.");
        }
    });
});

// Recolección de datos de usuario
$(document).ready(function(){
    let user = localStorage.getItem('username');
    let saldo = localStorage.getItem('saldo');

    // seteamos el id username con jquery
    $('#username').text(user);
    $('#saldo').text(saldo);
});
