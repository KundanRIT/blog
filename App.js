import React from "react";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import IndexScreen from "./src/screens/IndexScreen";
import {Provider as BlogProvider} from "./src/context/BlogContext";
import ShowBlogScreen from "./src/screens/ShowBlogScreen";
import CreateBlogScreen from "./src/screens/CreateBlogScreen";
import EditBlogScreen from "./src/screens/EditBlogScreen";

const navigator = createStackNavigator (
  {
    Index: IndexScreen,
    ShowBlog: ShowBlogScreen,
    CreateBlog: CreateBlogScreen,
    EditBlog: EditBlogScreen
  }, {
    initialRouteName: "Index",
    defaultNavigationOptions: {
      title: "Blogs"
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <BlogProvider>
      <App />
    </BlogProvider>
  );
}