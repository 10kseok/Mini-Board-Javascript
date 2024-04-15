import { Button, Form, Input, Divider, Card, Row, Col, Typography, List, Avatar } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Cookies } from 'react-cookie';
import { useSelector } from "react-redux";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Meta } = Card;

function Comment() {
    const user = useSelector(state => state.user);
    const history = useHistory();
    const [CommentValue, setCommentValue] = useState("");
    const [Comments, setComments] = useState([]);
    const [ButtonHidden, setButtonHidden] = useState(true);
    
    const { postId } = useParams();

    useEffect(() => {
        const cookie = new Cookies();
        const token = user.authentication !== undefined ? user.authentication.accessToken : undefined
            || cookie.get('accessToken');
        if (token === undefined) {
            history.push('/login');
            return;
        }
        const config = {
            headers: {'Authorization': `Bearer ${token}`}
        }
        Axios.get(`/api/comments/${postId}`, config)
            .then(response => {
                if (response.data) {
                    setComments(response.data);
                }
            })
    }, [])

    const onContentChange = (e) => {
        setCommentValue(e.currentTarget.value);
        setButtonHidden(e.currentTarget.value === "");
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const cookie = new Cookies();
        const token = user.authentication !== undefined ? user.authentication.accessToken : undefined
            || cookie.get('accessToken');
        if (token === undefined) {
            history.push('/login');
            return;
        }
        const config = {
            headers: {'Authorization': `Bearer ${token}`}
        }
        const body = {
            content: CommentValue,
            postId: postId,
        }

        Axios.post("/api/comments", body, config)
            .then(response => {
                if (response.data) {
                    setCommentValue("");
                    Axios.get(`/api/comments/${postId}`, config)
                        .then(response => {
                            if (response.data) {
                                setComments(response.data);
                            }
                        })
                }
            })
        
    }

    const renderComments = Comments
        .sort((c1, c2) => c2.commentId - c1.commentId)
        .map((comment, index) => {
            return <List.Item key={index} style={{ margin: 'auto' }}>
                <Meta
                    avatar= {<Avatar src="https://avatar.iran.liara.run/public"/>}
                    title= {comment.userId}
                    description={comment.content}
                />
                </List.Item>
    })

    return (
        <div>
            <br/>
            <Title level={3}> Comments </Title>
            <Divider/>
            {/* Create Comment */}
            <Form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <Meta
                    avatar= {<Avatar src="https://avatar.iran.liara.run/public"/>}
                />
                <TextArea
                    style={{ width: '100%', borderRadius: '5px', marginRight: '5px'}}
                    onChange={onContentChange}
                    value={CommentValue}
                    autoSize={false}
                    placeholder="댓글을 작성해주세요"
                />
                <br/>
                <Button style={{ width: '15%', height: '52px'}} onClick={onSubmit} hidden={ButtonHidden}> Submit </Button>
            </Form>


            {/* Previous Comment List */}
            <List
                size="large"
            >   
                {renderComments}
            </List>
        </div>
    )
}

export default Comment