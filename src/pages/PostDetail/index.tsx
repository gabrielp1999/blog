import React, { useEffect, useState } from "react";
import { PostContent } from './components/PostContent'

import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { api } from "../../lib/axios";
import {
  NavButton,
  PostDetailCard,
  PostDetailContainer,
  PostDetailContent,
} from "./styles";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";

interface IPostDetail {
  title: string;
  comments: number;
  createdAt: string;
  githubUsername: string;
  url: string;
  body: string;
}

export function PostDetail() {
  const [post, setPost] = useState<IPostDetail>({} as IPostDetail);
  const { id } = useParams();

  async function fetchPost() {
    const response = await api.get(
      `/repos/gabrielp1999/blog/issues/${id}`
    );
    const { title, comments, created_at, user, html_url, body } = response.data;
    const newPostObj = {
      title,
      githubUsername: user.login,
      comments,
      createdAt: formatDistanceToNow(new Date(created_at), {
        locale: ptBR,
        addSuffix: true,
      }),
      url: html_url,
      body,
    };
    setPost(newPostObj);
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
    <head>
      <meta property="og:image" content="https://avatars.githubusercontent.com/u/82981798?v=4" />
      <meta property="og:url" content="https://blog-gabriel.vercel.app/" />
      <title>{post.title ? post.title : "Blog Gabriel"} </title>
      <meta property="description" content={post.body} />
    </head>
      <PostDetailContainer>
        <PostDetailCard>
          <header>
            <NavButton to="/" type="button">
              <i className="fa-solid fa-chevron-left"></i>
              Back
            </NavButton>
            <a href={post.url} target="_blank">
              See on Github
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </header>
          <div>
            <h1>{post.title}</h1>
          </div>
          <footer>
            <span>
              <i className="fa-brands fa-github"></i>
              {post.githubUsername}
            </span>
            <span>
              <i className="fa-solid fa-calendar"></i>
              {post.createdAt}
            </span>
            <span>
              <i className="fa-solid fa-comment"></i>
              {post.comments} Comentarios
            </span>
          </footer>
        </PostDetailCard>
        <PostDetailContent>
          <PostContent content={post.body}/>
        </PostDetailContent>
      </PostDetailContainer>
    </>
  );
}
