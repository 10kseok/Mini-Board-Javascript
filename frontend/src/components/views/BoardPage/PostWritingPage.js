import { Button, Form, Input, Typography } from "antd";
import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

function PostWritingPage(props) {
    const user = useSelector(state => state.user);
    const [PostTitle, setTitle] = useState("");
    const [Description, setDescription] = useState("");

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
        Axios.post('/api/posts/post', body, config)
        .then(response => {
            if (response.data) {
                props.history.push(`/posts/${response.data}`)
                console.log("response.data", response.data);
            } else {
                alert('게시글 작성 실패');
            }
        });
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div>
                <Title style={{ textAlign: 'center'}} level={1}>Post</Title>
                <Paragraph style={{ textAlign: 'center' }}> Write whatever is on your mind </Paragraph>
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
                    Write
                </Button>
            </Form>
        </div>
    )
}

export default PostWritingPage