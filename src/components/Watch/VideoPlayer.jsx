"use client"
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCompress, FaExpand, FaPause, FaPlay, FaVolumeXmark, FaVolumeHigh, FaVolumeLow } from "react-icons/fa6";

const VideoPlayer = ({ videoSrc }) => {
    const videoRef = useRef(null);
    const timelineRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [_, setTrigger] = useState(false);
    const [currentDuration, setcurrentDuration] = useState("00:00");
    const [percentComplete, setPercentComplete] = useState(0);

    const handleClickPlay = useCallback(() => {
        if (isPlaying) {
            videoRef.current?.pause();
        } else {
            videoRef.current?.play();
        }

        setIsPlaying(isPlaying => !isPlaying);
    }, [isPlaying, setIsPlaying]);

    const handleKeyPress = useCallback((event) => {
        if (document.activeElement?.tagName === "INPUT") return;

        const { key } = event;

        switch (key.toLocaleLowerCase()) {
            case " ":
                handleClickPlay();
            default:
                return;
        }
    }, [handleClickPlay]);

    const handleClickFullScreen = useCallback(() => {
        const videoElement = videoRef.current;

        if (!videoElement) return;

        const isCurrentlyFullScreen =
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement;

        if (isCurrentlyFullScreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { // For Safari
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) { // For Firefox
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) { // For IE/Edge
                document.msExitFullscreen();
            }
        } else {
            if (videoElement.requestFullscreen) {
                videoElement.requestFullscreen();
            } else if (videoElement.webkitRequestFullscreen) { // For Safari
                videoElement.webkitRequestFullscreen();
            } else if (videoElement.mozRequestFullScreen) { // For Firefox
                videoElement.mozRequestFullScreen();
            } else if (videoElement.msRequestFullscreen) { // For IE/Edge
                videoElement.msRequestFullscreen();
            }
        }

        setIsFullScreen((prevIsFullScreen) => !prevIsFullScreen);
    }, [setIsFullScreen, videoRef]);


    const handleMuted = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current?.muted;

            setTrigger(trigger => !trigger);
        }
    }, []);

    const handleVolumeChange = useCallback((event) => {
        if (videoRef.current) {
            videoRef.current.volume = Number(event.target.value);

            if (videoRef.current.volume === 0 || videoRef.current.volume !== 0 && videoRef.current.muted) {
                handleMuted();
            } else {
                setTrigger(trigger => !trigger);
            }
        }
    }, [handleMuted]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        }
    }, [handleKeyPress]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Prevent spacebar from scrolling only if the target is not an input, textarea, or other form elements
            if ((event.key === ' ' || event.code === 'Space') &&
                !['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
                event.preventDefault(); // Prevent the default scroll behavior
            }
        };

        // Add event listener for keydown
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const timestampFormatter = useMemo(() => {
        return new Intl.NumberFormat(undefined, {
            minimumIntegerDigits: 2,
        })
    }, []);

    const formatTimestamp = useCallback((timestamp) => {
        const hours = Math.floor(timestamp / (60 * 60));
        const minutes = Math.floor(timestamp / 60) % 60;
        const seconds = Math.floor(timestamp % 60);

        if (hours === 0) {
            return `${minutes}:${timestampFormatter.format(seconds)}`;
        } else {
            return `${hours}:${timestampFormatter.format(minutes)}:${timestampFormatter.format(seconds)} `
        }
    }, [timestampFormatter]);

    const totalDuration = useMemo(
        () => formatTimestamp(videoRef.current?.duration || 0),
        [videoRef.current?.duration, formatTimestamp]
    );

    const updateTimestamp = () => {
        setcurrentDuration(formatTimestamp(videoRef.current?.currentTime || 0));
        setPercentComplete(Math.round((1000 * (videoRef.current?.currentTime || 0)) / (videoRef.current?.duration || 1)) / 1000);
    }

    const handleTimeUpdate = useCallback((event) => {
        if (!timelineRef.current) return;

        const timelineBounds = timelineRef.current.getBoundingClientRect()
        const clickPosition = event.clientX
        const timeWidth = clickPosition - timelineBounds?.left
        const timelineWidth = timelineBounds?.right - timelineBounds?.left
        const durationFraction = timeWidth / timelineWidth

        if (videoRef.current) {
            videoRef.current.currentTime = durationFraction * videoRef.current?.duration
        }

    }, [timelineRef, videoRef]);

    return (
        <div className="relative w-full rounded-2xl overflow-hidden flex justify-center group bg-black">
            <div className={`absolute bottom-0 left-0 right-0 py-2 text-white bg-gradient-to-t from-black z-10 opacity-0 transition-opacity group-hover:opacity-100`}>
                <div className="cursor-pointer flex items-center mx-2 h-2 group/timeline">
                    <div className={`w-full relative bg-gray-500 opacity-50 hover:opacity-100 h-1 group-hover/timeline:h-[0.4rem] transition-[height] duration-100`} onClick={handleTimeUpdate} ref={timelineRef}>
                        <span style={{ right: `${100 - percentComplete * 100}%` }} className="absolute top-0 left-0 bottom-0 bg-[#35b7ff]"></span>
                        <div style={{ left: `${percentComplete * 100}%` }} className="scale-0 group-hover/timeline:scale-100 absolute h-[200%] aspect-square bg-[#35b7ff] rounded-full translate-x-[-50%] top-[-50%]"></div>
                    </div>
                </div>
                <div className="flex items-center text-white justify-between text-xl">
                    <div className="flex gap-6 px-10 p-3 items-center">
                        <button onClick={handleClickPlay} className="cursor-pointer">
                            {
                                isPlaying ? <FaPause /> : <FaPlay />
                            }
                        </button>
                        <div className="flex items-center gap-1 group/volume">
                            <button className="px-2 cursor-pointer" onClick={handleMuted}>
                                {
                                    videoRef.current?.muted ? (<FaVolumeXmark />) : videoRef.current && videoRef.current.volume <= 0.5 ? (<FaVolumeLow />) : (<FaVolumeHigh />)
                                }
                            </button>
                            <input type="range" min={0} max={1} step={'any'} value={videoRef.current?.volume} onChange={handleVolumeChange} className="w-0 scale-0 group-hover/volume:w-20 group-hover/volume:scale-100 transition-all duration-200 origin-left accent-white" />
                        </div>
                        <div className="text-sm">{currentDuration} / {totalDuration}</div>
                    </div>
                    <div className="flex gap-2 px-10 p-3 items-center">
                        <button className="cursor-pointer" onClick={handleClickFullScreen}>
                            {
                                isFullScreen ? <FaCompress /> : <FaExpand />
                            }
                        </button>
                    </div>
                </div>
            </div>
            <video src={videoSrc}
                className="w-[100vw] aspect-video z-[5]"
                ref={videoRef}
                onClick={handleClickPlay}
                onTimeUpdate={updateTimestamp}
                onEnded={() => setIsPlaying(false)}
                autoPlay
                preload = "true"
            ></video>
        </div>
    )
}

export default VideoPlayer
