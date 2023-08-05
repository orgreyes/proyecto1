import { Dropdown } from "bootstrap";
import { error } from "jquery";
import Swal from "sweetalert2";
import { ValidarFormulario, Toast } from "../funciones"


const formulario = document.querySelector('form')
const tablaProductos = document.getElementById('tablaProductos');
const btnBuscar = document.getElementById('btnBuscar');
const btnModificar = document.getElementById('btnModificar')
const btnGuardar = document.getElementById('btnGuardar')
const btnCancelar = document.getElementById('btnCancelar')
const divTabla = document.getElementById('divTabla')


btnModificar.disabled = true
btnModificar.parentElement.style.display = 'none'
btnCancelar.disabled = true
btnCancelar.parentElement.style.display = 'none'


//!Funciones

const guardar = async (evento) => {
    evento.preventDefault();

    if (!validarFormulario(formulario,['producto_id'])){
        alert('Debe llenar todos los campos');
        return;
    }

    const body = new FormData(formulario)
    body.append('tipo', 1)
    body.delete('producto_id')
    const url ='/CRUD_JS/CRUD_JS_REYES/controladores/productos/index.php';
    const config = {
        method : 'POST',
        body
    }

    try{
        const respuesta = await fetch(url,config)
        const data = await respuesta.json();

        const {codigo, mensaje, detalle} = data;

        switch (codigo) {
            case 1:
                formulario.reset();
                buscar();
                
                break;

        case 0:
                console.log(detalle);
                
                break;
            default:
                break;
        }

    alert(mensaje);


        console.log(data);
    }catch (error){
        console.log(error)
    }
}



//!Evento para Guardar Informacion.


const buscar =  async () => {
    let producto_nombre = formulario.producto_nombre.value;
    let producto_precio = formulario.producto_precio.value;
    const url =`/CRUD_JS/CRUD_JS_REYES/controladores/productos/index.php?producto_nombre=${producto_nombre}&producto_precio=${producto_precio}`;
    const config = {
        method : 'GET',
    }

    try{
        const respuesta = await fetch(url,config)
        const data = await respuesta.json();

        console.log(tablaProductos.tBodies[0].innerHTML = '');

        //!Para crear tablas de forma automatica.
        const fragment=document.createDocumentFragment();

        if(data.length > 0){
            let contador = 1;
            data.forEach(producto => {
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                const td3 = document.createElement('td');
                const td4 = document.createElement('td');
                const td5 = document.createElement('td');
                const buttonModificar = document.createElement('button');
                const buttonEliminar = document.createElement('button');

                buttonModificar.classList.add('btn', 'btn-warning');
                buttonEliminar.classList.add('btn', 'btn-danger');
                buttonModificar.textContent = 'Modificar';
                buttonEliminar.textContent = 'Eliminar';

                buttonModificar.addEventListener('click', () =>  colocarDatos(producto))
                buttonEliminar.addEventListener('click', () =>  eliminar(producto.PRODUCTO_ID))

                td1.innerText = contador;
                td2.innerText = producto.PRODUCTO_NOMBRE
                td3.innerText = producto.PRODUCTO_PRECIO
                
                td4.appendChild(buttonModificar);
                td5.appendChild(buttonEliminar);
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tr.appendChild(td5)

                fragment.appendChild(tr);
                contador++;

            })
        }else{
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.innerText = 'No existe Registros';
            td.colSpan = 5
            tr.appendChild(td)
            fragment.appendChild(tr);

        };

        tablaProductos.tBodies[0].appendChild(fragment)

    }catch (error){
        console.log(error)
    }
}



const colocarDatos = (datos) => {
    formulario.producto_nombre.value = datos.PRODUCTO_NOMBRE
    formulario.producto_precio.value = datos.PRODUCTO_PRECIO
    formulario.producto_id.value = datos.PRODUCTO_ID

    btnGuardar.disabled = true
    btnGuardar.parentElement.style.display = 'none'
    btnBuscar.disabled = true
    btnBuscar.parentElement.style.display = 'none'
    btnModificar.disabled = false
    btnModificar.parentElement.style.display = ''
    btnCancelar.disabled = false
    btnCancelar.parentElement.style.display = ''
    divTabla.style.display = 'none'
}

const cancelarAccion = () => {
    btnGuardar.disabled = false
    btnGuardar.parentElement.style.display = ''
    btnBuscar.disabled = false
    btnBuscar.parentElement.style.display = ''
    btnModificar.disabled = true
    btnModificar.parentElement.style.display = 'none'
    btnCancelar.disabled = true
    btnCancelar.parentElement.style.display = 'none'
    divTabla.style.display = ''
}

const eliminar = (id) =>{
    alert('eliminando')
}


buscar();
formulario.addEventListener('submit', guardar)
btnBuscar.addEventListener('click', buscar)
btnCancelar.addEventListener('click', cancelarAccion)

// Swal.fire({
//     title: 'Error!',
//     text: 'Do yo want to continue',
//     icon: 'error',
//     confirmButtonText: 'Cool'

// })