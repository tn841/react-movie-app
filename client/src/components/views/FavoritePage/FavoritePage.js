import React, { useEffect, useState } from 'react'
import './favorite.css'
import Axios from 'axios'

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
                    {FavoriteInfos && FavoriteInfos.map( (favorite, idx) => (
                        <tr key={idx}>
                            <td>{favorite.movieTitle}</td>
                            <td>{favorite.movieRunTime} mins</td>
                            <td><button>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default FavoritePage
