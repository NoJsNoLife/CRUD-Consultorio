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

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    const timeString = `${formattedHours}:${formattedMinutes}`;

    const clockElement = document.getElementById('clock');
    clockElement.innerText = timeString;
}

updateClock();

setInterval(updateClock, 60000);