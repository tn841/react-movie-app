import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.original_title
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

    const onClickFavorite = () => {
        if(Favorited){
            console.log('remove fav')
            Axios.post('/api/favorite/remove', {movieId, userFrom})
            .then(res => {
                console.log(res)
                if(res.data.success){
                    setFavorited(false);
                    setFavoriteNumver(FavoriteNumber - 1)
                } else {
                    alert('Fail to remove Favorite')
                }
                
            })
        } else {
            console.log('add fav')
            Axios.post('/api/favorite/add', 
            {
                movieId
                ,userFrom
                ,movieTitle
                ,moviePost
                ,movieRunTime
            })
            .then( res => {
                console.log(res);
                if(res.data.success){
                    setFavorited(true)
                    setFavoriteNumver(FavoriteNumber + 1)
                } else {
                    alert('Fail to add Favorite')
                }
                
            })
        }
    }

    return (
        <Button onClick={onClickFavorite}> 
            {Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}
        </Button>
    )
}

export default Favorite
