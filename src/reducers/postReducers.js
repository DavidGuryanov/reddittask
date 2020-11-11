export const postReducers = (state = {}, action) => {
  switch (action.type) {
    case "GET_POSTS_LOADING":
      return { ...state, loading: true };
    case "GET_POSTS_FRONTEND":
      return { ...state, loading: false, frontend: action.payload };
    case "GET_POSTS_REACTJS":
      return { ...state, loading: false, reactjs: action.payload };
    case "GET_POSTS_VUEJS":
      return { ...state, loading: false, vuejs: action.payload };
    case "GET_POSTS_ANGULAR":
      return { ...state, loading: false, angular: action.payload };
    default:
      return state;
  }
};
