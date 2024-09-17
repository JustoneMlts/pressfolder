import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { IoCloseOutline } from "react-icons/io5";
import { Instagram } from "lucide-react";

export default function Component({ isOpen, setIsOpen, data }) {
  const handleOpenInsta = () => {
    window.open(data.url, '_blank');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          maxWidth: '700px', // Limite la largeur pour qu'elle n'occupe pas toute la largeur de l'écran
          width: '100%', // S'assure que la modal prend tout l'espace défini par `maxWidth`
          margin: 'auto', // Pour centrer la modal horizontalement
          overflow: 'hidden', // Masquer le débordement par défaut
        },
      }}
      scroll="paper"
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Assombrit le fond
        },
      }}
    >
      <DialogContent
        className="p-0 "
        style={{
          height: '100%', // Assurer que le DialogContent prend toute la hauteur du paper
          overflowY: 'auto', // Activer le défilement vertical
        }}
      >
        <div className="w-full h-full overflow-hidden rounded-lg">
          <div className="sm:w-full w-full h-full p-0 overflow-hidden bg-gradient-to-r from-purple-800 to-purple-900">
            <div className="flex flex-col sm:flex-row h-full items-center">
              <div className="w-full sm:h-96 h-56 sm:w-3/5 sm:p-4">
                <img
                  src={data.avatarModal}
                  alt="Photo de profil"
                  className="sm:w-full w-full h-full object-cover sm:rounded-lg rounded-t-lg"
                />
              </div>
              <div className="w-full sm:w-2/3 p-8 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-white">{data.name}</h2>
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    {data.function}
                  </p>
                  <p className="text-base text-gray-400 mb-6">
                    {data.description}
                  </p>
                </div>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-lg text-white py-6"
                  >
                    <Instagram className="mr-3 h-5 w-5" color="white" />
                    <p className="text-white">Voir sur Instagram</p>
                  </Button>
                </a>
              </div>
              <div className="absolute top-8 right-8">
                <IoCloseOutline
                  size={30}
                  className="text-white hover:text-pink-500 transition-colors duration-300 hover:cursor-pointer"
                  onClick={handleClose}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
