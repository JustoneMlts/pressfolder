import { useState } from "react"
import Button from '@mui/material/Button';
import MistLive from '../Assets/Mist live.jpg'
import MattJu from '../Assets/MattJu.jpg'
import MistLive2 from '../Assets/MistLive2.jpg'
import Du2 from '../Assets/Matt2.jpg'
import Bercy from '../Assets/Bercy.jpg'
import { useSwipeable } from 'react-swipeable';

export default function Caroussel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const images = [
        MistLive,
        MattJu,
        MistLive2,
        Du2,
        Bercy,
    ]
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    }
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }
    const handleImageClick = () => {
        setIsFullscreen(true)
    }
    const handleCloseFullscreen = () => {
        setIsFullscreen(false)
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handlePrevious(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div className="z-50 relative" {...handlers}>
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="flex justify-center items-center flex-col shrink-0 w-full z-50 aspect-[3/2]"
                        >
                            <div className="transition duration-300 ease-in-out hover:scale-105 p-2 hover:cursor-pointer">
                                <img
                                    src={image}
                                    width={400}
                                    height={300}
                                    className="rounded-lg shadow-lg cursor-pointer"
                                    onClick={handleImageClick}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-[#ff7de3]" : "bg-muted hover:bg-muted-foreground"
                            }`}
                    />
                ))}
            </div>
            <div
                className={`fixed z-50 w-full h-screen inset-0 bg-black/80 flex items-center justify-center transition-opacity duration-300 ${isFullscreen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            >
                <div className={`absolute top-1/2 left-4 -translate-y-1/2 z-1 `}>
                    <Button variant="ghost" size="icon" onClick={handlePrevious}>
                        <ChevronLeftIcon className="h-6 w-6" />
                        <span className="sr-only">Previous</span>
                    </Button>
                </div>
                <div className="w-full h-screen flex justify-center items-center" onClick={handleCloseFullscreen}>
                    <img src={images[currentIndex]} alt="Fullscreen" className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-lg z-50" />
                </div>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 z-50">
                    <Button variant="ghost" size="icon" onClick={handleNext}>
                        <ChevronRightIcon className="h-6 w-6" />
                        <span className="sr-only">Next</span>
                    </Button>
                </div>
            </div>
            {!isFullscreen &&
            <div>
                <div className={`absolute top-1/2 left-4 -translate-y-1/2 z-1 `}>
                    <Button variant="ghost" size="icon" onClick={handlePrevious}>
                        <ChevronLeftIcon className="h-6 w-6" />
                        <span className="sr-only">Previous</span>
                    </Button>
                </div>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 z-50">
                    <Button variant="ghost" size="icon" onClick={handleNext}>
                        <ChevronRightIcon className="h-6 w-6" />
                        <span className="sr-only">Next</span>
                    </Button>
                </div>
            </div>
        }
        </div>
    )
}

function ChevronLeftIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    )
}


function ChevronRightIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}


function XIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
