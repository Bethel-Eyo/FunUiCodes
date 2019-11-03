import React from "react";
import styled from "styled-components";

export const Logo = props => (
  <Container style={{ elevation: 10 }}>
    <Image source={props.image} />
    <Text>{props.text}</Text>
  </Container>
);

const Container = styled.View`
  flex-direction: row;
  background: white;
  height: 60px;
  padding: 12px 16px 12px;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  align-items: center;
  margin: 12px 8px;
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
`;
