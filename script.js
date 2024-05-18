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
                    <button class="btn btn-outline-light" onclick="editData(${index})">Editar</button>
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

function editData(index) {
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("btnUpdate").style.display = "block";

    let listPeople = JSON.parse(localStorage.getItem("listPeople")) || [];
    document.getElementById("InputLlamada").value = listPeople[index].id;
    document.getElementById("InputPhone").value = listPeople[index].telefono;
    document.getElementById("InputName").value = listPeople[index].nombre;
    document.getElementById("InputCedula").value = listPeople[index].cedula;
    document.getElementById("InputContrato").value = listPeople[index].contrato;
    document.getElementById("InputEmail").value = listPeople[index].email;
    document.getElementById("InputDireccion").value = listPeople[index].direccion;
    document.getElementById("InputPedido").value = listPeople[index].pedido;
    document.getElementById("InputRadicado").value = listPeople[index].radicado;
    document.getElementById("InputSolucion").value = listPeople[index].solucion;
    document.getElementById("InputResultado").value = listPeople[index].resultado;
    document.getElementById("InputDescripcion").value = listPeople[index].descripcion;
    document.getElementById("generatedNumbers").value = listPeople[index].idrescate;
    document.getElementById("colecteCheckbox").checked = listPeople[index].colecte === "Si";

    document.querySelector("#btnUpdate").onclick = function() {
        listPeople[index].id = document.getElementById("InputLlamada").value;
        listPeople[index].telefono = document.getElementById("InputPhone").value;
        listPeople[index].nombre = document.getElementById("InputName").value;
        listPeople[index].cedula = document.getElementById("InputCedula").value;
        listPeople[index].contrato = document.getElementById("InputContrato").value;
        listPeople[index].email = document.getElementById("InputEmail").value;
        listPeople[index].direccion = document.getElementById("InputDireccion").value;
        listPeople[index].pedido = document.getElementById("InputPedido").value;
        listPeople[index].radicado = document.getElementById("InputRadicado").value;
        listPeople[index].solucion = document.getElementById("InputSolucion").value;
        listPeople[index].resultado = document.getElementById("InputResultado").value;
        listPeople[index].descripcion = document.getElementById("InputDescripcion").value;
        listPeople[index].idrescate = document.getElementById("generatedNumbers").value;
        listPeople[index].colecte = document.getElementById("colecteCheckbox").checked ? "Si" : "No";

        localStorage.setItem("listPeople", JSON.stringify(listPeople));
        ReadData();
        document.getElementById("mainForm").reset();
        document.getElementById("btnAdd").style.display = "block";
        document.getElementById("btnUpdate").style.display = "none";
    }
}

function saveDataToFile() {
    let listPeople = localStorage.getItem("listPeople");
    if (!listPeople) {
        console.log("No hay datos para guardar.");
        return;
    }

    let blob = new Blob([listPeople], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
