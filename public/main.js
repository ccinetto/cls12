const socket = io.connect();
const nombre = document.getElementById('nombre');
const precio = document.getElementById('price');
const imagen = document.getElementById('thumbnail');

console.log(nombre);
console.log(precio);
console.log(imagen);
function sendMsg(e) {
  let mensaje = {
    nombre: nombre.value,
    precio: precio.value,
    imagen: imagen.value,
  };
  socket.emit('new-message', mensaje);
}

function render(data) {
  var html = data
    .map(function (elem, index) {
      return `<div>
                        <strong>${elem.nombre}</strong>
                        <em>${elem.precio}</em>
                        <em>${elem.imagen}</em>
                    </div>`;
    })
    .join(' ');

  document.getElementById('messages').innerHTML = html;
}

socket.on('messages', (data) => {
  console.log('Recibi Mensaje');

  render(data);
});

const form = document.getElementById('miForm');

form.addEventListener('submit', function (e) {
  console.log('HOLA');
  e.preventDefault();

  console.log('HACER AQUI EL POST REQUEST USANDO FETCH');
  const data = {
    title: nombre.value,
    price: precio.value,
    thumbnail: imagen.value,
  };

  const options = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  fetch('/api/productos/guardar', options)
    .then((data) => {
      console.log('TODO BIEN');
      console.log(data);
      console.log('LUEGO ACTUALIZAR LA INFO DE LA PAGINA AQUI');
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      return false;
    });
});
