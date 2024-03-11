/* eslint-disable camelcase */
const clients_list = document.querySelector('#clients_list')
const clients_table = document.querySelector('#clients-table')
const reloadBtn = document.querySelector('#reload')

window.api.send('clients:get')
window.api.receive('clients:get', Clients => {
  const clients = JSON.parse(Clients)
  let incremental = 1
  if (clients.length === 0) {
    return emptyList()
  }
  clients.forEach(client => {
    insertClient(client, incremental)
    incremental++
  })
})

function insertClient (client, incremental) {
  const clientTemplate = `                
                <tr>
                  <td class="col-content fs-5" scope="row">${incremental}</td>
                  <td class="col-content fs-5">
                    <div class="text-overflow">${client.lastname}, ${client.name}</div>
                  </td>
                  <td class="col-content fs-5">${client.dni}</td>
                  <td class="col-content fs-5">${client.phone}</td>
                  <td class="col-content fs-5">
                      <div class="buttons-container">
                        <a id="view" onClick="viewClient('${client._id}')" class="button-view">
                          <img src="../../public/images/icon-user.png" alt="Icon user" class="img-button">
                        </a>
                        <a id="delete" onClick="deleteClient('${client._id}')" class="button-delete">
                          <img src="../../public/images/icon-delete.png" alt="Icon user" class="img-button">
                        </a>
                      </div>
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
    window.location.reload()
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
  clients_table.insertAdjacentHTML('afterend', emptyTemplate)
}

// eslint-disable-next-line no-unused-vars
function calculateAge (birth) {
  const fechaDeNacimiento = new Date(birth)
  const hoy = new Date()
  console.log(parseInt((hoy - fechaDeNacimiento) / (1000 * 60 * 60 * 24 * 365)))
}
