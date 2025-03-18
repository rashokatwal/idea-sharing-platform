import axios from 'axios';
import api from '../Helpers/api';

export const useImageUpload = () => {
    const uploadImage = async (file, userId) => {
        const signatureResponse = await api.get(`/generateSignature?userId=${userId}`);
        const { signature, timestamp, public_id } = await signatureResponse.data;

        const apiKey = import.meta.env.CLOUD_API_SECRET;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("public_id", public_id);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("api_key", "953465259478889");

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dviyjm1af/image/upload`,
                formData
            );
        
            return response;
          } catch (error) {
            console.error("Upload failed", error);
          }
      }
      return {uploadImage}
}