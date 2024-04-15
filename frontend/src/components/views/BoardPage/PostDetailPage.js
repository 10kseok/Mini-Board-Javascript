import React, { useState, useEffect } from "react";
import { Typography, Button, Form, message, Input, Icon, Descriptions} from "antd";
import Axios from "axios";
import { Cookies } from 'react-cookie';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

const { Title, Paragraph, Text } = Typography;

function PostDetailPage() {
    const { postId } = useParams();
    const history = useHistory();
    const user = useSelector(state => state.user);

    const [Post, setPost] = useState({title: '', content: ''});

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
        Axios.get(`/api/posts/${postId}`, config)
            .then(response => {
                if (response.data) {
                    setPost(response.data);
                }
            })
            .catch(error => {
                console.log("fail", error);
            });
    }, [])
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <Title style={{ textAlign: 'center'}} level={1}> {Post.title} </Title>
            <Text> {Post.content} </Text>
        </div>
    )
}

export default PostDetailPage