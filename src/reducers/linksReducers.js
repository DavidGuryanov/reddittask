export const linksReducers = (state = { links: [] }, action) => {
  let newState;
  switch (action.type) {
    case "ADD_LINK":
      newState = { ...state };
      newState.links.push(action.payload);
      return { ...newState };
    case "DELETE_LINK":
      let filteredArr = state.links.filter(
        (el) => el.url !== action.payload.url
      );
      return { links: filteredArr };
    case "FAVOURITE_LINK":
      let index = state.links.findIndex((el) => el.url === action.payload.url);
      newState = { ...state };
      newState.links[index].favourited = !newState.links[index].favourited;
      return { ...newState };
    default:
      return state;
  }
};
