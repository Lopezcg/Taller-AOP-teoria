


function cargaNotas() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/api/notas/" + id );
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHTML = "";
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                trHTML += "<tr>";
                trHTML += "<td>" + object["id"] + "</td>";
                trHTML += "<td>" + object["observacion"] + "</td>";
                trHTML += "<td>" + object["valor"] + "</td>";
                trHTML += "<td>" + object["porcentaje"] + "</td>";
                trHTML +=
                    '<td><button type="button" class="btn btn-outline-secondary" onclick="actualizarNota(' + object["id"] + ', ' + object["estudiante_id"] + ')">Editar</button>';
                trHTML +=
                    '<button type="button" class="btn btn-outline-danger" onclick="borrarNota(' +  object["id"] + ')">Borrar</button></td>';
                trHTML += "</tr>";
            }
            document.getElementById("mytable").innerHTML = trHTML;

        }

    };
}
cargaNotas();
function crearNota(){
    Swal.fire({
        title: "Crear Nota",
        html:
            '<input id="id" type="hidden">' +
            '<input id="observacion" class="swal2-input"  placeholder="Observacion">' +
            '<input id="valor" class="swal2-input" placeholder="Valor">' +
            '<input id="porcentaje" class="swal2-input" placeholder="Porcentaje">',
        focusConfirm: false,
        preConfirm: () => {
            creaNota();
        },
    });
}
function creaNota(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const observacion = document.getElementById("observacion").value;
    const valor = document.getElementById("valor").value;
    const porcentaje = document.getElementById("porcentaje").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/api/crearnota");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            observacion: observacion,
            valor: parseFloat(valor),
            porcentaje: parseFloat(porcentaje),
            estudianteId:id
        })
    );
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects["message"]);
            cargaNotas();
        }
    };
}
function actualizarNota(id,estudiante_id){
    Swal.fire({
        title: "Editar Nota",
        html:
            '<input id="id" type="hidden">' +
            '<input id="observacion" class="swal2-input"  placeholder="Observacion">' +
            '<input id="valor" class="swal2-input" placeholder="Valor">' +
            '<input id="porcentaje" class="swal2-input" placeholder="Porcentaje">',
        focusConfirm: false,
        preConfirm: () => {
            editarNota(id,estudiante_id);
        },
    });
}

function editarNota(id,estudiante_id){
    const observacion = document.getElementById("observacion").value;
    const valor = document.getElementById("valor").value;
    const porcentaje = document.getElementById("porcentaje").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:8080/api/act/" + id );
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            observacion: observacion,
            valor: valor,
            porcentaje: porcentaje,

        })
    );
    console.log("holaerror");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects["message"]);
            cargaNotas();
        }
    };
}
function borrarNota(id){
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:8080/api/borra/" + id );
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            id: id,
        })
    );
    xhttp.onreadystatechange = function () {
        if (this.status == 204) {
            Swal.fire("Nota Borrada");
            cargaNotas();
        }
    };
}
