import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';

function LandingPage() {
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language-en-US&page=1`;

        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setMovies([res.results]);
            setMainMovieImage(res.results[0])
        });
    }, [])

    return (
        <div style={{ width: '100%', margin: '0'}}>
            {MainMovieImage && //MainMovieImage State가 설정되면, 아래 Component를 랜더링 한다.
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
            </div>
            <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by John Ahn</div>
        </div>
    )
}

export default LandingPage
