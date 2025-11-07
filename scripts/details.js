myURL = "https://striveschool-api.herokuapp.com/api/product/"
myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmRjMmY0YmQ0NzAwMTU4NWIxZjEiLCJpYXQiOjE3NjI1MTY3MTMsImV4cCI6MTc2MzcyNjMxM30.UAq_vrmGf65sg9Nl92bWinEHPUnMTrBE6LfEb94bzDk"


const url = location.search
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get("printID")

const getDetails = function () {
  fetch(myURL + "/" + id)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((printDetails) => {

      document.getElementById("name").innerText = printDetails.name
      document.getElementById("description").innerText =
        printDetails.description
      document.getElementById("price").innerText = printDetails.price + "€"
      document.getElementById("width").innerText = printDetails.width
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DETTAGLI", err)
      document.getElementById("name").innerText = err
    })
}

getDetails()

const deletePrint = function () {
  fetch(myURL + "/" + id, {
    method: "DELETE",
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

const editPrint = function () {
  location.assign("./backoffice.html?printID=" + id)
}
