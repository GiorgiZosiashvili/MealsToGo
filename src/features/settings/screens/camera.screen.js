import { Camera, CameraType } from "expo-camera";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import styled from "styled-components/native";
import { Dimensions, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const CameraScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      requestPermission(status === "granted");
    })();
  }, []);
  const takeAPicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
    }
    navigation.goBack();
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeArea>
      <Container>
        <CameraView ref={(camera) => (cameraRef.current = camera)} type={type}>
          <Body>
            <SwitchCamera onPress={toggleCameraType}>
              <MaterialIcons name="flip-camera-ios" size={30} color="white" />
            </SwitchCamera>
            <TakeAPicture onPress={takeAPicture}>
              <AntDesign name="camera" size={35} color="white" />
            </TakeAPicture>
          </Body>
        </CameraView>
      </Container>
    </SafeArea>
  );
};
const Container = styled.View`
  flex: 1;
`;
const Text = styled.Text``;
const CameraView = styled(Camera)`
  flex: 1;
`;
const SwitchCamera = styled.TouchableOpacity`
position:absolute
  right:20px;
  top:20px`;
const TakeAPicture = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: ${Dimensions.get("window").width / 2 - 35}px;
  background-color: red;
  width: 70px;
  height: 70px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  border-width: 1px;
  border-color: white;
`;
const Body = styled.View`
  flex: 1;
`;

export default CameraScreen;
