async function getCountryDetails(code) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        const [country] = await response.json()

        renderDetails(country)
    } catch (error) {
        console.error('Error fetching country details:', error)
    }
}

function renderDetails(country) {
    const detailsContainer = document.getElementById('details');
    detailsContainer.innerHTML = `
        <h1>${country.name.common}</h1>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
        <button><a href="./index.html">Back to Search</a></button>
    `;
}

const Params = new URLSearchParams(window.location.search)
const countryCode = Params.get('code')

if (countryCode) {
    getCountryDetails(countryCode)
}
