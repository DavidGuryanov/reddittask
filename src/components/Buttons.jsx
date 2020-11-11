import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Button, Container } from "react-bootstrap";

const Buttons = () => {
  let windowWidth = document.documentElement.clientWidth;
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [lastBtn, setlastBtn] = useState(0);
  const feButton = useRef(null);
  const reactButton = useRef(null);
  const vueButton = useRef(null);
  const angButton = useRef(null);
  useEffect(() => {
    feButton.current.anim = feButton.current.animate(
      [
        { transform: "translateX(0px)" },
        { transform: `translateX(${windowWidth - 150}px)` },
      ],
      {
        duration: 5000,
        iterations: Infinity,
        direction: "alternate",
        origin: "center",
      }
    );
    reactButton.current.anim = reactButton.current.animate(
      [
        { transform: "translateX(0px)" },
        { transform: `translateX(${windowWidth - 150}px)` },
      ],
      {
        duration: 5000,
        iterations: Infinity,
        direction: "alternate",
      }
    );
    vueButton.current.anim = vueButton.current.animate(
      [
        { transform: "translateX(0px)" },
        { transform: `translateX(${windowWidth - 150}px)` },
      ],
      {
        duration: 5000,
        iterations: Infinity,
        direction: "alternate",
      }
    );
    angButton.current.anim = angButton.current.animate(
      [
        { transform: "translateX(0px)" },
        { transform: `translateX(${windowWidth - 150}px)` },
      ],
      {
        duration: 5000,
        iterations: Infinity,
        direction: "alternate",
      }
    );
  }, [feButton, reactButton, vueButton, angButton, windowWidth]);
  const onClickHandler = (subreddit, ref) => {
    dispatch({ type: "GET_POSTS_REQUEST", payload: { subreddit } });

    ref.current.anim.pause();
    if (id && lastBtn === ref) {
      clearTimeout(id);
    }
    setlastBtn(ref);
    setId(
      setTimeout(() => {
        ref.current.anim.play();
      }, 500)
    );
  };

  return (
    <Container>
      <Row>
        <Button
          className="my-3"
          type="button"
          variant="light"
          onClick={(e) => onClickHandler("Frontend", feButton)}
          ref={feButton}
          size="xl"
        >
          Frontend
        </Button>
      </Row>
      <Row>
        <Button
          className="my-3"
          type="button"
          variant="light"
          onClick={() => onClickHandler("ReactJS", reactButton)}
          ref={reactButton}
        >
          ReactJS
        </Button>
      </Row>
      <Row>
        <Button
          className="my-3"
          type="button"
          variant="light"
          onClick={() => onClickHandler("VueJS", vueButton)}
          ref={vueButton}
        >
          VueJS
        </Button>
      </Row>
      <Row>
        <Button
          className="my-3"
          type="button"
          variant="light"
          onClick={() => onClickHandler("Angular", angButton)}
          ref={angButton}
        >
          Angular
        </Button>
      </Row>
    </Container>
  );
};

export default Buttons;
