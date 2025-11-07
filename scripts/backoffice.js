myURL = "https://striveschool-api.herokuapp.com/api/product/"
myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmRjMmY0YmQ0NzAwMTU4NWIxZjEiLCJpYXQiOjE3NjI1MjU3MTcsImV4cCI6MTc2MzczNTMxN30.F7_A341Qjk9Cy9vgw7ZUbT1NaES6c8cFK_WLBdkUjQ8"

const url = location.search
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get("concertID")

if (id) {
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
      document.getElementById("artist").innerText = printDetails.artist
      document.getElementById("description").innerText =
        printDetails.description
      document.getElementById("price").innerText = printDetails.price + "€"
      document.getElementById("img_url").innerText = printDetails.img_url
    })
    .catch((err) => {
      console.log("errore nel ripopolamento del form", err)
    })
}

// const tryUpload = function () {
//   fetch(myURL, {
//     headers: {
//       Authorization: myKey,
//       method: "POST",
//       body: JSON.stringify({
//         name: "Banana Cover",
//         artist: "Velvet Underground",
//         price: 50,
//         img_url: "https://www.ibs.it/images/0602537153190_0_0_536_0_75.jpg",
//         description: "cult vinyl cover print",
//       }),
//     },
//   })
//     .then((res) => {
//       if (res.ok) {
//         console.log(res)
//       } else {
//         throw new Error(`server error: ${res.status}`)
//       }
//     })
//     .catch((err) => {
//       console.log("uploading error", err)
//     })
// }

// tryUpload()

const form = document.getElementById("upload-form")

class Print {
  constructor(name, artist, description, price, img_url) {
    this.name = name
    this.artist = artist
    this.description = description
    this.price = price
    this.img_url = img_url
  }
}

let myForm = document.getElementById("upload-form")
myForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const artist = document.getElementById("artist").value
  const description = document.getElementById("description").value
  const price = document.getElementById("price").value
  const img_url = document.getElementById("img_url").value

  const uploadedPrint = new Print(name, artist, description, price, img_url)

  fetch(myURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmRjMmY0YmQ0NzAwMTU4NWIxZjEiLCJpYXQiOjE3NjI1MjU3MTcsImV4cCI6MTc2MzczNTMxN30.F7_A341Qjk9Cy9vgw7ZUbT1NaES6c8cFK_WLBdkUjQ8",
      method: "POST",
      body: JSON.stringify(uploadedPrint)
    }
  })
    .then((res) => {
      if (res.ok) {
        alert("Print inserted")

        form.reset()
      } else {
        throw new Error(`server error: ${res.status}`)
      }
    })
    .catch((err) => {
      console.log("uploading error", err)
    })
})
