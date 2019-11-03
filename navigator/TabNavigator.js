import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import { Ionicons } from "@expo/vector-icons";
import ProjectsScreen from "../screens/ProjectsScreen";
import CoursesScreen from "../screens/CoursesScreen";

const activeColor = "#4775f2";
const inActiveColor = "#b8bece";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Section: SectionScreen
});

HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;
  if (routeName == "Section") {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name="ios-home"
        size={26}
        color={focused ? activeColor : inActiveColor}
      />
    )
  };
};

const ProjectStack = createStackNavigator({
  Projects: ProjectsScreen
});

ProjectStack.navigationOptions = {
  tabBarLabel: "Projects",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-folder"
      size={26}
      color={focused ? activeColor : inActiveColor}
    />
  )
};

const CourseStack = createStackNavigator({
  Courses: CoursesScreen
});

CourseStack.navigationOptions = {
  tabBarLabel: "Courses",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-albums"
      size={26}
      color={focused ? activeColor : inActiveColor}
    />
  )
};

const TabNavigator = createBottomTabNavigator({
  ProjectStack,
  HomeStack,
  CourseStack
});

export default TabNavigator;
