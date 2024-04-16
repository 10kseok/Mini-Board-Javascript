import { Typography } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import CommentSection from "./comment/CommentSection";

const { Title, Text, Paragraph } = Typography;

function PostDetailPage() {
    const { postId } = useParams();
    const [Post, setPost] = useState({title: '', content: '', userId: ''});

    useEffect(() => {
        Axios.get(`/api/posts/${postId}`)
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
            <Paragraph style={{ textAlign: 'right'}}> written by <strong>{Post.userId}</strong> </Paragraph>
            <Text style={{ whiteSpace: 'pre-wrap' }}> {Post.content} </Text>
            <CommentSection/>
        </div>
    )
}

export default PostDetailPage