let myLeads = []
const inputEl = document.getElementById('input-el') 
const ulEl = document.getElementById('ul-el')

const saveBtn = document.getElementById('input-btn');
const tabBtn = document.getElementById('tab-btn')

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}



tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })  
})

function render(leads) {
    let listItems = ""
  for (let i = 0; i < leads.length; i++) {
        // listItems = '<a href = "#" target = "_blank"><li>' + inputEl.value + '</li></a>'
        
        // using template strings/literals , adding value to the href using ${}, more like f-strings in python.
        listItems += `
            <li>
                <a href = "${leads[i]}" target = "_blank">
                    ${leads[i]}
                </a>
            </li>
            `
        }
   ulEl.innerHTML = listItems  
}

let deleteBtn = document.getElementById('delete-btn')


function deleteClicK() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
}


function saveClick() {
    myLeads.push(inputEl.value)
    
    // if inputEl = "" then it will not add the empty string to the array, it reassigns the variable to an empty string "
    inputEl.value = ''
    
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
}



//adding html using innerHTML in ul through javascript 
//ulEl.innerHTML += "<li>" +inputEl.value + "</li>"


//creating an HTML element using createElement
//const li =  document.createElement('li')

//li.textContent = inputEl.value
//appending the element to the ul
// ulEl.append(li)
// clear the input field
//inputEl.value = ''


//function renderLead() {
   // let listItems = '<li><a href = "' + inputEl.value + '"  target = "_blank">' + inputEl.value + '</a></li>'
   // ulEl.innerHTML += listItems
//}



// addEventListener attaches an event handler to the specified element (saveBtn) of DOM
// parameters are::: click: type of the event we are listening for and the second 
// parameter is a callback function that will run when the event occurs.
// (by default it is an anonymous function , or a default calback function)
saveBtn.addEventListener("click", saveClick)
deleteBtn.addEventListener("click", deleteClicK)