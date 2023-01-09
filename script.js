// Načítanie dát z localStorage do premennej names;
// pokial je localStorage prázdny, tak do names sa uloží prázdne pole

const names = getSavedNames()

// Odoslanie formulára a uloženie do localStorage pomocou premennej names
let myForm = document.querySelector("#test-form")
let myCheckBox = document.querySelector(".my-checkbox")


// // - Klasický zápis funkcie
// myForm.addEventListener("submit", function(event){
//   event.preventDefault()

// // - Šípková notácia ({} ale nemôžeme vymazať, pretože kód je príliš dlhý a nechceme použiť return na všetky nasledujúce riadky)

myForm.addEventListener("submit", (event) => {
  event.preventDefault()

  names.push({
    id: uuidv4(),
    firstName: event.target.elements.firstName.value,
    adult: myCheckBox.checked
  })

  event.target.elements.firstName.value = ""
  myCheckBox.checked = false

  saveNames(names)
})


// Vypisovanie späť do stránky

let buttonToList = document.querySelector(".to-list")
buttonToList.addEventListener("click", function(event){
  document.querySelector(".list-names").innerHTML = ""

  let namesFromStorage = localStorage.getItem("names")
  let namesFromStorageJSON = JSON.parse(namesFromStorage)

  namesFromStorageJSON.forEach(function(myName){
    const oneNameHTML = generateHTMLstructure(myName)
    document.querySelector(".list-names").appendChild(oneNameHTML)
  })
})


window.addEventListener("storage", function(){
  location.reload()
})