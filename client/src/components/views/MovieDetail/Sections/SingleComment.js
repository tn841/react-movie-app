import React, { useState } from 'react'
import { Comment, Avatar, Button, Input} from 'antd'
const {TextArea} = Input;

function SingleComment(props) {
    const [CommentValue, setComment] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e) => {
        setComment(e.currentTarget.value);
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
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
                        placeHolder="write some comments"
                    />
                    <br/>
                    <Button style={{width:"20%", height: '52px'}} 
                        onClick>
                        Submit
                    </Button>
                </form>
            }
        </div>
    )
}

export default SingleComment
