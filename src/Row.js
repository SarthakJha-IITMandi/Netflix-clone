import React, { useEffect, useState } from 'react'
import axios from './axios';
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // when row loads we want to make request from tmdb
    // so the moment row loads this will fetch data from tmdb
    // this snippet will run when this loads
    //  if [], run only once when row loads
    // if [movies], runs when movies changes
    useEffect(() => {
        async function fetchData() {
            // fetchurl used from outside so must put in [] below
            // coz it is dependent so if it changes, it will load
            // also fetchurl is outside useEffect in Row so useEffect will 
            // know to update
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "400",
        width: "85%",
        playerVars: {
            autoplay: 1, 
        }
    }
    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('');
        }
        else{
            movieTrailer(movie?.title || movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            }).catch((error) => console.log(error));
        }
    }
    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">

                {movies.map(movie => (
                    <img
                    // optimisation -> key
                    key={movie.id}
                    onClick= {() => handleClick(movie)}
                    className = {`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <Youtube videoId = {trailerUrl} opts = {opts}/>}
        </div>
    )
}

export default Row