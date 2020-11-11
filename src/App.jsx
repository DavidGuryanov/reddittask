import Buttons from "./components/Buttons";
import Links from "./components/Links";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

function App() {
  let posts = useSelector((state) => state.links);
  return (
    <Container bg={"dark"} className="App py-3">
      <Buttons></Buttons>
      <Links posts={posts} />
    </Container>
  );
}

export default App;
