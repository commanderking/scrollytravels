import { useState } from "react";

const GoogleMapEmbed = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [embedSrc, setEmbedSrc] = useState(
    `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Space+Needle,Seattle+WA`
  );

  const changeSrc = () => {
    setEmbedSrc(
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.0504038887934!2d121.52666017583887!3d25.032363477817455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9ccc83abee9%3A0x27991c7294cf0c04!2sJing%20Sheng%20Yu!5e0!3m2!1sen!2stw!4v1697368729084!5m2!1sen!2stw"
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          changeSrc();
        }}
      >
        Change Source
      </button>

      <button></button>
      <iframe
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        src={embedSrc}
      ></iframe>
      <iframe
        src="https://www.google.com/maps/d/u/0/embed?mid=1za4f_souSVFcQz7d0JQlN1DJISH01zY&ehbc=2E312F&z=14"
        width="640"
        height="480"
      ></iframe>
    </div>
  );
};

export default GoogleMapEmbed;
