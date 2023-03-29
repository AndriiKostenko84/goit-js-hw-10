
export class CountriesAPI {
    
#BASE_URL = 'https://restcountries.com/v3.1/name/';
#FIELDS = 'fields=name,capital,population,flags,languages'

fetchCountries(name)  {
    
    return fetch(`${BASE_URL}${name}?${FIELDS}`)
        .then(response => {
            // console.log(response);
            if (!response.ok) {
            throw new Error(response.status);
        };
        return response.json();
    });
}
}

    

    
