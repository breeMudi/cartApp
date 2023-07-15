import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'

import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'  

const appSettings = {
  databaseURL: 'https://chatting-ce20a-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const toBuyInDB =  ref(database, 'toBuy')
// alert(app)
// console.log(app)
const btn = document.querySelector('#add-button')
const item = document.querySelector('#input-field')
const ul = document.querySelector('ul')
onValue(toBuyInDB, function(snapshot){
  clearItemList()
  if(snapshot.exists()){
     let shot = Object.entries(snapshot.val())
  // console.log(shot)
  shot.forEach(content => addItemToList(content))
  }
  else{ul.textContent = 'No Item Added'}
 })
  
  
btn.addEventListener('click', ()=>{
  let inputValue = item.value
  clearInputField()
  if(inputValue !== ''){push(toBuyInDB, inputValue)}
})

function clearInputField() {
  item.value = ''
}

function clearItemList(){
  ul.textContent = ''
}

function addItemToList (inputValue) {
  let itemID = inputValue[0]
  let itemName = inputValue[1]
  let list = document.createElement('li')
  list.textContent = itemName
  ul.appendChild(list)
  list.addEventListener('click', ()=>{
    const toRemove = ref(database, `toBuy/${itemID}`)
    remove(toRemove)
  })
}