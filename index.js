
const burl = `https://www.thecolorapi.com/scheme`

const colorSel = document.getElementById("color-hex-in")
const selectEl = document.getElementById("select-in")
const getClBtn = document.getElementById("button-color")
const containerEL = document.getElementById("color-container")

let colorArr = []

function bakeUrl(){
    console.log(burl + `?hex=${colorSel.value.slice(1, 7).toUpperCase()}&mode=${selectEl.value}`
)
    return burl + `?hex=${colorSel.value.slice(1, 7).toUpperCase()}&mode=${selectEl.value}`
}

async function requestColorScheme(){
    return fetch(bakeUrl(), {
        method: "GET",
        headers : {
            "Content-Type": "application/json",
        }
    })
    .then(resp => resp.json())
    .then( data => {
        data.colors.map(item => {
            colorArr.push(item.hex.value)
        })
    })

}

function renderColArr(){
    containerEL.innerHTML = ``
    console.log(colorArr)
    colorArr.map(hex =>{
        console.log(hex)
        const itemEl = document.createElement('div')
        itemEl.classList.add('color')
        const itemPEl = document.createElement('p')
        itemPEl.textContent = hex 
        itemEl.appendChild(itemPEl)
        itemEl.style.backgroundColor = hex
        itemEl.addEventListener("click", function(event){
            const copyText = event.target.textContent
            navigator.clipboard.writeText(copyText);
            var popup = document.getElementById('popup');
            popup.classList.remove('hidden');
            setTimeout(function() {
                popup.classList.add('hidden');
            }, 700); // Adjust the time (in milliseconds) as per your requirement
        })
        containerEL.appendChild(itemEl)
    })

    colorArr = []
}

getClBtn.addEventListener("click",  async function(event){
    event.preventDefault()
    await requestColorScheme()
    renderColArr()
})

