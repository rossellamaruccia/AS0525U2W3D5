myURL = "https://striveschool-api.herokuapp.com/api/product/"
let myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmRjMmY0YmQ0NzAwMTU4NWIxZjEiLCJpYXQiOjE3NjQ2MDYwNTgsImV4cCI6MTc2NTgxNTY1OH0.ra94zwq747t6aOwP47UJxCJjH2d9PLnWGQHMjieiIZg"

const url = location.search
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get("printID")
console.log(id)

let card = document.getElementById("card")

const getDetails = function () {
  fetch(myURL + id, {
    headers: {
      Authorization: myKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((print) => {
      console.log(print)
      
      card.innerHTML = `<img src=${print.imageUrl} class="card-img-top" alt="print preview">
                    <div class="card-body flex-grow-1">
                        <h5 class="card-title">${print.name}</h5>
                        <p class="card-text">${print.brand}</p>
                        <p class="card-text">${print.price} €</p>
                        <p class="card-text">${print.description}</p>
                    </div>`
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DETTAGLI", err)
    })
}

getDetails()

const deletePrint = function () {
  fetch(myURL + id, {
    method: "DELETE",
    headers: {
      Authorization: myKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("item deleted")
        location.assign("./index.html")
      } else {
        throw new Error(`error: ${res.status}`)
      }
    })
    .catch((err) => {
      console.log("error:", err)
    })
}

const detailsButton = document.getElementById('detailsButton')
detailsButton.addEventListener('click', () => {location.assign("./backoffice.html?printID=" + id)})

