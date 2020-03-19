import React, { useEffect, useState } from "react";
import "./App.css";
import { TableHead } from './table/TableHead';
import { TableBody } from './table/TableBody';

function App() {

  const [tableHeads, setTableHeads] = useState([]);
  const [state, setState] = useState([]);
  useEffect(() => {
    const url = new URL("https://free-nba.p.rapidapi.com/stats");
    const queryParams = {
      page: 0,
      per_page: 25
    };
    url.search = new URLSearchParams(queryParams).toString();

    const options = {
      method: "GET",
      headers: {
        'x-rapidapi-host': 'free-nba.p.rapidapi.com',
        'x-rapidapi-key': '8ed5a600cdmsh92f03145970340ep157555jsnac963af57893'
      }
    };

    fetch(url, options)
      .then(response => response.json())
      .then(result => {
        if (result && result.data) {
          setTableHeads(Object.keys(result.data[0].player))
          setState(result.data);
        }
      });
  }, []);

  return (
    <div className="App">
      {state && tableHeads && (
        <table>
          <TableHead headers={tableHeads} />
          <TableBody rows={state.map(obj => obj.player)} />
        </table>
      )}
    </div>
  );
}

export default App;
