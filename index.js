let myleads = []

const inputel = document.getElementById("input-el")

let inputbtn = document.getElementById("input-btn")

const ulel = document.getElementById("ul-el")

const leadsfromlocalstorage = JSON.parse(localStorage.getItem("myleads"))

const deletebtn = document.getElementById("delete-btn")

const tabbtn = document.getElementById("tab-btn")

if (leadsfromlocalstorage) {
    myleads = leadsfromlocalstorage
    render(myleads)
}

tabbtn.addEventListener("click", function () {

    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabs) {

        myleads.push(tabs[0].url)
        localStorage.setItem("myleads", JSON.stringify(myleads))
        render(myleads)
    })

})

deletebtn.addEventListener("dblclick", function () {

    localStorage.clear()
    myleads = []
    render(myleads)

})

inputbtn.addEventListener("click", function () {
    myleads.push(inputel.value)
    inputel.value = ""
    localStorage.setItem("myleads", JSON.stringify(myleads))
    render(myleads)
})

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

function render(leads) {
    let listitems = ""
    for (let i = 0; i < leads.length; i++) {
        if (isValidUrl(leads[i])) {
            listitems += `<li>
                <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
            </li>`
        }else{
            listitems += `<li>
                <span>${leads[i]}</span>
            </li>`
        }
    }
    ulel.innerHTML = listitems
}