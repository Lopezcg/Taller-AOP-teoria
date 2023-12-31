


function cargaNotas() {
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get('nombre');
    document.getElementById("studentName").innerText = "Teoría de la Computación - Estudiante: " + nombre;
    const id = urlParams.get('id');
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/api/notas/" + id );
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHTML = "";
            const objects = JSON.parse(this.responseText);
            let totalPorcentaje = 0;
            let totalValor = 0;
            for (let object of objects) {
                trHTML += "<tr>";
                trHTML += "<td>" + object["id"] + "</td>";
                trHTML += "<td>" + object["observacion"] + "</td>";
                trHTML += "<td>" + object["valor"] + "</td>";
                trHTML += "<td>" + object["porcentaje"] + "</td>";
                trHTML +=
                    '<td><button type="button" class="btn btn-outline-secondary" onclick="actualizarNota(' + object["id"] + ')">Editar</button>';
                trHTML +=
                    '<button type="button" class="btn btn-outline-danger" onclick="borrarNota(' +  object["id"] + ')">Borrar</button></td>';
                trHTML += "</tr>";
                totalPorcentaje+=object["porcentaje"];
                totalValor+=object["valor"]*object["porcentaje"]/100;
            }
            trHTML += "<tr><td>Con el porcentaje acumulado del " + totalPorcentaje + " %</td><td> la nota es: " + totalValor + "</td></tr>";
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
        console.log(this);
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire("Nota creada exitosamente.");
            cargaNotas();
        }else if(this.status== 403){
            Swal.fire("Error, el porcentaje total no puede superar el 100% ");
        }else if(this.status== 400){
            Swal.fire("Error, La nota no puede ser de 2 cifras");
        }else if(this.status== 204){
            Swal.fire("Error, Los valores de nota no pueden estar vacios");
        }
    };
}
function actualizarNota(id) {

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/api/nota/" + id );
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const obj = JSON.parse(this.responseText);
            console.log(obj.nombre);
            Swal.fire({
                title: "Editar Nota",
                html:
                    '<input id="id" type="hidden" value=' +
                    obj.id +
                    ">" +
                    '<input id="observacion" class="swal2-input" placeholder="Observacion" value="' +
                    obj.observacion +
                    '">' +
                    '<input id="valor" class="swal2-input" placeholder="Valor" value="' +
                    obj.valor +
                    '">' +
                    '<input id="porcentaje" class="swal2-input" placeholder="Porcentaje" value="' +
                    obj.porcentaje +
                    '">',
                focusConfirm: false,
                preConfirm: () => {
                    editarNota(obj.id);
                },
            });
        }
    };
}

function editarNota(id){
    const observacion = document.getElementById("observacion").value;
    const valor = document.getElementById("valor").value;
    const porcentaje = document.getElementById("porcentaje").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:8080/api/actnota/" + id );
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            observacion: observacion,
            valor: valor,
            porcentaje: porcentaje,
        })
    );

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire("Nota editada correctamente.");
            cargaNotas();
        }else if(this.status== 403){
            Swal.fire("Error, el porcentaje total no puede superar el 100%");
        } else if(this.status== 204){
            Swal.fire("Error, Los vaores de nota no pueden estar vacios");
        }   else if(this.status== 400){
        Swal.fire("Error, La nota no puede ser de 2 cifras");
    }
    }
}
function borrarNota(id){
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:8080/api/borranota/" + id );
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            id: id,
        })
    );
    xhttp.onreadystatechange = function () {
        
            Swal.fire("Nota Borrada");
            cargaNotas();
        
    };
}
