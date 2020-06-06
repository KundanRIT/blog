import React, {useContext} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Context as BlogContext} from "../context/BlogContext";
import {FontAwesome} from '@expo/vector-icons';

const ShowBlogScreen = ({navigation}) => {
  const {state} = useContext(BlogContext);
  const blogPost = state.find((blogPost) => {
    return blogPost.id === navigation.getParam('id');
  })
  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

ShowBlogScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("EditBlog", {id: navigation.getParam('id')})}>
        <FontAwesome name="pencil" size={30} style={{marginRight: 10}}/>
      </TouchableOpacity>
    )
  };
};

export default ShowBlogScreen;