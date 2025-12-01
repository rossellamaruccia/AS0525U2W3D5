myURL = "https://striveschool-api.herokuapp.com/api/product/"
let myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmRjMmY0YmQ0NzAwMTU4NWIxZjEiLCJpYXQiOjE3NjQ2MDYwNTgsImV4cCI6MTc2NTgxNTY1OH0.ra94zwq747t6aOwP47UJxCJjH2d9PLnWGQHMjieiIZg"

const getPrints = function () {
  fetch(myURL, {
    headers: {
      Authorization: myKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(`Error: ${res.status}`)
      }
    })

    .then((prints) => {
      const row = document.getElementById("prints-row")
      console.log(prints)

      prints.forEach((print) => {
        const div = document.createElement("div")

        div.innerHTML = `
                <div class="card h-100 d-flex flex-column">
                    <img src=${print.imageUrl} class="card-img-top" alt="print preview">
                    <div class="card-body flex-grow-1">
                        <h5 class="card-title">${print.name}</h5>
                        <p class="card-text">${print.brand}</p>
                    </div>
                    <a href="./detail.html?printID=${print._id}" class="btn btn-warning rounded-0">details</a>
                </div>
        `
        row.appendChild(div)
      })
    })
    .catch((err) => {
      console.log("problem:", err)
    })
}
