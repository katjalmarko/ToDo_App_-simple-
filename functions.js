/*
Funkcia načítajúca dáta z localStorage;
Ošetrí, pokiaľ 
*/
const getSavedNames = function(){
  const myNames = localStorage.getItem("names")

  if(myNames !== null){
    return JSON.parse(myNames)
  } else {
    return []
  }
}


/*
Funkcia pre použitie pri odoslaní formulára
Ukladá do localStorage meno z formulára
*/
const saveNames = function(oneName){
  localStorage.setItem("names", JSON.stringify(oneName))
}


/*
Generovanie HTML štruktúry, ktorú umiestníme do stránky po kliknutí na tlačítko "Vypíš"
+ použijeme ju tiež pre vypísanie nových informácií z localStorage, keď nejaké meno vymažeme pomocou tlačítka "Vymazať meno"
*/
const generateHTMLstructure = function(oneName){
  const newDiv = document.createElement("div")
  const newLink = document.createElement("a")
  const button = document.createElement("button")

  // Nastavenie tlačítka na zmazávanie
  button.textContent = "Vymazať meno"
  newDiv.appendChild(button)

  button.addEventListener("click", function(event){
    removeNames(names, oneName.id)
    saveNames(names)
    toListAgain()
  })

  newLink.textContent = oneName.firstName
  if(oneName.adult === true){
    newLink.classList.add("adult")
  } else {
    newLink.classList.add("no-adult")
  }

  // 122/140
  newLink.setAttribute("href",`/SetekJS112+/edit.html#${oneName.id}`)

  newDiv.appendChild(newLink)
  return newDiv

}


// Podla ID nájdeme index daného mena a pomocou splice ho odstránime
const removeNames = function(ourNames, id){
  const index = ourNames.findIndex(function(nameWantToCheck){
    return nameWantToCheck.id === id
  })

  if(index > -1){
    ourNames.splice(index,1)
  } 
}

/*
Pokial vymažeme nejaké meno z localStorage, tak táto funkcia zabezpečí opätovné vypísanie localStorage (teda vypísanie bez vymazaného mena)
*/
const toListAgain = function(){
  document.querySelector(".list-names").innerHTML = ""

  let newData = getSavedNames()

  newData.forEach(function(onlyOneName){
    const newContent = generateHTMLstructure(onlyOneName)
    document.querySelector(".list-names").appendChild(newContent)
  })
}