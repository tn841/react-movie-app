import React, { useState } from 'react';
import {Button, Input} from 'antd';
import {useSelector} from 'react-redux';
import axios from 'axios';

const {TextArea} = Input;

function Comments(props) {
    const user = useSelector(state => state.user)

    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const params = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }
        axios.post('/api/comment/saveComment', params)
        .then(res => {
            if(res.data.success){
                console.log(res.data);
                setComment("")
                props.refreshFunction(res.data.data)
            } else {
                alert('Fail to save Comment')
            }
        })
    }

    return (
        <div>
            <br/>
            <p> replies</p>
            
            {/* Comment Lists */}
            {console.log(props.CommentList) }

            {/* Root Comment Fomr */}
            <form style={{display: 'flex'}} onSubmit={handleSubmit}>
                <TextArea
                    style={{ width:'100%', borderRadius: '5px'}}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some commnets"
                />
                <Button 
                    style={{ width: '20%', height: '52px'}}
                    onClick={handleSubmit}
                >
                    submit
                </Button>
            </form>
        </div>
    )
}

export default Comments