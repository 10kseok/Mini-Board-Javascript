import { Avatar, Button, Card, Divider, Form, Input, List, Typography, Modal } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;
const { Meta } = Card;

function Comment() {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("");
    const [Comments, setComments] = useState([]);
    const [ButtonHidden, setButtonHidden] = useState(true);
    const [IsLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const { postId } = useParams();
    const history = useHistory();

    useEffect(() => {
        Axios.get(`/api/comments/${postId}`)
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

        const token = user.authentication?.accessToken ?? "";
        if (!token) {
            setIsLoginModalOpen(true);
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

    const handleLogin = () => {
        setIsLoginModalOpen(false);
        history.push("/login");
    };

    const handleCancel = () => {
        setIsLoginModalOpen(false);
    };

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
                <Modal okType="link" okText="Sign in" visible={IsLoginModalOpen} onOk={handleLogin} onCancel={handleCancel}>
                    로그인 후 댓글 작성 가능합니다.
                </Modal>
            </Form>

            {/* Previous Comment List */}
            <List size="large">   
                {renderComments}
            </List>
        </div>
    )
}

export default Comment