document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".copyButton").forEach(button => {
        button.addEventListener("click", () => copyToClipboard(button.dataset.target));
    });

    document.querySelectorAll(".pasteButton").forEach(button => {
        button.addEventListener("click", () => pasteFromClipboard(button.dataset.target));
    });

    document.querySelector(".generateButton").addEventListener("click", generateNumber);

    ReadData();
});

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand("copy");
}

function pasteFromClipboard(elementId) {
    const element = document.getElementById(elementId);
    navigator.clipboard.readText().then(text => {
        element.value = text;
    }).catch(err => {
        console.error('Failed to read clipboard contents: ', err);
    });
}

function generateNumber() {
    const randomNum = Math.floor(Math.random() * 1e20).toString().padStart(20, '0');
    document.getElementById("generatedNumbers").value = randomNum;
}

function ReadData() {
    let listPeople = JSON.parse(localStorage.getItem("listPeople")) || [];
    listPeople.sort((a, b) => b.timestamp - a.timestamp); // Ordenar por timestamp descendente
    let cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    listPeople.forEach((element, index) => {
        let card = document.createElement("div");
        card.className = "col-md-4";
        card.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">ID: ${element.id}</h5>
                    <p class="card-text"><strong>Teléfono:</strong> ${element.telefono}</p>
                    <p class="card-text"><strong>Nombre:</strong> ${element.nombre}</p>
                    <p class="card-text"><strong>Cédula:</strong> ${element.cedula}</p>
                    <p class="card-text"><strong>Contrato:</strong> ${element.contrato}</p>
                    <p class="card-text"><strong>Email:</strong> ${element.email}</p>
                    <p class="card-text"><strong>Dirección:</strong> ${element.direccion}</p>
                    <p class="card-text"><strong>Pedido:</strong> ${element.pedido}</p>
                    <p class="card-text"><strong>Radicado:</strong> ${element.radicado}</p>
                    <p class="card-text"><strong>Solución:</strong> ${element.solucion}</p>
                    <p class="card-text"><strong>Resultado:</strong> ${element.resultado}</p>
                    <p class="card-text"><strong>Descripción:</strong> ${element.descripcion}</p>
                    <p class="card-text"><strong>ID Rescate:</strong> ${element.idrescate}</p>
                    <p class="card-text"><strong>Colecte:</strong> ${element.colecte}</p>
                    <button class="btn btn-outline-light" onclick="deleteData(${index})">Eliminar</button>
                    <button class="btn btn-outline-light" data-toggle="modal" data-target="#editModal" onclick="openEditModal(${index})">Editar</button>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

function AddData() {
    let inputLlamada = document.getElementById("InputLlamada").value;
    let inputPhone = document.getElementById("InputPhone").value;
    let inputName = document.getElementById("InputName").value;
    let inputCedula = document.getElementById("InputCedula").value;
    let inputContrato = document.getElementById("InputContrato").value;
    let inputEmail = document.getElementById("InputEmail").value;
    let inputDireccion = document.getElementById("InputDireccion").value;
    let inputPedido = document.getElementById("InputPedido").value;
    let inputRadicado = document.getElementById("InputRadicado").value;
    let inputSolucion = document.getElementById("InputSolucion").value;
    let inputResultado = document.getElementById("InputResultado").value;
    let inputDescripcion = document.getElementById("InputDescripcion").value;
    let generatedNumbers = document.getElementById("generatedNumbers").value;
    let colecteCheckbox = document.getElementById("colecteCheckbox").checked ? "Si" : "No";

    let listPeople = JSON.parse(localStorage.getItem("listPeople")) || [];
    listPeople.push({
        id: inputLlamada,
        telefono: inputPhone,
        nombre: inputName,
        cedula: inputCedula,
        contrato: inputContrato,
        email: inputEmail,
        direccion: inputDireccion,
        pedido: inputPedido,
        radicado: inputRadicado,
        solucion: inputSolucion,
        resultado: inputResultado,
        descripcion: inputDescripcion,
        idrescate: generatedNumbers,
        colecte: colecteCheckbox,
        timestamp: Date.now()
    });

    localStorage.setItem("listPeople", JSON.stringify(listPeople));
    ReadData();
    document.getElementById("mainForm").reset();
}

function deleteData(index) {
    let listPeople = JSON.parse(localStorage.getItem("listPeople")) || [];
    listPeople.splice(index, 1);
    localStorage.setItem("listPeople", JSON.stringify(listPeople));
    ReadData();
}

function openEditModal(index) {
    let listPeople = JSON.parse(localStorage.getItem("listPeople")) || [];
    document.getElementById("editInputLlamada").value = listPeople[index].id;
    document.getElementById("editInputPhone").value = listPeople[index].telefono;
    document.getElementById("editInputName").value = listPeople[index].nombre;
    document.getElementById("editInputCedula").value = listPeople[index].cedula;
    document.getElementById("editInputContrato").value = listPeople[index].contrato;
    document.getElementById("editInputEmail").value = listPeople[index].email;
    document.getElementById("editInputDireccion").value = listPeople[index].direccion;
    document.getElementById("editInputPedido").value = listPeople[index].pedido;
    document.getElementById("editInputRadicado").value = listPeople[index].radicado;
    document.getElementById("editInputSolucion").value = listPeople[index].solucion;
    document.getElementById("editInputResultado").value = listPeople[index].resultado;
    document.getElementById("editInputDescripcion").value = listPeople[index].descripcion;
    document.getElementById("editGeneratedNumbers").value = listPeople[index].idrescate;
    document.getElementById("editColecteCheckbox").checked = listPeople[index].colecte === "Si";

    document.getElementById("saveChangesButton").onclick = function () {
        saveChanges(index);
    };
}

function saveChanges(index) {
    let listPeople = JSON.parse(localStorage.getItem("listPeople")) || [];
    listPeople[index].id = document.getElementById("editInputLlamada").value;
    listPeople[index].telefono = document.getElementById("editInputPhone").value;
    listPeople[index].nombre = document.getElementById("editInputName").value;
    listPeople[index].cedula = document.getElementById("editInputCedula").value;
    listPeople[index].contrato = document.getElementById("editInputContrato").value;
    listPeople[index].email = document.getElementById("editInputEmail").value;
    listPeople[index].direccion = document.getElementById("editInputDireccion").value;
    listPeople[index].pedido = document.getElementById("editInputPedido").value;
    listPeople[index].radicado = document.getElementById("editInputRadicado").value;
    listPeople[index].solucion = document.getElementById("editInputSolucion").value;
    listPeople[index].resultado = document.getElementById("editInputResultado").value;
    listPeople[index].descripcion = document.getElementById("editInputDescripcion").value;
    listPeople[index].idrescate = document.getElementById("editGeneratedNumbers").value;
    listPeople[index].colecte = document.getElementById("editColecteCheckbox").checked ? "Si" : "No";

    localStorage.setItem("listPeople", JSON.stringify(listPeople));
    ReadData();
    $('#editModal').modal('hide');
}
