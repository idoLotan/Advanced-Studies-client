import { useRef, useEffect } from "react";
import { baseUrl } from "../axios";

export function Video({ paragraph }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [paragraph]);

  return (
    <div className="row">
      <video
        //   controls
        autoPlay
        loop
        src={`${baseUrl}/courses/images/${paragraph}`}
        ref={videoRef}
      ></video>
    </div>
  );
}
