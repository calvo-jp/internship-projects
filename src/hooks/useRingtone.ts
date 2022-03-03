import { useEffect, useState } from "react";

const useRingtone = () => {
  const [ringtone, setRingtone] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.src = pikachuRingtoneUrl;
    setRingtone(audio);
    return () => setRingtone(null);
  }, []);

  return ringtone;
};

const pikachuRingtoneUrl =
  "https://res.cloudinary.com/calvojp/video/upload/v1646296933/ringtones/pikachu_dyaytg_mp3cut.net_plant0.mp3";

export default useRingtone;
