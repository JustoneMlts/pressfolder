import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Mist from './Assets/MistCover.png';
import Ju from './Assets/Ju.jpg';
import Du from './Assets/Du.jpg';
import Vicasye from './Assets/Vicasye.jpg';
import MistLive from './Assets/Mist live.jpg';
import MistLostMedia from './Assets/MistLostMedia.jpg';
import MistBg from './Assets/Mistbg.png';
import Dolls from './Musics/Dolls.wav';
import BC from './Musics/Brambling Crown.wav';
import TSOABM from './Musics/The Story of a Blind Man.wav';
import Radiostar from './Musics/Radiostar.wav';
import Dementia from './Musics/Dementia.wav';
import { Lightbox } from 'react-modal-image';
import MistLogo from './Assets/MistLogoBlanc.png';
import MistCoverTxt from './Assets/MistCoverTxt.png';
import Audio from './Components/Audio';
import { dollsLyrics, bcLyrics, tsoabmLyrics, radiostarLyrics, dementiaLyrics } from './lyrics.jsx';
import { FaSpotify, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import InstaIcon from "./Assets/InstagramIcon.png";
import MistNavImg from './Assets/MistNavImg.jpeg'
import Caroussel from './Components/Caroussel.jsx';
import SpotifyLogo from './Assets/spotifyLogo.png'
import TiktokLogo from './Assets/TiktokLogo.png'
import YoutubeLogo from './Assets/YoutubeLogo.png'
import Background from './Assets/Background.svg'
import Background2 from './Assets/Background2.svg'
import Background3 from './Assets/Background3.svg'
import Background4 from './Assets/Background4.svg'
import Background5 from './Assets/Background5.svg'
import Background6 from './Assets/Background6.svg'
import Background7 from './Assets/Background7.svg'
import Background8 from './Assets/Background8.svg'
import InstagramFeed from './Components/InstagramFeed';




import "./App.css";

export default function Component() {
  const [isVisibleAbout, setIsVisibleAbout] = useState(false);
  const [isVisibleHeaderPicture, setIsVisibleHeaderPicture] = useState(false);
  const [isVisibleBandMembers, setIsVisibleBandMembers] = useState(false);
  const [isVisibleMusic, setIsVisibleMusic] = useState(false);
  const [isVisibleSocial, setIsVisibleSocial] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerPictureSection = document.getElementById('headerPicture');
      const aboutSection = document.getElementById('about');
      const bandMembersSection = document.getElementById('band-members');
      const musicSection = document.getElementById('music');
      const socialSection = document.getElementById('social');

      if (headerPictureSection && !isVisibleHeaderPicture && isElementInViewport(headerPictureSection)) {
        setIsVisibleHeaderPicture(true);
      }
      if (aboutSection && !isVisibleAbout && isElementInViewport(aboutSection) || isElementInViewport(bandMembersSection)) {
        setIsVisibleAbout(true);
        setIsVisibleBandMembers(true);
      }
      if (bandMembersSection && !isVisibleMusic && isElementInViewport(bandMembersSection) || isElementInViewport(musicSection)) {
        setIsVisibleMusic(true);
      }
      if (socialSection && !isVisibleSocial && isElementInViewport(socialSection)) {
        setIsVisibleSocial(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisibleAbout, isVisibleBandMembers, isVisibleMusic, isVisibleSocial, isVisibleHeaderPicture]);

  useEffect(() => {
    setIsVisibleHeaderPicture(true);
  }, [])

  const isElementInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const handleClick = (event, data) => {
    if (event.ctrlKey || event.metaKey) {
      window.open(data.url, '_blank');
    } else {
      window.location.href = data.url;
    }
  };

  const socials = [
    { name: "Spotify", icon: SpotifyLogo, social: "Mist", url: "https://open.spotify.com/intl-fr/artist/4wgxXwvTwJc9VigR00lpDY?si=udw52O66SFGUAADmxaGImQ" },
    { name: "Instagram", icon: InstaIcon, social: "@this.is.mist", url: "https://www.instagram.com/this.is.mist/" },
    { name: "Youtube", icon: YoutubeLogo, social: "@Mist-iw8mn", url: "https://www.youtube.com/@Mist-iw8mn" },
    { name: "Tiktok", icon: TiktokLogo, social: "@This.is.mist", url: "https://www.tiktok.com/@thisismist" },
  ];

  const displaySocials = (social) => (
    <div className={`z-0 shadow-lg rounded-lg h-full flex items-center bg-[#2a2a2a] transition duration-300 ease-in-out hover:scale-105 p-2 hover:cursor-pointer`}
      onClick={(e) => { handleClick(e, social) }}
    >
      <div className="flex items-center">
        <div className="p-3 rounded-md">
          <img
            src={social.icon}
            width={30}
            height={30}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{social.name}</h3>
          <a href="#" className="text-[#b3b3b3] hover:underline" prefetch={false}>
            {social.social}
          </a>
        </div>
      </div>
    </div>
  );

  const musicArray = [
    { id: 0, cover: MistLostMedia, src: Dolls, title: "Dolls", album: "Lost Media", duration: "3:13" },
    { id: 1, cover: MistLostMedia, src: BC, title: "Brambling Crown", album: "Lost Media", duration: "5:36" },
    { id: 2, cover: MistLostMedia, src: TSOABM, title: "The Story of a Blind Man", album: "Lost Media", duration: "3:57" },
    { id: 3, cover: MistLostMedia, src: Radiostar, title: "Radiostar", album: "Lost Media", duration: "5:24" },
    { id: 4, cover: MistLostMedia, src: Dementia, title: "Dementia", album: "Lost Media", duration: "5:33" },
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const handleTrackChange = (newTrackIndex) => {
    setCurrentTrackIndex(newTrackIndex);
  };

  const renderLyricsLines = (lyrics) => {
    const lines = lyrics.split('\n');
    return lines.map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  const renderLyrics = (currentTrackIndex) => {
    switch (currentTrackIndex) {
      case 0:
        return dollsLyrics;
      case 1:
        return bcLyrics;
      case 2:
        return tsoabmLyrics;
      case 3:
        return radiostarLyrics;
      case 4:
        return dementiaLyrics;
      default:
        return "";
    }
  };

  const artistsArray = [
    { avatar: Ju, name: "Justin Maltese", function: "Guitare / Chant", social: "@Ju.mlts", url: "https://www.instagram.com/ju.mlts/" },
    { avatar: Du, name: "Matthieu Duroyon", function: "Basse / Chant", social: "@Ma.dryn", url: "https://www.instagram.com/ma.dryn_/" },
    { avatar: Vicasye, name: "Vicasye", function: "Batterie", social: "@Vicasye", url: "https://www.instagram.com/vicasye/" },
  ];

  const images = [
    {
      original: {MistLive},
      thumbnail: {MistLive}
    },
    {
      original: {MistLive},
      thumbnail: {MistLive}
    },
  ];

  const displayArtists = (artist, index) => (
    <div key={index} className={`flex flex-col w-full items-center avatar hover:cursor-pointer z-0`}
      onClick={(e) => { handleClick(e, artist) }}
    >
      <div className='w-full flex items-center justify-center  '>
        <div className='avatar-container'>
        <Avatar src={artist?.avatar} alt="Band Member" sx={{ width: 150, height: 150 }} />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">{artist?.name}</h3>
        <p className="text-[#b3b3b3]">{artist?.function}</p>
        <p className=''>
          <div className='w-full h-full flex justify-center items-center'>
            <img src={InstaIcon} className='mr-1 w-4' alt="Instagram Icon" />
            <p className='flex items-center'>{artist.social}</p>
          </div>
        </p>
      </div>
    </div>
  );

  return (
    <div 
      className="w-full h-full text-[#f0f0f0] min-h-[100vh] flex flex-col" 
    >
      <div className='flex h-full w-full bg-[#1a1a1a]'>
      <header className="px-4 py-6 h-34 md:px-6 md:py-8 shadow-md flex flex-col justify-center" >
        <div className="container max-w-6xl mx-auto flex items-center justify-between">
          <div className="container max-w-6xl mx-auto flex items-center justify-between">
        </div>
          <nav className="hidden md:flex items-center gap-6">
            <span href="#" className="text-sm font-medium hover:text-white transition-colors" prefetch={false}>
              About
            </span>
            <span href="#" className="text-sm font-medium hover:text-white transition-colors" prefetch={false}>
              Music
            </span>
            <span href="#" className="text-sm font-medium hover:text-white transition-colors" prefetch={false}>
              Social
            </span>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="w-5 h-5 text-white" />
          </Button>
        </div>
      </header>
      </div>
      <section id="headerPicture" className={`w-full relative shadow-md fade-in ${isVisibleHeaderPicture ? 'active' : ''}`}>
        <img
          src={MistCoverTxt}
          alt="Mist"
          width={1200}
          height={500}
          className="w-full object-cover"
        />
      </section>
      <main className="flex-1 h-full">
        <div className=" text-[#f0f0f0] h-full flex flex-col">
          <div
            // style={{ backgroundImage: `url(${Background2})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}

          >
          <section id="about" className={`h-full mb-16 z-50 mx-auto lg:px-36 px-6 fade-in ${isVisibleAbout ? 'active' : ''}`}
          >
            <div className="grid md:grid-cols-2 gap-8 justify-center items-center">
              <div>
                <h1 className="text-3xl font-bold mb-4 text-white">About Mist</h1>
                <p className="text-[#b3b3b3]">
                  Mist are a dynamic rock band that has been captivating audiences with their
                  electrifying performances and infectious energy. Formed in 2015, the band has quickly established
                  itself as a rising force in the local music scene, garnering a loyal following and critical acclaim.
                </p>
                <p className="text-[#b3b3b3] mt-4">
                  Blending classic rock influences with a modern twist, Mist' sound is a unique and
                  powerful fusion that resonates with music lovers of all ages. Their live shows are a must-see,
                  featuring high-energy guitar riffs, thunderous drums, and soulful vocals that leave audiences wanting
                  more.
                </p>
              </div>
              <div className="flex justify-center z-50">
                {/* <img
                  src={MistLive}
                  alt="Mist Live"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                /> */}
                <Caroussel />
              </div>
            </div>
          </section>
          <section id="band-members" className={`mb-16 z-0 w-full lg:px-36 px-6 fade-in ${isVisibleBandMembers ? 'active' : ''}`}
          >  
            <h2 className="text-2xl font-bold mb-4 text-white">Meet Our Band Members</h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-full items-center justify-center`}>
              {artistsArray.map((artist, index) => (
                <div  key={index} >{displayArtists(artist, index)}</div>
              ))}
            </div>
          </section>
          </div>
          <section id="music" className={`w-full justify-center shadow-md fade-in ${isVisibleMusic ? 'active' : ''}`}
            style={{ backgroundImage: `url(${Background4})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
          >
            <img
              src={MistBg}
              alt="Mist Background"
              width={1200}
              height={500}
              className="w-full object-cover"
            />
          </section>
          <div className='pt-16 bg-[#1a1a1a]'
            // style={{ backgroundImage: `url(${Background8})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}

          >
          <section className={`w-full h-full lg:flex lg:flex-row lg:justify-start lg:pr-36 md:flex-col`}>
            <section className='lg:w-1/3 w-full h-full justify-start px-6 mb-16'>
              <Audio currentTrack={musicArray[currentTrackIndex]} setCurrentTrack={handleTrackChange} />
            </section>
            <section className='bg-[#2a2a2a] lg:w-3/5 md:w-full h-full p-4 rounded-lg mb-16'>
              <div className='w-full text-2xl items-center'>
                <h1 className='text-3xl mb-10'>{musicArray[currentTrackIndex].title}</h1>
                {renderLyricsLines(renderLyrics(currentTrackIndex))}
              </div>
            </section>
          </section>
         <section>
        <section>
          <InstagramFeed />
        </section>
         </section>
          <section id="social" className={`mx-auto w-full lg:px-36 px-6 pb-12 md:pb-16 fade-in ${isVisibleSocial ? 'active' : ''}`}>
            <h2 className="text-2xl font-bold mb-4 text-white">Follow Us</h2>
            <div className="grid gap-4 h-full lg:grid-cols-4 grid-cols-2 items-center justify-center">
              {socials.map((social, index) => (
                <div key={index}>{displaySocials(social)}</div>
              ))}
            </div>
            <div class='light x1'></div>
          </section>
          </div>
        </div>
      </main>
      <footer className="bg-[#2a2a2a] py-6 md:py-8 shadow-inner">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <p className="text-sm text-[#b3b3b3]">&copy; 2024 Mist. All rights reserved.</p>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-white transition-colors" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-white transition-colors" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-white transition-colors" prefetch={false}>
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
