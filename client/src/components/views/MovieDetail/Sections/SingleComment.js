import React, { useState } from 'react'
import { Comment, Avatar, Button, Input} from 'antd'
import Axios from 'axios';
import {useSelector} from 'react-redux';
const {TextArea} = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user)
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const params = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }
        Axios.post('/api/comment/saveComment', params)
        .then(res => {
            if(res.data.success) {
                console.log(res.data.data)
                setCommentValue("");
                setOpenReply(!OpenReply)
                props.refreshFunction(res.data.data)
            } else {
                alert('fail to save Comment.')
            }
        })
    }

    const action = [
        <span onClick={openReply} key="comment-">Replay to</span>
    ]

    return (
        <div>
            <Comment
                actions={action}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>{props.comment.content}</p>
                }
            ></Comment>
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
                    <TextArea
                        style={{ width:'100%', borderRadius: '5px'}}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br/>
                    <Button style={{width:"20%", height: '52px'}} 
                        onClick={handleSubmit}>
                        Submit
                    </Button>
                </form>
            }
        </div>
    )
}

export default SingleComment
