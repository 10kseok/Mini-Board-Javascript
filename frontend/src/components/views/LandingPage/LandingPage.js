import { Card, Typography, Icon, Avatar, Col, Row, Tag, Button } from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import Paragraph from 'antd/lib/typography/Paragraph';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
    // DOM 로딩시 할 일 정의, 두번째 인자에 빈 배열을 넣으면 컴포넌트가 마운트됐을 때만 실행, 특정 값을 넣으면 이 값들이 변경될 때마다 효과가 실행
    const history = useHistory();
    const user = useSelector(state => state.user);
    const [Posts, setPosts] = useState([]);

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
        Axios.get("/api/posts", config)
            .then(response => {
                if (response.data) {
                    setPosts(response.data);
                }
            });
    }, [])

    const renderCards = Posts.map((post, index) => {
        return <Card style={{ marginBottom: 16, border: '1px solid #e8e8e8', borderRadius: 10 }} bordered={true}>
                    <a href={`/posts/${post.postId}`}>
                    <Title level={3}>
                        {post.title}
                        <Tag style={{marginLeft: 16}} color="green">user1</Tag>
                    </Title>
                    <br/>
                    <Paragraph>{post.content}</Paragraph>
                    </a>
                </Card>    
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> Posts </Title>
            <hr />
            <br/>
            <Button style={{ margin: 'auto', display: 'block' }}>Write</Button>
            <br/>
            <br/>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage
