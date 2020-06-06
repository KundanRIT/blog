import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blog_posts":
      return action.payload;
    // case "add_blog_post":
    //   return [...state,
    //     {
    //       id: Math.floor(Math.random() * 99999),
    //       title: action.payload.title,
    //       content: action.payload.content
    //     }];
    case "delete_blog_post":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit_blog_post":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({type: "get_blog_posts", payload: response.data});
  }
};

const addBlogPost = () => {
  return async (title, content, callback) => {
    // dispatch({type: "add_blog_post", payload: {title, content}});
    await jsonServer.post("/blogposts", {title, content});
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({type: "delete_blog_post", payload: id});
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, {title, content});
    dispatch({
      type: "edit_blog_post",
      payload: {id, title, content}
    });
    if (callback) {
      callback();
    }
  };
};

export const {Context, Provider} = createDataContext(
  blogReducer,
  {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},
  []
);