import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Text,
  WebView,
  StyleSheet
} from "react-native";

class SectionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam("section");
    return (
      <ScrollView>
        <Container>
          <StatusBar hidden />
          <Cover>
            <Image source={{ uri: section.image.url }} />
            <Wrapper>
              <Logo source={{ uri: section.logo.url }} />
              <Subtitle>{section.subtitle}</Subtitle>
            </Wrapper>
            <Title>{section.title}</Title>
            <Caption>{section.caption}</Caption>
          </Cover>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <CloseView>
              <Ionicons name="ios-close" size={32} color="#546bfb" />
            </CloseView>
          </TouchableOpacity>
          <Content>
            <WebView
              source={{ uri: "http://bit.ly/2NBVpTI" }}
              style={{ marginTop: 10 }}
              useWebKit={true}
              scrollEnabled={false}
            />
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default SectionScreen;

const Content = styled.View`
  height: 1000px;
  padding: 10px;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #3c4560;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  position: absolute;
  left: 20px;
  font-size: 17px;
  color: white;
  bottom: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  background: white;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;
