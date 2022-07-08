import React, { useEffect, useState } from 'react'
import axios from './axios';
import requests from './request'
import "./Banner.css";

function Banner() {
    // random movie each time
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    // we are trying to shrink dec text with ... for clarity
    function truncate(str, n) {
        return str?.length>n ? str.substr(0, n-1) + "..." : str;
    }


  return (
    <header className="banner"
    style = {{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
    }}>
        <div className="banner__contents">
            <h1 className="banner__title">
                {/* edge case for if name is absent */}
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            {/* the two buttons in description */}
            <div className="banner__buttons">
                <button className="banner__button">Play</button>
                <button className="banner__button">My List</button>
            </div>
            <h1 className="banner__description">{truncate(movie?.overview, 175)}</h1>
        </div>

        <div className = "banner--fadeBottom"/>

    </header>
  )
}

export default Banner