import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
import { IPost } from "..";
import { formatText } from "../../../utils/formatText";
import { PostCardContainer, PostItemContent } from "./styles";

interface IPostCard {
  post: IPost;
}

export function PostCard({ post }: IPostCard) {
  const { created_at, body, title, number } = post;
  const formattedDate = formatDistanceToNow(new Date(created_at), {
    locale: enUS,
    addSuffix: true,
  });
  return (
    <PostCardContainer to={`/${number}`}>
      <header>
        <h1>{title}</h1>
      </header>
      <main>
      <PostItemContent className="p-img">{body}</PostItemContent>
      </main>
        <span>{formattedDate}</span>
    </PostCardContainer>
  );
}
