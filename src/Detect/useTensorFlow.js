import { useEffect, useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";

export function useTensorFlowModel(modelKind) {
  const [model, setModel] = useState(null);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    setModel(null);
    modelKind.load().then((model) => {
      if (isMounted.current) {
        setModel(model);
      }
    });
  }, [modelKind]);

  return model;
}

export function useTensorFlowLoaded() {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    tf.ready().then(() => {
      if (isMounted) {
        setLoaded(true);
      }
    });
    return () => (isMounted = false);
  }, []);

  return isLoaded;
}
