import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'; 
function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const loadPoke = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          { signal: abortController.signal }
        );
        setPokemonData(response.data);
        setErrorMessage(null); 
      } catch (error) {
        setErrorMessage("Error fetching Pokemon data!");
      } finally {
        setLoading(false);
      }
    };

    loadPoke();

    return () => abortController.abort();
  }, [number]);

  const prevPoke = () => {
    if (number > 1) {
      setNumber((prevNumber) => prevNumber - 1);
    } else {
      setErrorMessage('You\'re on the first Pokemon!');
    }
  };

  const nextPoke = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <h1>Pokemon data</h1>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <h1>{pokemonData?.name}</h1>
              </tr>
              <tr>
                <th>Image</th>
                <td>
                  <img
                    className="img-con"
                    src={pokemonData?.sprites?.other?.home.front_default}
                    alt={pokemonData?.name}
                  />
                </td>
              </tr>
              <tr>
                <th>Abilities</th>
                <td>
                  <ul>
                    {pokemonData?.abilities?.map((abil, idx) => (
                      <li key={idx}>{abil.ability.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="button-container">
            <button className="bt-con" onClick={prevPoke} disabled={number === 1}>
              Previous
            </button>
            <button className="bt-con" onClick={nextPoke}>
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;