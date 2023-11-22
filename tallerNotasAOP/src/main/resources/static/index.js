
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    // Si estamos en index.html, llamar a cargaEstudiantes()
    cargaEstudiantes();
}
function cargaEstudiantes() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8080/api/estudiantes");
  console.log("hola");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML += "<td>" + object["nombre"] + "</td>";
        trHTML += "<td>" + object["apellido"] + "</td>";
        trHTML += "<td>" + object["correo"] + "</td>";
        trHTML +=
          '<td><button type="button" class="btn btn-outline-secondary" onclick="actualizarEstudiante(' + object["id"] + ')">Editar</button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="cargaNotas(' + object["id"] + ')">Notas</button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="borrarEstudiante(' + object["id"] + ')">Borrar</button>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}


  function edicionEstudiante() {
    Swal.fire({
      title: "Crear Estudiante",
      html:
        '<input id="id" type="hidden">' +
        '<input id="nombre" class="swal2-input"  placeholder="Nombre">' +
        '<input id="apellido" class="swal2-input" placeholder="Apellido">' +
        '<input id="correo" class="swal2-input" placeholder="Correo">',
      focusConfirm: false,
      preConfirm: () => {
        creaEstudiante();
      },
    });
  }

  function creaEstudiante() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correo = document.getElementById("correo").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/api/crea");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        nombre: nombre,
        apellido: apellido,
        correo: correo
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        cargaEstudiantes();
      }
    };
  }

  function actualizarEstudiante(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/api/estudiante/" + id );
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const obj = JSON.parse(this.responseText);
        console.log(obj.nombre);
        Swal.fire({
          title: "Editar Estudiante",
          html:
            '<input id="id" type="hidden" value=' +
            obj.id +
            ">" +
            '<input id="nombre" class="swal2-input" placeholder="Nombre" value="' +
            obj.nombre +
            '">' +
            '<input id="apellido" class="swal2-input" placeholder="Apellido" value="' +
            obj.apellido +
            '">' +
            '<input id="correo" class="swal2-input" placeholder="Correo" value="' +
            obj.correo +
            '">',
          focusConfirm: false,
          preConfirm: () => {
            editarEstudiante(obj.id);
          },
        });
      }
    };
  }

  function editarEstudiante(id) {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correo = document.getElementById("correo").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:8080/api/act/" + id );
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        id: id,
        nombre: nombre,
        apellido: apellido,
        correo: correo,
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        cargaEstudiantes();
      }
    };
  }
  function borrarEstudiante(id) {
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
        Swal.fire("Estudiante Borrado");
        cargaEstudiantes();
      }
    };
  }

  //NOTAS
function cargaNotas(estudiante_id){
    window.location.href = `notas.html?id=${estudiante_id}`;
}
