import { Button, Form, Input, Typography } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

function PostWritingPage(props) {
    const user = useSelector(state => state.user);
    const [PostTitle, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [SubmitButtonText, setSubmitButtonText] = useState("Write");
    const [IsUpdate, setIsUpdate] = useState(false);
    const location = useLocation();

    const onTitleChange = (e) => {
        setTitle(e.currentTarget.value);
    }
 
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const token = user.authentication.accessToken;
        const config = {
            headers: {'Authorization': `Bearer ${token}`}
        }
        const body = {
            title: PostTitle,
            content: Description,
        }
        if (IsUpdate) {
            Axios.put(`/api/posts/post/${location.state.postId}`, body, config)
            .then(response => {
                if (response.data) {
                    props.history.push(`/posts/${response.data}`)
                } else {
                    alert('게시글 작성 실패');
                }
            });
            return;
        } 
        Axios.post('/api/posts/post', body, config)
            .then(response => {
                if (response.data) {
                    props.history.push(`/posts/${response.data}`)
                } else {
                    alert('게시글 작성 실패');
                }
            });
    }

    useEffect(() => {
        const navigatedState = location.state;
        setIsUpdate(navigatedState ? true : false);
        setSubmitButtonText(navigatedState ? "Update" : "Write");
        setTitle(navigatedState?.title ?? "");
        setDescription(navigatedState?.content ?? "");
    }, [])

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div>
                <Title style={{ textAlign: 'center'}} level={1}> {IsUpdate ? "Edit" : "New Post"}</Title>
                <Paragraph style={{ textAlign: 'center', fontStyle: 'italic' }}> Write whatever is on your mind </Paragraph>
            </div>
            <Form onSubmit={onSubmit}>
                <Form.Item 
                    validateStatus={PostTitle ? '' : 'error'}
                    help={PostTitle ? '' : 'Please write title'}>
                    <Input
                        onChange={onTitleChange}
                        value={PostTitle}
                        placeholder="Title"
                    />
                </Form.Item>  
                <br/>
                <Form.Item 
                    validateStatus={Description ? '' : 'error'}
                    help={Description ? '' : 'Please write content'}>
                    <TextArea
                        onChange={onDescriptionChange}
                        value={Description}
                        placeholder="Description"
                        autoSize={{ minRows : 15 }}
                    />
                </Form.Item>
                
                <br/>
                <br/>
                <br/>
                <Button style={{ margin: 'auto', display: 'block' }} type="primary" size="large" onClick={onSubmit}
                    disabled= { !PostTitle || !Description } >
                    {SubmitButtonText}
                </Button>
            </Form>
        </div>
    )
}

export default PostWritingPage