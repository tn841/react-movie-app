import React, { useState, Fragment } from 'react';
import {Button, Input} from 'antd';
import {useSelector} from 'react-redux';
import axios from 'axios';
import SingleComment from './SingleComment'

const {TextArea} = Input;

function Comments(props) {
    const user = useSelector(state => state.user)

    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("props.postId : " + props.postId)

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

            {props.CommentList && props.CommentList.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment
                            comment={comment}
                            postiId={props.postId}
                            refreshFunction={props.refreshFunction}
                        />
                    </React.Fragment>
                )
            ))}

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