import axios from "axios";
import { useEffect, useState } from "react";


export default function PostList(){

    const DB_API_URL = process.env.REACT_APP_DB_API_URL;


    const [postsData, setPostsData] = useState([]);


    
    useEffect(() => {
        axios.get(`${DB_API_URL}/posts`)
        .then(res => {
            const jsonPostsData = JSON.parse(res.data.body);
            setPostsData(jsonPostsData);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])





    return (
        <>
            <div className="container">
                <h2>게시판 목록</h2>
                <table className="posts_list">
                    <colgroup>
                        <col width="10%" />
                        <col width="*" />
                        <col width="15%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">글번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            postsData.length === 0 && (
                                <tr>
                                    <td colSpan="4">일치하는 데이터가 없습니다.</td>
                                </tr>
                            )
                        }

                        {postsData.map(post => 
                        {
                            return(
                        <tr key={post.post_idx}>
                            <td>{post.post_idx}</td>
                            <td className="title">{post.title}</td>
                            <td>{post.nickname}</td>
                            <td>{post.created_at}</td>
                        </tr>
                        )})
                            }
                    </tbody>
                </table>
            </div>

        </>
    );
};


