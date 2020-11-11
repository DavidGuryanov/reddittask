import React from "react";
import { useSelector } from "react-redux";
import { ListGroup, Spinner } from "react-bootstrap";
import "../index.css";
import Link from "./Link";
import { FixedSizeList as List } from "react-window";

const Links = () => {
  let posts = useSelector((state) => state.links);
  let { loading } = useSelector((state) => state.posts);

  const Row = (props) => {
    const { index, style, data } = props;
    return <Link data={data[index]} style={style}></Link>;
  };
  return (
    <ListGroup variant="flush" className="my-3">
      {loading && (
        <Spinner
          style={{
            width: "50px",
            height: "50px",
            margin: "auto",
            display: "block",
          }}
          animation="border"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <List
        height={350}
        itemCount={posts.links.length}
        itemSize={49}
        width="100%"
        itemData={posts.links}
      >
        {Row}
      </List>
    </ListGroup>
  );
};

export default Links;
