// Funcion de generar numeros de 20 digitos
function generateNumbers() {
    var currentDate = new Date();
    var timestamp = currentDate.getFullYear().toString() + padNumber(currentDate.getMonth() + 1) + padNumber(currentDate.getDate()) + padNumber(currentDate.getHours()) + padNumber(currentDate.getMinutes()) + padNumber(currentDate.getSeconds());
    var generatedNumbers = "0000" + timestamp + "000000000000000000";
    return generatedNumbers.substring(0, 20);
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

document.querySelector('.generateButton').addEventListener('click', function() {
    var generatedNumbers = generateNumbers();
    document.getElementById('generatedNumbers').value = generatedNumbers;
});

document.querySelectorAll('.copyButton').forEach(function(button) {
    button.addEventListener('click', function() {
        var textarea = this.parentNode.querySelector('textarea');
        if (textarea) {
            copyToClipboard(textarea.value);
        }
    });
});

document.querySelectorAll('.pasteButton').forEach(function(button) {
    button.addEventListener('click', function() {
        var textarea = this.parentNode.querySelector('textarea');
        if (textarea) {
            pasteFromClipboard(function(clipboardText) {
                textarea.value = clipboardText;
                console.log('Contenido pegado del portapapeles: ' + clipboardText);
            });
        }
    });
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(function() {
            console.log('Contenido copiado al portapapeles: ' + text);
        })
        .catch(function(error) {
            console.error('Error al copiar al portapapeles: ', error);
        });
}

function pasteFromClipboard(callback) {
    navigator.clipboard.readText()
        .then(function(clipboardText) {
            callback(clipboardText);
        })
        .catch(function(error) {
            console.error('Error al pegar desde el portapapeles: ', error);
        });
}

// Funcion para leer los datos almacenados
function ReadData() {
    let listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }
    var html = "";
    listPeople.forEach(function(element, index) {
        html += "<tr>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.telefono + "</td>";
        html += "<td>" + element.nombre + "</td>";
        html += "<td>" + element.cedula + "</td>";
        html += "<td>" + element.contrato + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.direccion + "</td>";
        html += "<td>" + element.pedido + "</td>";
        html += "<td>" + element.radicado + "</td>";
        html += "<td>" + element.solucion + "</td>";
        html += "<td>" + element.resultado + "</td>";
        html += "<td>" + element.descripcion + "</td>";
        html += "<td>" + element.idrescate + "</td>";
        html += "<td>" + element.colecte + "</td>";
        html += '<td><button class="btn btn-outline-light" onclick="deleteData(' + index + ')">Eliminar</button>';
        html += '<button class="btn btn-outline-light" onclick="editData(' + index + ')">Editar</button></td>';
        html += "</tr>";
    });
    document.querySelector("#tableData tbody").innerHTML = html;
}

document.onload = ReadData();

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

    let listPeople;
    if (localStorage.getItem("listPeople") == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }
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
        colecte: colecteCheckbox
    });

    localStorage.setItem("listPeople", JSON.stringify(listPeople));
    ReadData();
    document.getElementById("mainForm").reset();
}

function deleteData(index) {
    let listPeople;
    if (localStorage.getItem("listPeople") == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }
    listPeople.splice(index, 1);
    localStorage.setItem("listPeople", JSON.stringify(listPeople));
    ReadData();
}

function editData(index) {
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("btnUpdate").style.display = "block";

    let listPeople;
    if (localStorage.getItem("listPeople") == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }
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
