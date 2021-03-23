let wineId = null

const goToIndex = async () => {
  document.querySelector('#new').classList.add('hidden')
  document.querySelector('#edit').classList.add('hidden')
  document.querySelector('#show').classList.add('hidden')
  document.querySelector('#index').classList.remove('hidden')

  const res = await fetch('http://myapi-profstream.herokuapp.com/api/cb9996/wines')
  const data = await res.json()

  document.querySelector('#index').textContent = ''

  for (wine of data) {
    const wineDiv = document.createElement('div')
    wineDiv.classList.add('single-wine')
    wineDiv.innerText = `${wine.name}, from ${wine.country}`
    wineDiv.id = 'wine-' + wine.id
    document.querySelector('#index').append(wineDiv)
  }
}

const goToShow = async (id) => {
  const res = await fetch(`http://myapi-profstream.herokuapp.com/api/cb9996/wines/${id}`)
  const data = await res.json()
  document.querySelector('#show-name').innerText = data.name
  document.querySelector('#show-country-region').innerText = `${data.region}, ${data.country}`
  document.querySelector('#show-grapes').innerText = data.grapes
  document.querySelector('#show-description').innerText = data.description
  document.querySelector('#show-picture').src = data.picture

  document.querySelector('#new').classList.add('hidden')
  document.querySelector('#edit').classList.add('hidden')
  document.querySelector('#show').classList.remove('hidden')
  document.querySelector('#index').classList.add('hidden')  
}

document.querySelector('#index-link').addEventListener('click', goToIndex)

document.querySelector('#new-link').addEventListener('click', () => {
  document.querySelector('#new').classList.remove('hidden')
  document.querySelector('#edit').classList.add('hidden')
  document.querySelector('#show').classList.add('hidden')
  document.querySelector('#index').classList.add('hidden')
})

document.addEventListener('click', async (event) => {
  if (event.target.matches('.single-wine')) {
    wineId = event.target.id.replace('wine-', '')
    goToShow(wineId)
  }
})

document.querySelector('#new-wine-form').addEventListener('submit', async (event) => {
  event.preventDefault()

  const name = document.querySelector('#new-name').value
  const description = document.querySelector('#new-description').value

  const year = "2020"
  const grapes = 'grapes'
  const country = 'country'
  const region = 'region'
  const picture = 'picture'
  const price = 0


  const body = JSON.stringify({ name, description, year, grapes, country, region, picture, price })
  
  const res = await fetch('http://myapi-profstream.herokuapp.com/api/cb9996/wines/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })

  const data = await res.json()
  goToShow(data.id)
})

document.querySelector('#delete-wine').addEventListener('click', async () => {
  await fetch(`http://myapi-profstream.herokuapp.com/api/cb9996/wines/${wineId}`, { method: 'DELETE' })
  goToIndex()
})

document.querySelector('#edit-wine').addEventListener('click', (event) => {
  goToEdit(wineId)
})

const goToEdit = async (id) => {
  const res = await fetch(`http://myapi-profstream.herokuapp.com/api/cb9996/wines/${id}`)
  const wine = await res.json()

  document.querySelector('#edit-name').value = wine.name
  document.querySelector('#edit-description').value = wine.description

  document.querySelector('#new').classList.add('hidden')
  document.querySelector('#edit').classList.remove('hidden')
  document.querySelector('#show').classList.add('hidden')
  document.querySelector('#index').classList.add('hidden')
}

document.querySelector('#edit-wine-form').addEventListener('submit', async (event) => {
  event.preventDefault()
  
  const name = document.querySelector('#edit-name').value
  const description = document.querySelector('#edit-description').value

  const year = "2020"
  const grapes = 'grapes'
  const country = 'country'
  const region = 'region'
  const picture = 'picture'
  const price = 0


  const body = JSON.stringify({ name, description, year, grapes, country, region, picture, price })
  
  const res = await fetch(`http://myapi-profstream.herokuapp.com/api/cb9996/wines/${wineId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  
  goToShow(wineId)
})