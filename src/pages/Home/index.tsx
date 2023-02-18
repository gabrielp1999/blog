import React, { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { PersonInfo } from "./PersonInfo";
import { PostCard } from "./PostCard";
import {
  HomeContainer,
  HomeContent,
  ListSection,
  SearchSection,
  PostsSection
} from "./styles";

export interface IPost {
  title: string;
  body: string;
  created_at: string;
  number: string;
}

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([] as IPost[]);
  const [postsSearch, setPostsSearch] = useState<IPost[]>([] as IPost[]);
  const [postsCounter, setPostsCounter] = useState(0);

  async function fetchPosts(query = "") {
    const response = await api.get(
      `search/issues?q=${
        query ? query : ""
      }%20label:published%20repo:${"gabrielp1999"}/blog`
    );
    setPosts(response.data.items);
    setPostsSearch(response.data.items)
    setPostsCounter(response.data.total_count);
  }

  useEffect(() => {
    // console.log(posts)
    fetchPosts();
  }, []);

  const filterPosts = (search: String) : void => {

    const postFilter = posts.filter((post) =>{
      return post.title.toLowerCase().includes(search.toLowerCase())
    })
    setPostsSearch(postFilter);
  }
  console.log(postsSearch)

  return (
    <>
    <head>
      <meta name="description" content="Aqui falo um pouco sobre tecnologia e café rsr." />
      <title>Blog Gabriel</title>
    </head>
    <HomeContainer>
      <PersonInfo></PersonInfo>
      <HomeContent>
        <SearchSection>
          <div>
            <span>Posts</span>
            <small>{postsSearch.length} posts</small>
          </div>
          <input
            type="text"
            onChange={(e) => filterPosts(e.target.value)}
            placeholder="Search a Post"
          />
        </SearchSection>

      <PostsSection>
        {postsSearch &&
          postsSearch.map((post) => (
            <PostCard
              key={`${post.title}-${post.number}`}
              post={post}
            ></PostCard>
          ))}

      </PostsSection>
      </HomeContent>
    </HomeContainer>
    </>
  );
}
