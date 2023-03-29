
export class CountriesAPI {

#BASE_URL = 'https://restcountries.com/v3.1/name/';
#FIELDS = 'fields=name,capital,population,flags,languages'

fetchCountries (name)  {
    return fetch(`${this.#BASE_URL}${name}?${this.#FIELDS}`)
        .then(response => {
            if (!response.ok) {
            throw new Error(response.status);
        };
        return response.json();
    });
}
}

    

    
