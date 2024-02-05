/* eslint-disable camelcase */
const clients_list = document.querySelector('#clients_list')
const clients_table = document.querySelector('#clients-table')
const reloadBtn = document.querySelector('#reload')

window.api.send('clients:get')
window.api.receive('clients:get', Clients => {
  const clients = JSON.parse(Clients)
  if (clients.length === 0) {
    return emptyList()
  }
  clients.forEach(client => {
    insertClient(client)
  })
})

function insertClient (client) {
  const clientTemplate = `                
                <tr id='${client._id}'>
                    <td class="col-5">${client.name} ${client.lastname}</td>
                    <td class="col-2">${client.dni}</td>
                    <td class="col-2">${client.phone}</td>
                    <td class="col-3">
                        <button id="view" onClick="viewClient('${client._id}')" class="btn btn-info">Ver</button>
                        <button id="delete" onClick="deleteClient('${client._id}')" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
    `
  clients_list.insertAdjacentHTML('beforeend', clientTemplate)
};

reloadBtn.addEventListener('click', () => {
  window.location.reload()
})

// eslint-disable-next-line no-unused-vars
function deleteClient (clientId) {
  window.api.send('client:delete', clientId)
  window.api.receive('delete_client_success', res => {
    const deletedClient = document.getElementById(clientId)
    deletedClient.style.display = 'none'
  })
  window.api.receive('delete_client_error', res => {

  })
}

function emptyList () {
  const emptyTemplate = `
    <div class="d-flex justify-content-center">
        <p>No hay clientes registrados</p>
    </div>
    `
  clients_table.insertAdjacentHTML('beforeend', emptyTemplate)
}
