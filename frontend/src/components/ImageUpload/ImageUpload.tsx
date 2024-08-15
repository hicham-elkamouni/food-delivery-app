import { useState, ChangeEvent, FC } from "react";
import { AxiosRequestConfig } from "axios";
import apiFood from "@/services/apiFood";
import useAuth from "@/context/AuthContext";

interface ImageUserUploadProps {
  path: string;
  onClick?: () => void;
}

export const ImageUpload: FC<ImageUserUploadProps> = ({ path, onClick }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { user } = useAuth();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Selecione uma imagem antes de fazer o upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: user.token,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(progress);
        }
      },
    };

    try {
      await apiFood.post(path, formData, config);

      setSelectedImage(null);
      setUploadProgress(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button
        onClick={() => {
          handleUpload();
          if (onClick) onClick();
        }}
      >
        Fazer Upload
      </button>

      {uploadProgress > 0 && (
        <div>
          <p>Progresso: {uploadProgress.toFixed(2)}%</p>
          <progress value={uploadProgress} max={100} />
        </div>
      )}

      {selectedImage && (
        <div>
          <p>Imagem selecionada:</p>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Imagem selecionada"
            style={{
              width: "300px",
            }}
          />
        </div>
      )}
    </div>
  );
};
