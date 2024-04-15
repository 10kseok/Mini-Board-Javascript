import { Typography } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import CommentSection from "./comment/CommentSection";

const { Title, Text } = Typography;

function PostDetailPage() {
    const { postId } = useParams();
    const user = useSelector(state => state.user);

    const [Post, setPost] = useState({title: '', content: ''});

    useEffect(() => {
        const token = user.authentication.accessToken  
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
            <CommentSection/>
        </div>
    )
}

export default PostDetailPage