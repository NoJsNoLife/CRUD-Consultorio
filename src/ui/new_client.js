const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const clientName = document.querySelector('#name').value
  const clientLastName = document.querySelector('#lastname').value
  const clientGender = document.querySelector('#gender').value
  const clientBirth = document.querySelector('#birth').value
  const clientDni = document.querySelector('#dni').value
  const clientAddress = document.querySelector('#address').value
  const clientSO = document.querySelector('#so').value
  const clientCarnet = document.querySelector('#carnet').value
  const clientPhone = document.querySelector('#phone').value
  const clientEmail = document.querySelector('#email').value
  const cbirth = new Date(clientBirth)
  const newClient = {
    name: clientName,
    lastname: clientLastName,
    gender: clientGender,
    birth: cbirth,
    dni: clientDni,
    address: clientAddress,
    so: clientSO,
    carnet: clientCarnet,
    phone: clientPhone,
    email: clientEmail
  }

  if (newClient.phone === '') newClient.phone = '-'

  clearForm()

  window.api.send('client:new', newClient)
  window.api.receive('new_client_created', (res) => {})
  window.api.receive('new_client_error', (res) => {})
})

function clearForm () {
  document.querySelector('#name').value = ''
  document.querySelector('#lastname').value = ''
  document.querySelector('#birth').value = ''
  document.querySelector('#dni').value = ''
  document.querySelector('#address').value = ''
  document.querySelector('#so').value = ''
  document.querySelector('#carnet').value = ''
  document.querySelector('#phone').value = ''
  document.querySelector('#email').value = ''
}
