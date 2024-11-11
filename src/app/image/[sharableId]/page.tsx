// src/app/image/[sharableId]/page.tsx

"use client";
import { useRouter } from "next/router"; // Import the useRouter hook
import { useEffect, useState } from "react";
import { getMediaBySharableId } from "../../../services/api";
import Image from "next/image";
import styles from "../ImageViewer.module.css";

interface Media {
  sharableId: string;
  url: string;
  description: string;
}

const ImageViewer = () => {
  const router = useRouter();
  const { sharableId } = router.query; // Get the dynamic parameter from the URL
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch media data when sharableId is available
  useEffect(() => {
    if (sharableId) {
      const fetchMedia = async () => {
        try {
          const mediaData = await getMediaBySharableId(sharableId as string); // Typecast to string
          setMedia(mediaData);
        } catch {
          alert("Failed to load media");
        } finally {
          setLoading(false);
        }
      };

      fetchMedia();
    }
  }, [sharableId]); // Trigger when sharableId changes

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading media...</p>
      ) : (
        <div className={styles.imageContainer}>
          {media && (
            <div>
              <h3>{media.description}</h3>
              <Image
                src={media.url}
                alt="Uploaded Media"
                width={800}
                height={600}
                className={styles.image}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageViewer;
