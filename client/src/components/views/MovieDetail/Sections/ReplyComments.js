import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment'

function ReplyComments(props) {
    const [ReplayCount, setReplayCount] = useState(0)
    const [OpenReplay, setOpenReplay] = useState(false)

    useEffect(() => {

        let counter = 0
        props.CommentList.map( (cmt, idx) => {
            // console.log(cmt.responseTo === parentCommentId)
            if(cmt.responseTo === props.parentComment._id){
                counter ++
            }
        })
        console.log(counter)
        setReplayCount(counter)
        console.log("ReplayCount : " + ReplayCount)
        
    }, [])
        

    const handelOnClick = () => {
        setOpenReplay(!OpenReplay)
    }

    let renderReplyComment = (parentCommentId) => 
        props.CommentList.map( (comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: "70px"}}>
                        <SingleComment
                            comment={comment}
                            postId={props.postId}
                            refreshFunction={props.refreshFunction}
                        />
                        <ReplyComments
                            CommentList={props.CommentList}
                            parentComment={comment}
                            refreshFunction={props.refreshFunction}
                            postId={props.postId}      
                        />
                    </div>
                }
            </React.Fragment>
        ))

    return (
        <div>
            {ReplayCount > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray', cursor: 'pointer'}}
                    onClick={handelOnClick}> 답글 {ReplayCount}개 더보기</p>
            }
            {OpenReplay &&
                renderReplyComment(props.parentComment._id)
            }

            
        </div>
    )
}

export default ReplyComments
