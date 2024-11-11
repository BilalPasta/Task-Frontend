"use client";
import React, { useState } from "react";
import { uploadMedia } from "../../services/api"; // Import the API call for media upload
import styles from "./HomePage.module.css"; // Custom styles for HomePage

const HomePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [sharableId, setSharableId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isShareEnabled, setIsShareEnabled] = useState(false); // State to manage the share button state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const mediaData = await uploadMedia(file, description);
      setFileUrl(mediaData.url); // Assuming the response contains the URL
      setSharableId(mediaData.sharableId); // Assuming the response contains the sharableId
      setIsShareEnabled(true); // Enable the share button
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (sharableId) {
      const sharableLink = `${window.location.origin}/image/${sharableId}`;
      navigator.clipboard.writeText(sharableLink);
      alert("URL copied to clipboard!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Your File or Image</h1>

      <div className={styles.uploadSection}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*, .pdf, .doc, .txt, .mp4"
          className={styles.uploadInput}
        />
        <textarea
          placeholder="Enter a description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={styles.descriptionInput}
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className={styles.uploadButton}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {fileUrl && (
        <div className={styles.fileSection}>
          <h3>File uploaded successfully!</h3>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fileLink}
          >
            View File
          </a>
          <button
            onClick={handleShare}
            className={styles.shareButton}
            disabled={!isShareEnabled} // Button is disabled until upload is successful
          >
            Share URL
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
