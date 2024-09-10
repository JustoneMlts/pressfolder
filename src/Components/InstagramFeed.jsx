import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstagramFeed = () => {
  const [media, setMedia] = useState([]);
  const accessToken = '738bf14bd603f0947c291db9e5ef816f'; // Remplacez par votre token d'accès

  useEffect(() => {
    const fetchInstagramMedia = async () => {
      try {
        const response = await axios.get(
          `https://graph.instagram.com/me/media?fields=id,media_url,permalink&access_token=${accessToken}`
        );
        setMedia(response.data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des médias Instagram', error);
      }
    };

    fetchInstagramMedia();
  }, [accessToken]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {media.map((item) => (
        <a key={item.id} href={item.permalink} target="_blank" rel="noopener noreferrer">
          <img src={item.media_url} alt="Instagram media" className="w-full h-auto rounded-lg" />
        </a>
      ))}
    </div>
  );
};

export default InstagramFeed;
