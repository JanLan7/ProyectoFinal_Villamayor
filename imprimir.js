document.addEventListener("DOMContentLoaded", function() {
    mostrarUltimasFrasesSesion();

    let carrito = [];

    document.getElementById("botonAgregarCarrito").addEventListener("click", function() {
        let frase = document.getElementById("fraseSeleccionada").innerText;
        if (frase) {
            agregarAlCarrito(frase);
        } else {
            Swal.fire("Error", "Seleccione una frase para agregar al carrito.", "error");
        }
    });

    document.getElementById("botonVerCarrito").addEventListener("click", function() {
        mostrarCarrito();
    });

    document.getElementById("botonEliminarCarrito").addEventListener("click", function() {
        eliminarCarrito();
    });

    document.getElementById("botonComprar").addEventListener("click", function() {
        seleccionarMetodoPago();
    });

    function mostrarUltimasFrasesSesion() {
        let frasesSesion = JSON.parse(localStorage.getItem("frases")) || [];
        let lista = document.getElementById("ultimasFrases");
        lista.innerHTML = "";
        frasesSesion.forEach(function(frase) {
            let li = document.createElement("li");
            li.textContent = frase;
            li.addEventListener("click", function() {
                document.getElementById("fraseSeleccionada").innerText = frase;
            });
            lista.appendChild(li);
        });
    }

    function agregarAlCarrito(frase) {
        carrito.push(frase);
        Swal.fire("Agregado", "Frase agregada al carrito", "success");
    }

    function mostrarCarrito() {
        let listaCarrito = document.getElementById("listaCarrito");
        listaCarrito.innerHTML = "";
        carrito.forEach(function(item) {
            let li = document.createElement("li");
            li.textContent = item;
            listaCarrito.appendChild(li);
        });
    }

    function eliminarCarrito() {
        carrito = [];
        mostrarCarrito();
        Swal.fire("Eliminado", "Carrito eliminado", "success");
    }

    function seleccionarMetodoPago() {
        if (carrito.length > 0) {
            Swal.fire({
                title: 'Seleccione el método de pago',
                input: 'radio',
                inputOptions: {
                    'crypto': 'Criptomonedas',
                    'tarjeta': 'Tarjeta de Crédito'
                },
                inputValidator: (value) => {
                    if (!value) {
                        return 'Debe seleccionar un método de pago';
                    }
                }
            }).then((result) => {
                if (result.value) {
                    if (result.value === 'crypto') {
                        pagarConCrypto();
                    } else {
                        pagarConTarjeta();
                    }
                }
            });
        } else {
            Swal.fire("Error", "El carrito está vacío.", "error");
        }
    }

    function pagarConCrypto() {
        Swal.fire({
            title: 'Ingrese su dirección de criptomoneda',
            input: 'text',
            inputPlaceholder: 'Dirección de criptomoneda',
            showCancelButton: true,
            confirmButtonText: 'Pagar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                confirmarCompra();
            }
        });
    }

    function pagarConTarjeta() {
        Swal.fire({
            title: 'Ingrese los datos de su tarjeta de crédito',
            html: `
                <input type="text" id="numeroTarjeta" class="swal2-input" placeholder="Número de tarjeta">
                <input type="text" id="fechaExpiracion" class="swal2-input" placeholder="Fecha de expiración">
                <input type="text" id="cvv" class="swal2-input" placeholder="CVV">
            `,
            showCancelButton: true,
            confirmButtonText: 'Pagar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const numeroTarjeta = Swal.getPopup().querySelector('#numeroTarjeta').value;
                const fechaExpiracion = Swal.getPopup().querySelector('#fechaExpiracion').value;
                const cvv = Swal.getPopup().querySelector('#cvv').value;
                if (!numeroTarjeta || !fechaExpiracion || !cvv) {
                    Swal.showValidationMessage('Por favor, complete todos los campos');
                }
                return { numeroTarjeta, fechaExpiracion, cvv };
            }
        }).then((result) => {
            if (result.value) {
                confirmarCompra();
            }
        });
    }

    function confirmarCompra() {
        Swal.fire({
            title: '¿Está seguro de que quiere comprar esto?',
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                let total = carrito.length * 5;
                Swal.fire("Gracias por su compra!", `Ha comprado ${carrito.length} frases como NFT. Total: $${total}`, "success");
                carrito = [];
                mostrarCarrito();
            }
        });
    }
});