import { Button, Card, Divider, Row, Tag, Typography } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const { Title } = Typography;

function LandingPage() {
    const history = useHistory();
    const user = useSelector(state => state.user);
    const [Posts, setPosts] = useState([]);

    const onWriteButtonClick = () => {
        history.push("/post/write");
    }

    useEffect(() => {
        Axios.get("/api/posts")
            .then(response => {
                if (response.data) {
                    setPosts(response.data);
                }
            })
    }, [])

    const colors = [
        "#e21400", // red
        "#ef7d00", // orange
        "#ffb900", // yellow  
        "#40b400", // green
        "#009688", // teal
        "#00acc1", // cyan  
        "#0091ea", // blue
        "#4051b5", // indigo
        "#673ab7", // purple
        "#ff4081"  // pink
    ];

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
           hash += str.charCodeAt(i);
        }
        return hash;
    } 

    const renderCards = Posts.sort((p1, p2) => p2.postId - p1.postId)
        .map((post, index) => {
            return <Card key={post.postId} style={{ marginBottom: 16, border: '1px solid #e8e8e8', borderRadius: 10 }} bordered={true}>
                        <Link to={`/posts/${post.postId}`}>
                        <Title level={3}>
                            {post.title}
                            <Tag style={{marginLeft: 16}} color={colors[hashCode(post.userId) % 10]}>{post.userId}</Tag>
                        </Title>
                        <br/>
                        <Paragraph ellipsis={{ rows: 2 }}>{post.content}</Paragraph>
                        </Link>
                    </Card>    
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> Posts </Title>
            <Divider />
            <br/>
            <Button style={{ margin: 'auto', display: 'block' }} onClick={onWriteButtonClick}>Write</Button>
            <br/>
            <br/>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage
