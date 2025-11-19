let myURL = "https://striveschool-api.herokuapp.com/api/product/"
let myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmRjMmY0YmQ0NzAwMTU4NWIxZjEiLCJpYXQiOjE3NjI1MjU3MTcsImV4cCI6MTc2MzczNTMxN30.F7_A341Qjk9Cy9vgw7ZUbT1NaES6c8cFK_WLBdkUjQ8"

const url = location.search
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get("printID")

if (id) {
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

const form = document.getElementById("upload-form")

class Product {
  constructor(name, brand, description, price, imageUrl) {
    this.brand = brand

    this.description = description
    this.imageUrl = imageUrl
    this.name = name
    this.price = price
  }
}

let myForm = document.getElementById("upload-form")
myForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const brand = document.getElementById("brand").value
  const description = document.getElementById("description").value
  const price = document.getElementById("price").value
  const imageUrl = document.getElementById("img_url").value

  let uploadedProduct = new Product(name, brand, description, price, imageUrl)

  let method

  if (id) {
    method = "PUT"
  } else {
    method = "POST"
  }

  let finalUrl

  if (id) {
    finalUrl = myURL + id
  } else {
    finalUrl = myURL
  }

  fetch(finalUrl, {
    headers: { Authorization: myKey, "Content-Type": "application/json" },
    method: method,
    body: JSON.stringify(uploadedProduct),
  })
    .then((res) => {
      if (res.ok) {
        alert("Print inserted")
        console.log(res)
        form.reset()
      } else {
        throw new Error(`server error: ${res.status}`)
      }
    })

    .catch((err) => {
      console.log("uploading error", err)
    })
})
