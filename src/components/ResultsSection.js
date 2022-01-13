// Component to render the items on the page
import "../stylesheets/ResultsSection.css"
import axios from "axios";
import {useState, useEffect } from 'react';
import SearchResults from "./SearchResults";

function ResultsSection(props) {

    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(10)

    useEffect(() => {
        // Calling the API using Axios
        axios({
        method: "GET",
        url: `https://api.nasa.gov/planetary/apod`,
        responseType: "json",
        params: {
            api_key: "f4vLk18GqZIKNkMJIeF3gtqJeT6j9mtiBsSWjih6",
            count: `${count}`
        }
        })
        .then((response) => {
            // using useState in order to store the received product array
            setResults(response.data)
            console.log(response.data)
            // Once API call is received, change useState as "loaded"
            setLoading(true);
        })
        // We want API call to be made with every category change
    }, [])

    return (
        <section className="productContainers">
        {/* Ternary conditional checks if the API has received a response */}
        {loading ? 
        (
          results.map((results) => {
            return (
              <SearchResults
                key = {results.date}
                date = {results.date}
                title = {results.title}
                image ={results.url}
                hdImage ={results.hdurl}
                description = {results.explanation}
                copyright = {results.copyright}
              />
            )
          })
        )
          : ( // if loading state is not true (meaning loaded) then placeholder text is rendered
            <div className="loading">
              <h2 className="loadingText">Please wait for API Response</h2>
              {/* Empty divs below are part of the CSS loading effect */}
              <div className="loadRipple">
                <div></div>
                <div></div>
              </div>
            </div>
          )
        }
      </section>
    )
}

export default ResultsSection;



