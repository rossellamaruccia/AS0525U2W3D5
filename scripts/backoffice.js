let myURL = "https://striveschool-api.herokuapp.com/api/product/"
let myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmRjMmY0YmQ0NzAwMTU4NWIxZjEiLCJpYXQiOjE3NjQ2MDYwNTgsImV4cCI6MTc2NTgxNTY1OH0.ra94zwq747t6aOwP47UJxCJjH2d9PLnWGQHMjieiIZg"

const url = location.search
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get("printID")

const myForm = document.getElementById("upload-form")

if (id) {
  fetch(myURL + id, {
    headers: { Authorization: myKey },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(`server error: ${res.status}`)
      }
    })

    .then((printDetails) => {
      document.getElementById("title").value = printDetails.name
      document.getElementById("brand").value = printDetails.brand
      document.getElementById("description").value = printDetails.description
      document.getElementById("price").value = printDetails.price
      document.getElementById("img_url").value = printDetails.imageUrl
    })

    .catch((err) => {
      console.log("uploading error", err)
    })
}

class Product {
  constructor(name, brand, description, price, imageUrl) {
    this.brand = brand
    this.description = description
    this.imageUrl = imageUrl
    this.name = name
    this.price = price
  }
}

myForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("title").value
  const brand = document.getElementById("brand").value
  const description = document.getElementById("description").value
  const price = document.getElementById("price").value
  const imageUrl = document.getElementById("img_url").value

  let uploadedProduct = new Product(name, brand, description, price, imageUrl)

  let finalUrl
  if (id) {
    finalUrl = myURL + id
  } else {
    finalUrl = myURL
  }

  fetch(finalUrl, {
    headers: { Authorization: myKey, "Content-Type": "application/json" },
    method: id ? "PUT" : "POST",
    body: JSON.stringify(uploadedProduct),
  })
    .then((res) => {
      if (res.ok) {
        alert("Print added")
        console.log(res)
        myForm.reset()
      } else {
        throw new Error(`server error: ${res.status}`)
      }
    })

    .catch((err) => {
      console.log("uploading error", err)
    })
})
