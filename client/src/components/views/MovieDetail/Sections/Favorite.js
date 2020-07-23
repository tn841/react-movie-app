import React, { useEffect } from 'react'
import Axios from 'axios'

function Favorite(props) {
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.movieTitle
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    useEffect(() => {
        
        let variables = {
            userFrom,
            movieId
        }

        // 사람들이 해당 영화를 favorite한 숫자 얻기
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(res => {
                console.log(res)
                if(res.data.success) {

                } else {
                    alert('fail to load favorite number.')
                }
            })

        return () => {
            
        }
    }, [])

    return (
        <button>Favorite {`${11}`}</button>
    )
}

export default Favorite
