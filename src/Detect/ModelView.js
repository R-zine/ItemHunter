import { useRef, useCallback, useMemo, useEffect, useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { Camera } from "expo-camera";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  Button,
} from "react-native";
import { CustomTensorCamera } from "./CustomTensorCamera";
import { LoadingView } from "./LoadingView";
import { PredictionList } from "./PredictionList";
import { useTensorFlowModel } from "./useTensorFlow";
import { useSelector } from "react-redux";
import { colors } from "../utils/colors";

export function ModelView({ navigation }) {
  const model = useTensorFlowModel(mobilenet);
  const [predictions, setPredictions] = useState([]);
  const [isOver, setIsOver] = useState(false);

  const word = useSelector((state) => state.word.word);

  useEffect(() => {
    if (isOver) navigation.navigate("Menu", { screen: "Item Selector" });
  }, [isOver]);

  if (!word)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          You have not selected a word yet! Please select one from the word
          selector.
        </Text>
        <Button
          color={colors.red}
          title="Word Selector"
          onPress={() =>
            navigation.navigate("Menu", { screen: "Item Selector" })
          }
        />
      </View>
    );

  if (!model) {
    return <LoadingView message="Loading AI neural network" />;
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "black", justifyContent: "center" }}
    >
      <PredictionList predictions={predictions} isOver={setIsOver} />
      <View style={{ borderRadius: 20, overflow: "hidden" }}>
        <ModelCamera model={model} setPredictions={setPredictions} />
      </View>
    </View>
  );
}

function ModelCamera({ model, setPredictions }) {
  const raf = useRef(null);
  const size = useWindowDimensions();

  useEffect(() => {
    return () => {
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const onReady = useCallback(
    (images) => {
      const loop = async () => {
        const nextImageTensor = images.next().value;
        const predictions = await model.classify(nextImageTensor);

        setPredictions(predictions);
        raf.current = requestAnimationFrame(loop);
      };
      loop();
    },
    [setPredictions]
  );

  return useMemo(
    () => (
      <CustomTensorCamera
        width={size.width}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onReady={onReady}
        autorender
      />
    ),
    [onReady, size.width]
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    margin: 15,
    textAlign: "center",
  },
  camera: {
    zIndex: 0,
  },
});
