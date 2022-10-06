const turns_list = document.querySelector('#turns_list')
const backBtn = document.querySelector('#back')
const newBtn = document.querySelector('#new')
const reloadBtn = document.querySelector('#reload')

backBtn.addEventListener('click', () => {
    window.api.send('back')
})
newBtn.addEventListener('click', () => {
    window.api.send('turn:page')
})
reloadBtn.addEventListener('click', () => {
    window.location.reload()
})