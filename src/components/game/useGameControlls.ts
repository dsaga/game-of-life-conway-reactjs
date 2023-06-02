import * as React from "react";

export function useGameControlls() {
  const [isAutoPlaying, setIsAutoPlaying] = React.useState<boolean>(false);
  const currentInterval = React.useRef<number | null>(null);
  const [currentGeneration, setCurrentGeneration] = React.useState<number>(0);
  const [stageSize, setStageSize] = React.useState<number>(0);

  const startAutoPlay = () => {
    const interval = setInterval(() => {
      setCurrentGeneration((_current) => _current + 1);
    }, 1000);
    currentInterval.current = interval;
  };

  const stopAutoPlay = () => {
    if (currentInterval.current) {
      clearInterval(currentInterval.current);
      currentInterval.current = null;
    }
  };

  React.useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => {
      stopAutoPlay();
    };
  }, [isAutoPlaying]);

  return {
    isAutoPlaying,
    setIsAutoPlaying,
    currentGeneration,
    setCurrentGeneration,
    stageSize,
    setStageSize
  };
}
