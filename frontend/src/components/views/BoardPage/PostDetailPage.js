import { Button, Typography, Col, Row, Modal } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import CommentSection from "./comment/CommentSection";
import TokenParser from "../../util/TokenParser";
import { useSelector } from "react-redux";

const { Title, Text, Paragraph } = Typography;

function PostDetailPage() {
    const { postId } = useParams();
    const [Post, setPost] = useState({title: '', content: '', userId: ''});
    const [IsOwnPost, setIsOwnPost] = useState(false);
    const user = useSelector(state => state.user);
    const [IsDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const history = useHistory();


    const handleDeleteButton = () => {
        setIsDeleteModalOpen(true);
    }

    const handleDeleteConfirm = () => {
        const token = user.authentication.accessToken;
        const config = {
            headers: {'Authorization': `Bearer ${token}`}
        }
        Axios.delete(`/api/posts/post/${postId}`, config)
            .then(response => {
                console.log(response);
                if (response.status == 204) {
                    history.push("/");
                } else {
                    alert('게시글 삭제 실패');
                }
            });
    }

    const handleUpdateButton = () => {
        alert("update")
    }

    const handleCancel = () => {
        setIsDeleteModalOpen(false);
    }

    useEffect(() => {
        Axios.get(`/api/posts/${postId}`)
            .then(response => {
                if (!response.data) {
                    return;
                }
                setPost(response.data);
                const token = user.authentication?.accessToken ?? "";
                if (!token) {
                    return;
                }
                setIsOwnPost(response.data.userId === TokenParser.parseToUserId(token));
            })
            .catch(error => {
                console.log("fail", error);
            });
    }, [])
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <Row hidden={!IsOwnPost} style={{ textAlign: 'right' }}>
                <Button type="dashed" onClick={handleUpdateButton} style={{ marginRight: '8px' }}>수정</Button>
                <Button type="danger" onClick={handleDeleteButton} style={{ marginLeft: '8px' }}>삭제</Button>
                <Modal okType="danger" okText="Delete" visible={IsDeleteModalOpen} onOk={handleDeleteConfirm} onCancel={handleCancel}>
                    게시글을 삭제하시겠습니까?
                </Modal>
            </Row>

            <Title style={{ textAlign: 'center'}} level={1}> {Post.title} </Title>
            <Paragraph style={{ textAlign: 'right'}}> written by <strong>{Post.userId}</strong> </Paragraph>
            <Text style={{ whiteSpace: 'pre-wrap' }}> {Post.content} </Text>
            <CommentSection/>
        </div>
    )
}

export default PostDetailPage