myURL = "https://striveschool-api.herokuapp.com/api/product/"
myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmRjMmY0YmQ0NzAwMTU4NWIxZjEiLCJpYXQiOjE3NjI1MTY3MTMsImV4cCI6MTc2MzcyNjMxM30.UAq_vrmGf65sg9Nl92bWinEHPUnMTrBE6LfEb94bzDk"

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
      Authorization: myKey,
    },
    method: "POST",
    body: JSON.stringify(uploadedPrint),
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
