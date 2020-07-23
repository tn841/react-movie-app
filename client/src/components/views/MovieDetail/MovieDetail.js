import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import {Row} from 'antd';
import { FaGripHorizontal } from 'react-icons/fa';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite'

function MovieDetail(props) {

    const [Movie, setMovie] = useState([])
    const [Actor, setActor] = useState([])
    const [ActorToggle, setActorToggle] = useState(null)
    let movieId = props.match.params.movieId;

    useEffect(() => {
        const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        fetch(endpointInfo)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                setMovie(res)
            })
            
        fetch(endpointCrew)
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            setActor(res.cast)
        })

        setActorToggle(false);
        
    }, [])

    const handleToggleBtn = () => {
        // console.log(ActorToggle);
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {/* Header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto'}}>
                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                    <Favorite
                        movieInfo={Movie}
                        movieId={movieId}
                        userFrom={localStorage.getItem('uerId')}
                    />
                </div>

                {/* Movie Info */}
                <MovieInfo 
                    movie={Movie}
                />
                <br/>

                {/* Actors Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={handleToggleBtn}> Toggle Actor View</button>
                </div>

                {ActorToggle &&
                <Row gutter={[16,16]}>
                    {Actor && Actor.map((actor, index)=> (
                        <React.Fragment key={index}>
                            {/* <p>{`${actor}`}</p> */}
                            <GridCards
                                image={actor.profile_path ? 
                                `${IMAGE_BASE_URL}w500${actor.profile_path}` : null}
                                actorName={actor.name}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                }
                            </div>
        </div>
    )
}

export default MovieDetail
