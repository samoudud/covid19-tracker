import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/InfoBox/InfoBox';
import LineGraph from './components/LineGraph/LineGraph';
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import { sortData } from './utilities/util';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState()

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(res => res.json())
      .then(data => setCountryInfo(data))
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(res => res.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries)
        });
    }
    getCountries();

  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'wordwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data)
      })
    console.log(countryInfo)
  }

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Let's build a covid 19 tracker</h1>

          <FormControl className='app_dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {
                countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}></InfoBox>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}></InfoBox>
          <InfoBox title="Dead" cases={countryInfo.todayDeaths} total={countryInfo.deaths}></InfoBox>
        </div>

        <Map />
      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {
            tableData && <Table countries={tableData} />
          }
          <h3>worldwide new cases</h3>
          <LineGraph></LineGraph>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
