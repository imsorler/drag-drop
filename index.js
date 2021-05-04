const tasksListElement = document.querySelector(`.tasks__list`)
const taskElements = tasksListElement.querySelectorAll(`.tasks__item`)

for (const task of taskElements) {
  task.draggable = true
}

tasksListElement.addEventListener(`dragstart`, (e) => {
  e.target.classList.add(`selected`)
})

tasksListElement.addEventListener(`dragend`, (e) => {
  e.target.classList.remove(`selected`)
})

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect()
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2
  
  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling
  
  return nextElement
}

tasksListElement.addEventListener(`dragover`, (e) => {
  e.stopPropagation()
  e.preventDefault()
  
  const activeElement = tasksListElement.querySelector(`.selected`)
  const currentElement = e.target
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`tasks__item`)
    
  if (!isMoveable) return
  
  const nextElement = getNextElement(e.clientY, currentElement)
  
  if
  (
    nextElement && 
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  ) { return }
		
	tasksListElement.insertBefore(activeElement, nextElement)
})
