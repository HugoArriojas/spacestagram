// Component to render the items on the page
import axios from "axios";
import {useState, useEffect } from 'react';
import SearchResults from "./SearchResults";

function MainSection(props) {

    const [results, setResults] = useState([])
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Calling the API using Axios
        axios({
        method: "GET",
        url: `https://api.nasa.gov/planetary/apod`,
        responseType: "json",
        params: {
            api_key: "f4vLk18GqZIKNkMJIeF3gtqJeT6j9mtiBsSWjih6",
            count: `${props.count}`
        }
        })
        .then((response) => {
            // using useState in order to store the received product array
            setResults(response.data)
            // Once API call is received, change useState as "loaded"
            props.handleLoading();
        })
        // We want API call to be made with every count change
    }, [props.count])

    return (
        <section className="productContainers">
        {/* Ternary conditional checks if the API has received a response */}
        {props.loading ? 
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

export default MainSection;



