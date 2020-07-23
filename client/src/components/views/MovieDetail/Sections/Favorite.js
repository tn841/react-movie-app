import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Favorite(props) {
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.movieTitle
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    
    const [FavoriteNumber, setFavoriteNumver] = useState(0)
    const [Favorited, setFavorited] = useState(false)

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
                    setFavoriteNumver(res.data.favoriteNumber)
                } else {
                    alert('fail to load favorite number.')
                }
            })
        
        // 내가 Favorite 했는지 확인
        Axios.post('/api/favorite/favorited', variables)
            .then(res => {
                console.log(res)
                if(res.data.success) {
                    setFavorited(res.data.favorited)
                } else {
                    alert('fail to load favorite info.')
                }
            })
        
        return () => {
            
        }
    }, [])

    return (
        <button > 
            {Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}
        </button>
    )
}

export default Favorite
