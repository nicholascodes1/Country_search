let all_country_data = [];

function getCountryData() {
  const ApiUrl = `https://restcountries.com/v3.1/all?fields=name,capital,population,flags`;
  return fetch(ApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = response.json()
      return data
    })
    .then((data) => {
      all_country_data = data;
      return all_country_data;
    });
}

function search_country(country_input) {
  const search_term = country_input.toLowerCase().trim();
  for (let i = 0; i < all_country_data.length; i++)
  {
    const current_country_name = all_country_data[i].name.common.toLowerCase()
    if (search_term === current_country_name)
    {
      let country_data = all_country_data[i]
      return country_data
    }
  }

  for (let i = 0; i < all_country_data.length; i++) {
    const current_country_name = all_country_data[i].name.common.toLowerCase();
    if (current_country_name.includes(search_term)) {
      let country_data = all_country_data[i]
      return country_data
    }
  }
  return null
}

document.addEventListener("DOMContentLoaded", function () {
  const result_box = document.getElementById("result-box");
  const search_button = document.getElementById("search-button");
  const country_input = document.getElementById("country-input");
  getCountryData()
    .then(() => {
      search_button.addEventListener("click", function () {
        const country_input_value = country_input.value;
        const country_data = search_country(country_input_value);

        if (country_data != null) {
          const countryHtml = `
      <h2><strong>Country Name : ${country_data.name.common}</strong></h2>
      <h3><strong>Official Name : ${country_data.name.official}</strong></h3>
      <p><strong>Capital : ${country_data.capital[0]}</strong></p>
      <p><strong>Population : ${country_data.population}</strong></p>
      <img src="${country_data.flags.png}">
      `;
          result_box.innerHTML = countryHtml;
        } else {
          result_box.innerHTML = `<p style="color: red; font-weight : 1000; font-size:20px;">Error : Invalid Input</p>`;
        }
      });
    })
    .catch(() => {
      document.getElementById("result-box").innerHTML = `
      <p style="color: red; font-weight : 1000">Error</p>
      <p style="font-size: small font-weight : 1000;">The country server returned a 400 error. Please try again later.</p>
      `;
    })
})
