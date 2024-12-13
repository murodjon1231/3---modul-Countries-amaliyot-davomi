async function Countries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const countries = await response.json()
        render(countries)
    } catch (error) {
        alert.error('Error fetching countries:', error)
    }
}


function render(countries) {
    const cardsContainer = document.getElementById('cards')
    cardsContainer.innerHTML = '';

    countries.forEach(country => {
        const card = document.createElement('div')
        card.className = 'card'

        const flagImg = document.createElement('img')
        flagImg.src = country.flags.svg
        flagImg.alt = `Flag of ${country.name.common}`

        const textDiv = document.createElement('div')
        textDiv.className = 'text'

        const countryName = document.createElement('h2')
        countryName.textContent = country.name.common

        countryName.addEventListener('click', () =>{
            // alert(`Clicked on ${country.name.common}`)

            const countryCode = country.cca3

            window.location.href = `details.html?code=${countryCode}`

        })


        textDiv.appendChild(countryName)
        card.appendChild(flagImg)
        card.appendChild(textDiv)
        cardsContainer.appendChild(card)
    });
}


document.getElementById('search').addEventListener('input', function (e) {
    const search = e.target.value.toLowerCase()
    const allCards = document.querySelectorAll('.card')

    allCards.forEach(card => {
        const countryName = card.querySelector('.text h2').textContent.toLowerCase()
        if (countryName.includes(search)) {
            card.style.display = 'block'
        } else {
            card.style.display = 'none'
        }
    });
});

const mode = document.getElementById('mode')
mode.addEventListener('click', () => {
    const body = document.body

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        mode.textContent = '🌞'
    } else {
        mode.textContent = '🌜'
    }
});


Countries();
