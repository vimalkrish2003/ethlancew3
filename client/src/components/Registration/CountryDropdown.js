import React, { useState, useEffect } from "react";

const CountryDropdown = ({ value, onChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        const sortedCountries = countryNames.sort((a, b) => a.localeCompare(b));
        setCountries(sortedCountries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    onChange(selectedCountry);
  };

  return (
    <select value={value} onChange={handleCountryChange} className="form-control">
      <option value="">-- Please select a country --</option>
      {countries.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
};

export default CountryDropdown;

