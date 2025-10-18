function getCountryData(countryName)
{
  const ApiUrl = `https://restcountries.com/v3.1/name/${countryName}`

  return fetch(ApiUrl).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

document.addEventListener("DOMContentLoaded", function()
{
  const search_button = document.getElementById("search-button");
  const result_box = document.getElementById("result-box")
  const country_input = document.getElementById("country-input")

  search_button.addEventListener("click", function() {
    const country_input_value = country_input.value
    getCountryData(country_input_value).then((data) =>
    {
      console.log(data)
      const country = data[0]
      const countryHtml = `
      <h2><strong>Country Name : ${country.name.common}</strong></h2>
      <h3><strong>Official Name : ${country.name.official}</strong></h3>
      <p><strong>Capital : ${country.capital[0]}</strong></p>
      <p><strong>Population : ${country.population}</strong></p>
      <img src="${country.flags.png}">
      `;

      result_box.innerHTML = countryHtml
    }).catch((error) =>
    {
      result_box.innerHTML = `<p style="color: red;">Error</p>`;
    })

  })
});

