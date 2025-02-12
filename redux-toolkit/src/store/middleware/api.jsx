export const apiMiddleware = (store) => (next) => (action) => {
  const BASE_URL = "https://fakestoreapi.com";
  if (action.type === "api/makeCall") {
    next(action);
    const { url, onStart, onSuccess, onError } = action.payload;
    store.dispatch({
      type: onStart,
    });
    fetch(`${BASE_URL}/${url}`)
      .then((res) => res.json())
      .then((data) =>
        store.dispatch({
          type: onSuccess,
          payload: data,
        })
      )
      .catch(() => {
        store.dispatch({
          type: onError,
        });
      });
  } else {
    next(action);
  }
};

export const fetchData = (payload) => ({ type: "api/makeCall", payload });
