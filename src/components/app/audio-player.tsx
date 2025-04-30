"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  fileName: string;
  url: string;
}

export function AudioPlayer({ fileName, url }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    // Events
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [url]); // Add url to dependency array to handle url changes

  const handleEnded = () => {
    setIsPlaying(false);
    cancelAnimationFrame(animationRef.current as number);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audio.pause();
      setIsPlaying(false);
      cancelAnimationFrame(animationRef.current as number);
    }
  };

  const whilePlaying = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const changeRange = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const changeVolume = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = value[0];
      setVolume(value[0]);
      if (value[0] === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      if (!isMuted) {
        audio.volume = 0;
        setIsMuted(true);
      } else {
        audio.volume = volume;
        setIsMuted(false);
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="flex flex-col space-y-2 rounded-md border bg-card p-3 shadow-sm">
      <span className="text-sm font-medium">{fileName}</span>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <div className="w-20">
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={changeVolume}
              className="h-1.5"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
          {formatTime(currentTime)}
        </span>
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.01}
          onValueChange={changeRange}
          className="h-1.5"
        />
        <span className="w-10 text-xs tabular-nums text-muted-foreground">
          {formatTime(duration)}
        </span>
      </div>

      <audio ref={audioRef} src={url} preload="metadata" />
    </div>
  );
}
