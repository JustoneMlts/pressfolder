import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { FaBackward, FaPlay, FaForward, FaVolumeUp, FaPause } from 'react-icons/fa';
import MistLostMedia from '../Assets/MistLostMedia.jpg';
import Dolls from '../Musics/Dolls.wav';
import BC from '../Musics/Brambling Crown.wav';
import TSOABM from '../Musics/The Story of a Blind Man.wav';
import Radiostar from '../Musics/Radiostar.wav';
import Dementia from '../Musics/Dementia.wav';

export default function Audio ({ currentTrack, setCurrentTrack }) {
    const musicArray = useMemo(() => [
        { id: 0, cover: MistLostMedia, src: Dolls, title: "Dolls", album: "Lost Media", duration: "3:13" },
        { id: 1, cover: MistLostMedia, src: BC, title: "Brambling Crown", album: "Lost Media", duration: "5:36" },
        { id: 2, cover: MistLostMedia, src: TSOABM, title: "The Story of a Blind Man", album: "Lost Media", duration: "3:57" },
        { id: 3, cover: MistLostMedia, src: Radiostar, title: "Radiostar", album: "Lost Media", duration: "5:24" },
        { id: 4, cover: MistLostMedia, src: Dementia, title: "Dementia", album: "Lost Media", duration: "5:33" },
      ], []);

    const theme = useTheme();

    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(80);
    const [musicArrayFiltered, setMusicArrayFiltered] = useState(musicArray);

    const audioRef = useRef(null);

    useEffect(() => {
        if (currentTrack) {
            setMusicArrayFiltered(musicArray.filter((music) => currentTrack.id !== music.id));
        }
    }, [currentTrack]);

    const handleTimeUpdate = () => {
        if (audioRef && audioRef.current) setPosition(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (audioRef && audioRef.current) setDuration(audioRef.current.duration);
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handlePreviousTrack = () => {
        setCurrentTrack((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNextTrack = () => {
        setCurrentTrack((prevIndex) => Math.min(prevIndex + 1, musicArray.length - 1));
    };

    const handleSliderChange = (_, value) => {
        setPosition(value);
        if (audioRef && audioRef.current) audioRef.current.currentTime = value;
    };

    const handleVolumeChange = (_, value) => {
        setVolume(value);
        if (audioRef && audioRef.current) audioRef.current.volume = value / 100;
    };

    useEffect(() => {
        if (audioRef && audioRef.current) {
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

            return () => {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, []);

    useEffect(() => {
        if (isPlaying && audioRef) audioRef.current.play();
    }, [currentTrack])

    // useEffect(() => {
    //     console.log(currentTrackIndex)
    //     if (currentTrack && currentTrackIndex) {
    //         setCurrentTrack(musicArray[currentTrackIndex])
    //     }
    // }, [currentTrackIndex])

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
      }

    return (
        <div className="rounded-lg p-6 w-full bg-[#2a2a2a] max-w-md flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <div>
                        <img src={currentTrack?.cover} alt="Album Cover" className="object-cover w-full h-full" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="w-full grid gap-4">
                    <div className="bottom-4 left-4 text-white">
                        <div className="text-lg font-bold line-clamp-1">{currentTrack?.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{currentTrack?.album}</div>
                    </div>
                    <Slider
                        aria-label="time-indicator"
                        size="small"
                        value={position}
                        min={0}
                        step={1}
                        max={duration}
                        onChange={handleSliderChange}
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                            height: 4,
                            '& .MuiSlider-thumb': {
                                width: 8,
                                height: 8,
                                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                '&::before': {
                                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                },
                                '&:hover, &.Mui-focusVisible': {
                                    boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                                        ? 'rgb(255 255 255 / 16%)'
                                        : 'rgb(0 0 0 / 16%)'
                                        }`,
                                },
                                '&.Mui-active': {
                                    width: 20,
                                    height: 20,
                                },
                            },
                            '& .MuiSlider-rail': {
                                opacity: 0.28,
                            },
                        }}
                    />
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" size="icon" className="text-primary" onClick={handlePreviousTrack}>
                            <FaBackward className="w-6 h-6" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-primary" onClick={handlePlayPause}>
                            {isPlaying ? <FaPause className="w-6 h-6" /> : <FaPlay className="w-6 h-6" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-primary" onClick={handleNextTrack}>
                            <FaForward className="w-6 h-6" />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div>{formatTime(position)}</div>
                        <div>{formatTime(duration)}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" size="icon" className="text-primary">
                            <FaVolumeUp className="w-6 h-6" />
                        </Button>
                        <Slider
                            className="flex-1"
                            value={volume}
                            onChange={handleVolumeChange}
                            aria-label="volume"
                            sx={{
                                '& .MuiSlider-thumb': {
                                    width: 20,
                                    height: 20,
                                },
                                '& .MuiSlider-rail': {
                                    opacity: 0.28,
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="grid gap-4">
                {musicArrayFiltered.map((music, index) => (
                    <div
                        key={music.id}
                        className="flex items-start gap-4 hover:cursor-pointer hover:bg-gray-700 transition duration-300 ease-in-out hover:scale-105 p-2 rounded-lg"
                        onClick={() => {
                            setCurrentTrack(music.id)
                            setIsPlaying(true);
                        }}
                    >                        
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                            <img src={music.cover} alt="Album Cover" className="object-cover w-full h-full" />
                        </div>
                        <div className="flex-1 grid gap-1">
                            <div className="font-medium line-clamp-1">{music.title}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">{music.album}</div>
                            <div className="text-sm text-muted-foreground">{music.duration}</div>
                        </div>
                    </div>
                ))}
            </div>
            <audio
                ref={audioRef}
                src={currentTrack?.src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
        </div>
    );
}
