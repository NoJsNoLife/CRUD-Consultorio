const newTurnBtn = document.querySelector("#new_turn");
const newClientBtn = document.querySelector("#new_client");
const showTurnsBtn = document.querySelector("#show_turns");
const showClientsBtn = document.querySelector("#show_clients");
const closeBtn = document.querySelector("#close");

newTurnBtn.addEventListener('click', () => {
    window.api.send('turn:page')
})

newClientBtn.addEventListener('click', () => {
    window.api.send('client:page')
})

showTurnsBtn.addEventListener('click', () => {
    window.api.send('turns:list')
})

showClientsBtn.addEventListener('click', () => {
    window.api.send('clients:list')
})

closeBtn.addEventListener('click', () => {
    window.api.send('app:close')
})