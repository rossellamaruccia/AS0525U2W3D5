myURL = "https://striveschool-api.herokuapp.com/api/product"
myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmRjMmY0YmQ0NzAwMTU4NWIxZjEiLCJpYXQiOjE3NjI1MTY3MTMsImV4cCI6MTc2MzcyNjMxM30.UAq_vrmGf65sg9Nl92bWinEHPUnMTrBE6LfEb94bzDk"


const getPrints = function () {
  fetch(myURL)
    .then((res) => {
      console.log("RESPONSE", res)
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(
          `Error: ${res.status}`
        )
      }
    })
    .then((arrayOfPrints) => {

      const row = document.getElementById("prints-row")
      arrayOfPrints.forEach((print) => {
        row.innerHTML += `
            <div class="col">
                <div class="card h-100 d-flex flex-column">
                    <img src="https://images.pexels.com/photos/191429/pexels-photo-191429.jpeg" class="card-img-top" alt="print preview">
                    <div class="card-body flex-grow-1">
                        <h5 class="card-title">${print.title}</h5>
                        <p class="card-text">${print.description}</p>
                        <p class="card-text">${print.price}</p>
                        <p class="card-text">${print.width}</p>
                    </div>
                    <a href="./details.html?printID=${print._id}" class="btn btn-success">details</a>
                </div>
            </div>
        `
      })
    })
    .catch((err) => {
      console.log("problem:", err)
    })
}

getEvents()
