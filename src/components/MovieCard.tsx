import React from "react";
import { Card, Space } from "antd";
import { MdBookmarkBorder, MdStarBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getFavoriteMovie } from "../store/favoriteSlice";
import { Movie } from "./Interfaces";

const { Meta } = Card;

interface MovieCardProps {
  item: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Card
      style={{ width: "100%", maxWidth: "360px" }} // Adjusted margin value to 10px
      cover={
        <Link to={`/movie-details/${item.id}`}>
          <img alt="example" src={item.poster_path} style={{ width: "100%", maxWidth: "360px" }} />
        </Link>
      }
    >
      <Meta
        style={{ width: "100%" }}
        title={item.title}
        description={
          <Space size="large">
            <span style={{ color: "black" }}>Rating: {item.vote_average}</span>
            <MdStarBorder
              size={25}
              color="black"
              onClick={() => dispatch(getFavoriteMovie(item))}
            />
            <MdBookmarkBorder size={25} color="black" />
          </Space>
        }
      />
    </Card>
  );
};

export default MovieCard;
