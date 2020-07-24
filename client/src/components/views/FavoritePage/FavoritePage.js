import React, { useEffect, useState } from 'react'
import './favorite.css'
import Axios from 'axios'
import {Popover} from 'antd'
import {IMAGE_BASE_URL} from '../../Config'

function FavoritePage(props) {
    const userFrom = localStorage.getItem('uerId')
    const [FavoriteInfos, setFavoriteInfos] = useState([])

    useEffect(()=> {
        Axios.post('/api/favorite/getFavoriteMovie', {userFrom})
        .then(res => {
            console.log(res.data.doc);
            if(res.data.success){
                setFavoriteInfos(res.data.doc)
            } else {
                alert('Fail to get favorites.')
            }
        })
    }, [])
    const handleRemoveBtn = (movieId, userFrom) => {
        // console.log(FavoriteInfos, movieId)    

        Axios.post('/api/favorite/remove', {movieId, userFrom})
        .then( res => {
            if(res.data.success){
                console.log(res.data)
                setFavoriteInfos(FavoriteInfos.filter( (favorite, idx) => favorite.movieId !== movieId))
            } else {
                alert('Fail to delete Favorite')
            }
        })
    }
    const renderCards = FavoriteInfos.map( (favorite, idx) => {

        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : 'no image'   
            }
            </div>
        )

        return (
        <tr key={idx} >
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} mins</td>
            <td><button onClick={() => handleRemoveBtn(favorite.movieId, favorite.userFrom)}>Remove</button></td>
        </tr>)
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
            
        </div>
    )
}

export default FavoritePage
