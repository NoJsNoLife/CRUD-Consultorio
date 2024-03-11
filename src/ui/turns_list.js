/* eslint-disable spaced-comment */
/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
const turns_list = document.querySelector('#turns_list')
const daysTag = document.querySelector('.days')
const currentDate = document.querySelector('.current-date')
const prevNextIcon = document.querySelectorAll('img')

let date = new Date()
let currYear = date.getFullYear()
let currMonth = date.getMonth()

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December']

window.api.send('turns:get')
window.api.receive('turns:get', Turns => {
  const turns = JSON.parse(Turns)
  turns.forEach(turn => {
    console.log(turn.name)
  })
})

/*newBtn.addEventListener('click', () => {
  window.api.send('turn:page')
})
reloadBtn.addEventListener('click', () => {
  window.location.reload()
})*/

const renderCalendar = () => {
  const firstDayofMonth = new Date(currYear, currMonth, 1).getDay()
  const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate()
  const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay()
  const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate()
  let liTag = ''
  for (let i = firstDayofMonth; i > 0; i--) { // creando li de los ultimos dias del mes anterior
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`
  }
  for (let i = 1; i <= lastDateofMonth; i++) { // creando li de los dias del mes
    // agregando clase active a la fecha actual
    const isToday = i === date.getDate() && currMonth === new Date().getMonth() &&
                     currYear === new Date().getFullYear()
      ? 'active'
      : ''
    liTag += `<li class="${isToday}"><button>${i}</button></li>`
  }
  for (let i = lastDayofMonth; i < 6; i++) { // creando li de los primeros dias del siguiente mes
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}` // pasando mes y año a texto
  daysTag.innerHTML = liTag
}
renderCalendar()
prevNextIcon.forEach(icon => {
  icon.addEventListener('click', () => {
    // hacer click al anterior o siguiente decrementa o incrementa el mes actual en 1
    currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate())
      currYear = date.getFullYear()
      currMonth = date.getMonth()
    } else {
      date = new Date()
    }
    renderCalendar()
  })
})
