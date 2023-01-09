let nameID = location.hash.substring(1)
// console.log(nameID)
let names = getSavedNames()
// console.log(names)


// // TU ŠÍPKOVÚ NOTÁCIU MOŽEME POUŽIŤ

// // Klasický zápis:
// let searchedName = names.find(function(oneObject){
//   return oneObject.id === nameID
// })

// // Zápis šípkovou notáciou
let searchedName = names.find((oneObject) => oneObject.id === nameID)


// console.log(searchedName)
if(searchedName === undefined){
  location.assign("/SetekJS112+/index.html")
}

document.querySelector("#editedName").value = searchedName.firstName

let changingForm = document.querySelector("#changing-form")
changingForm.addEventListener("submit", function(event){
  event.preventDefault()

  // console.log(event.target.elements.changingName.value)

  searchedName.firstName = event.target.elements.changingName.value

  saveNames(names)

})


// window.addEventListener("click", function(){
//   console.log("Bolo kliknuté")
// })

window.addEventListener("storage", function(event){
   console.log(event)

   if(event.key === "names"){
    names = JSON.parse(event.newValue)
   }

   let searchedName = names.find(function(oneObject){
    return oneObject.id === nameID
  })
  
  if(searchedName === undefined){
    location.assign("/SetekJS112+/index.html")
  }
  
  document.querySelector("#editedName").value = searchedName.firstName

})