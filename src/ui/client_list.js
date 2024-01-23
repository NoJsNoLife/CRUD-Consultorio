const clients_list = document.querySelector('#clients_list')
const backBtn = document.querySelector('#back')
const newBtn = document.querySelector('#new')
const reloadBtn = document.querySelector('#reload')

window.api.send('clients:get');
window.api.receive('clients:get', Clients => {
    const clients = JSON.parse(Clients);
    if(clients.length==0){
        return emptyList();
    }
    clients.forEach(client => {
        insertClient(client);
    });
});

function insertClient(client){
    const clientTemplate = `                	
                <tr id='${client._id}'>
                    <td>${client.name}</td>
                    <td>${client.dni}</td>
                    <td>${client.phone}</td>
                    <td>
                        <button id="view" onClick="viewClient('${client._id}')" class="btn btn-info">Ver</button>
                        <button id="delete" onClick="deleteClient('${client._id}')" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
    `;
    clients_list.insertAdjacentHTML('beforeend', clientTemplate);
};

backBtn.addEventListener('click', () => {
    window.api.send('back')
})
newBtn.addEventListener('click', () => {
    window.api.send('client:page')
})
reloadBtn.addEventListener('click', () => {
    window.location.reload()
})

function deleteClient(clientId){
    window.api.send('client:delete', clientId);
    window.api.receive('delete_client_success', (res => {
        const deletedClient =  document.getElementById(clientId)
        deletedClient.style.display = 'none'

    }))
    window.api.receive('delete_client_error', (res => {
        
    }))
}

function emptyList(){
    const emptyTemplate = `
    <div class="col-12 d-flex justify-content-center">
        <p>No hay clientes registrados</p>
    </div>
    `;
    clients_list.insertAdjacentHTML('beforeend', emptyTemplate);
}