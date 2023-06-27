import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link   } from "react-router-dom"

export default function PostList({}){

    const DB_API_URL = process.env.REACT_APP_DB_API_URL;


    const [postsData, setPostsData] = useState([]);


    const [ref, inView] = useInView();

    const [page, setPage] = useState(1);

    const [clickedPostId, setClickedPostId] = useState(null);

    const handlePostClick = (postId) => {
    setClickedPostId(postId);
    };



    
    const fetchPosts = (pageNum) => {
        axios
          .get(`${DB_API_URL}/posts?limit=10&page=${page}`)
          .then((res) => {
            const jsonPostsData = JSON.parse(res.data.body);
            setPostsData((prevData) => [...prevData, ...jsonPostsData]);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      useEffect(() => {
        fetchPosts(page);
      }, [page]);
    
      useEffect(() => {
        if (inView) {
          setPage((prevPage) => prevPage + 1);
        }
      }, [inView]);




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
                                    <td colSpan="4">게시글이 존재하지 않습니다.</td>
                                </tr>
                            )
                        }

                        {postsData.map(post => 
                        {
                            return(
                        <tr key={post.post_idx}>
                            <td>{post.post_idx}</td>
                            <td className={`title ${clickedPostId === post.post_idx ? 'clicked' : ''}`} 
                            onClick={() => handlePostClick(post.post_idx)}>
                            <Link to={`/posts/${post.post_idx}`}>{post.title}</Link>
                            </td>
                            <td>{post.nickname}</td>
                            <td>{post.created_at}</td>
                        </tr>
                        
                        )})

                        
                            }
                    </tbody>
                </table>

                <div ref={ref}></div>
            </div>
            

        </>
    );
};


