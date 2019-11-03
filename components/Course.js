import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

function getCourseWidth(screenWidth) {
  var cardWidth = screenWidth - 40;
  if (screenWidth >= 768) {
    cardWidth = (screenWidth - 60) / 2;
  }
  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3;
  }

  return cardWidth;
}

class Course extends React.Component {
  state = {
    cardWidth: getCourseWidth(screenWidth)
  };

  componentDidMount() {
    Dimensions.addEventListener("change", this.adaptLayout);
  }

  adaptLayout = dimensions => {
    this,
      this.setState({
        cardWidth: getCourseWidth(dimensions.window.width)
      });
  };

  render() {
    return (
      <Container style={{ width: this.state.cardWidth, elevation: 10 }}>
        <Cover>
          <Image source={this.props.image} />
          <Logo source={this.props.logo} resizeMode="contain" />
          <Text>{this.props.text}</Text>
          <Title>{this.props.title}</Title>
        </Cover>
        <Content>
          <Avatar source={this.props.avatar} />
          <Wrapper>
            <Caption>{this.props.caption}</Caption>
            <Subtitle>{this.props.subtitle}</Subtitle>
          </Wrapper>
        </Content>
      </Container>
    );
  }
}

export default Course;

const Container = styled.View`
  background: white;
  width: 335px;
  height: 335px;
  border-radius: 14px;
  margin: 20px 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const Content = styled.View`
  padding-left: 62px;
  flex-direction: row;
  align-items: center;
  height: 80px;
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`;

const Text = styled.Text`
  text-transform: uppercase;
  color: white;
  font-size: 15px;
  margin-left: 20px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Caption = styled.Text`
  color: #3c4560;
  font-weight: 300;
  font-size: 15px;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 300;
  font-size: 15px;
  margin-top: 4px;
`;

const Wrapper = styled.View`
  margin-left: 10px;
`;

const Cover = styled.View`
  width: 100%;
  height: 260px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 20px;
  width: 170px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
