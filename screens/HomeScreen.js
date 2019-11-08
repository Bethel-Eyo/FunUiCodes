import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar
} from "react-native";
import Card from "../components/Card";
import Course from "../components/Course";
import NotificationButton from "../components/NotificationButton";
import { Logo } from "../components/Logo";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ModalLogin from "../components/ModalLogin";
import Notifications from "../components/Notifications";

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        content
      }
    }
  }
`;

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () => {
      dispatch({
        type: "OPEN_MENU"
      });
    },
    openLogin: () => {
      dispatch({
        type: "OPEN_LOGIN"
      });
    },
    openNotif: () => {
      dispatch({
        type: "OPEN_NOTIF"
      });
    }
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);

    if (Platform.OS == "android") {
      StatusBar.setBarStyle("light-content", true);
    }
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 500,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.scale, {
        toValue: 1,
        duration: 500,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  handleAvatarClick = () => {
    if (this.props.name !== "Unknown User") {
      this.props.openMenu();
    } else {
      this.props.openLogin();
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <Notifications />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <ScrollView>
              <View style={styles.titleBar}>
                <TouchableOpacity
                  onPress={this.handleAvatarClick}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Text style={styles.title}>Hello Citiworks.ng</Text>
                <Text style={styles.name}>{this.props.name}</Text>
                <TouchableOpacity
                  onPress={() => this.props.openNotif()}
                  style={{ position: "absolute", right: 20, top: 5 }}
                >
                  <NotificationButton />
                </TouchableOpacity>
              </View>
              <ScrollView
                style={styles.logo}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, index) => (
                  <Logo key={index} image={logo.image} text={logo.text} />
                ))}
              </ScrollView>
              <Text style={styles.subtitle}>Continue learning</Text>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                <Query query={CardsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <Message>Loading...</Message>;
                    if (error) return <Message>Error...</Message>;
                    // console.log(data.cardsCollection.items);
                    return (
                      <CardsContainer>
                        {data.cardsCollection.items.map((card, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.navigation.push("Section", {
                                section: card
                              });
                            }}
                          >
                            <Card
                              image={{ uri: card.image.url }}
                              logo={{ uri: card.logo.url }}
                              title={card.title}
                              caption={card.caption}
                              subtitle={card.subtitle}
                              content={card.content}
                            />
                          </TouchableOpacity>
                        ))}
                      </CardsContainer>
                    );
                  }}
                </Query>
              </ScrollView>
              <Text style={styles.subtitle}>popular courses</Text>
              <CourseContainer>
                {courses.map((course, index) => (
                  <Course
                    key={index}
                    logo={course.logo}
                    image={course.image}
                    avatar={course.avatar}
                    title={course.title}
                    caption={course.caption}
                    subtitle={course.subtitle}
                    text={course.text}
                  />
                ))}
              </CourseContainer>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
        <ModalLogin />
      </RootView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  logo: {
    flexDirection: "row",
    padding: 20,
    paddingLeft: 12,
    paddingTop: 30
  },
  notificationIcon: {
    position: "absolute",
    right: 20,
    top: 5
  },
  title: {
    fontSize: 16,
    color: "#b8bece",
    fontWeight: "500"
  },
  subtitle: {
    color: "#b8bece",
    fontWeight: "600",
    fontSize: 15,
    marginTop: 20,
    marginLeft: 20,
    textTransform: "uppercase"
  },
  name: {
    fontSize: 20,
    color: "#3c4560",
    fontWeight: "bold"
  },
  titleBar: {
    width: "100%",
    marginTop: 50,
    paddingLeft: 80
  }
});

const CourseContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const CardsContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const logos = [
  {
    image: require("../assets/logo-framerx.png"),
    text: "Framer X"
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "Figma"
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React"
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Sketch"
  },
  {
    image: require("../assets/logo-swift.png"),
    text: "Swift"
  }
];

const courses = [
  {
    logo: require("../assets/logo-studio.png"),
    image: require("../assets/background2.jpg"),
    avatar: require("../assets/avatar.jpg"),
    title: "Prototype in InVision studio",
    caption: "Learn to design and code in react site",
    subtitle: "developed by Bethel Eyo",
    text: "10 sections"
  },
  {
    title: "React for Designers",
    text: "12 sections",
    image: require("../assets/background11.jpg"),
    logo: require("../assets/logo-react.png"),
    subtitle: "developed by Bethel Eyo",
    avatar: require("../assets/avatar.jpg"),
    caption: "Learn to design and code a React site"
  },
  {
    title: "Design and Code with Framer X",
    text: "10 sections",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-framerx.png"),
    subtitle: "developed by Bethel Eyo",
    avatar: require("../assets/avatar.jpg"),
    caption: "Create powerful design and code components for your app"
  },
  {
    title: "Design System in Figma",
    text: "10 sections",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-figma.png"),
    subtitle: "developed by Bethel Eyo",
    avatar: require("../assets/avatar.jpg"),
    caption:
      "Complete guide to designing a site using a collaborative design tool"
  }
];
