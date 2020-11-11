import { put, takeEvery, select, all } from "redux-saga/effects";
import axios from "axios";

function* fetchPostsSaga(action) {
  const getPosts = (state) => state;
  const { subreddit } = action.payload;
  const { posts, links } = yield select(getPosts);
  let subposts = posts[subreddit.toLowerCase()];
  let generateRandomNum = () => {
    return Math.floor(Math.random() * 25);
  };
  if (!subposts) {
    try {
      yield put({
        type: `GET_POSTS_LOADING`,
      });
      const {
        data: {
          data: { children },
        },
      } = yield axios.get(`https://www.reddit.com/r/${subreddit}.json`);
      yield put({
        type: `GET_POSTS_${subreddit.toUpperCase()}`,
        payload: children,
      });
      yield put({
        type: "ADD_LINK",
        payload: children[generateRandomNum()].data,
      });
    } catch (e) {
      yield put({ type: "GET_POSTS_FAILED", message: e.message });
    }
  } else {
    let num = generateRandomNum();
    let exists = links.links.find((el) => el.url === subposts[num].data.url);
    while (exists && links.links.length < 25) {
      num = generateRandomNum();
      // eslint-disable-next-line no-loop-func
      exists = links.links.find((el) => el.url === subposts[num].data.url);
    }
    if (!exists) {
      yield put({
        type: "ADD_LINK",
        payload: subposts[num].data,
      });
    }
  }
}

function* favLink(action) {
  let {
    payload: { link },
  } = action;
  yield put({ type: "FAVOURITE_LINK", payload: link });
}
function* delLink(action) {
  let {
    payload: { link },
  } = action;
  yield put({ type: "DELETE_LINK", payload: link });
}

function* sagaPosts() {
  yield takeEvery("GET_POSTS_REQUEST", fetchPostsSaga);
}
function* sagaFavLink() {
  yield takeEvery("FAVOURITE_LINK_REQUEST", favLink);
}
function* sagaDelLink() {
  yield takeEvery("DELETE_LINK_REQUEST", delLink);
}
export default function* rootSaga() {
  yield all([sagaPosts(), sagaFavLink(), sagaDelLink()]);
}
