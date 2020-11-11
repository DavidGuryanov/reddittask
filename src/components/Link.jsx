import React from "react";
import { useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";
import "../index.css";

const Link = ({ data, index = 0, style = {} }) => {
  const dispatch = useDispatch();
  const likeHandler = (link) => {
    dispatch({ type: "FAVOURITE_LINK_REQUEST", payload: { link } });
  };
  const deleteHandler = (link) => {
    dispatch({ type: "DELETE_LINK_REQUEST", payload: { link } });
  };
  return (
    <ListGroup.Item key={data.id} style={style}>
      <i className="far fa-trash-alt" onClick={() => deleteHandler(data)}></i>
      <i
        className={data.favourited ? "fas fa-heart" : "far fa-heart"}
        onClick={(e) => likeHandler(data)}
      ></i>
      <a href={data.url}>{data.title}</a>
    </ListGroup.Item>
  );
};

export default Link;
