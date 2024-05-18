document.addEventListener('DOMContentLoaded', function () {
    function renderData() {
        const dataDisplay = document.getElementById('dataDisplay');
        dataDisplay.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const data = JSON.parse(localStorage.getItem(key));

            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${data.InputName}</h5>
                    <p class="card-text">Teléfono: ${data.InputPhone}</p>
                    <p class="card-text">Email: ${data.InputEmail}</p>
                    <p class="card-text">Pedido: ${data.InputPedido}</p>
                    <button class="btn btn-primary btnEdit" data-key="${key}">Editar</button>
                    <button class="btn btn-danger btnDelete" data-key="${key}">Eliminar</button>
                </div>
            `;
            dataDisplay.appendChild(card);
        }
        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll('.btnEdit').forEach(button => {
            button.addEventListener('click', function () {
                const key = this.getAttribute('data-key');
                const data = JSON.parse(localStorage.getItem(key));

                document.getElementById('editInputLlamada').value = data.InputLlamada;
                document.getElementById('editInputPhone').value = data.InputPhone;
                document.getElementById('editInputName').value = data.InputName;
                document.getElementById('editInputCC').value = data.InputCC;
                document.getElementById('editInputContrato').value = data.InputContrato;
                document.getElementById('editInputEmail').value = data.InputEmail;
                document.getElementById('editInputDireccion').value = data.InputDireccion;
                document.getElementById('editInputPedido').value = data.InputPedido;
                document.getElementById('editInputRadicado').value = data.InputRadicado;
                document.getElementById('editInputSolucion').value = data.InputSolucion;
                document.getElementById('editInputResultado').value = data.InputResultado;
                document.getElementById('editInputDescripcion').value = data.InputDescripcion;
                document.getElementById('editInputGeneratedNumbers').value = data.generatedNumbers;
                document.getElementById('editColecteCheckbox').checked = data.colecteCheckbox;

                document.getElementById('btnUpdate').setAttribute('data-key', key);

                const editModal = new bootstrap.Modal(document.getElementById('editModal'));
                editModal.show();
            });
        });

        document.querySelectorAll('.btnDelete').forEach(button => {
            button.addEventListener('click', function () {
                const key = this.getAttribute('data-key');
                localStorage.removeItem(key);
                renderData();
            });
        });
    }

    document.getElementById('btnAdd').addEventListener('click', () => {
        const data = {
            InputLlamada: document.getElementById('InputLlamada').value,
            InputPhone: document.getElementById('InputPhone').value,
            InputName: document.getElementById('InputName').value,
            InputCC: document.getElementById('InputCC').value,
            InputContrato: document.getElementById('InputContrato').value,
            InputEmail: document.getElementById('InputEmail').value,
            InputDireccion: document.getElementById('InputDireccion').value,
            InputPedido: document.getElementById('InputPedido').value,
            InputRadicado: document.getElementById('InputRadicado').value,
            InputSolucion: document.getElementById('InputSolucion').value,
            InputResultado: document.getElementById('InputResultado').value,
            InputDescripcion: document.getElementById('InputDescripcion').value,
            generatedNumbers: document.getElementById('generatedNumbers').value,
            colecteCheckbox: document.getElementById('colecteCheckbox').checked,
        };

        const key = data.InputPhone + '_' + data.InputPedido;
        localStorage.setItem(key, JSON.stringify(data));
        renderData();
    });

    document.getElementById('btnUpdate').addEventListener('click', () => {
        const key = document.getElementById('btnUpdate').getAttribute('data-key');

        const data = {
            InputLlamada: document.getElementById('editInputLlamada').value,
            InputPhone: document.getElementById('editInputPhone').value,
            InputName: document.getElementById('editInputName').value,
            InputCC: document.getElementById('editInputCC').value,
            InputContrato: document.getElementById('editInputContrato').value,
            InputEmail: document.getElementById('editInputEmail').value,
            InputDireccion: document.getElementById('editInputDireccion').value,
            InputPedido: document.getElementById('editInputPedido').value,
            InputRadicado: document.getElementById('editInputRadicado').value,
            InputSolucion: document.getElementById('editInputSolucion').value,
            InputResultado: document.getElementById('editInputResultado').value,
            InputDescripcion: document.getElementById('editInputDescripcion').value,
            generatedNumbers: document.getElementById('editInputGeneratedNumbers').value,
            colecteCheckbox: document.getElementById('editColecteCheckbox').checked,
        };

        localStorage.setItem(key, JSON.stringify(data));
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.hide();
        renderData();
    });

    document.getElementById('btnSave').addEventListener('click', () => {
        let dataStr = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const data = localStorage.getItem(key);
            dataStr += data + '\n';
        }
        const blob = new Blob([dataStr], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.txt';
        a.click();
        URL.revokeObjectURL(url);
    });

    document.getElementById('btnClear').addEventListener('click', () => {
        localStorage.clear();
        renderData();
    });

    renderData();
});
              
