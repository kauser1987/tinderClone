import axios from "axios";

export const useUpload = async({image,onUploadProgress})=>{
    const upload = async ()=>{
        try {
            const formData = new FormData();
            formData.append("file", image)
            formData.append("upload_preset", "tz1izhjr")
            formData.append("api_key", "225496518772249")

            const config ={
                headers:{
                    "content-Type":"multipart/form-data"
                },
                onUploadProgress:onUploadProgress,
                withCredentials:false
            }

            const res = await axios.post("https://api.cloudinary.com/v1_1/djgbgdbvg/image/upload",formData,config)
            const data = res.data;
            if(!data) throw new Error("Error uploading image")
                return {
                    public_id : data.public_id,
                    url: data.secure_url,
                }
        } catch (error) {
            return error.message;
        }
    }
    const {public_id, url} = await upload();
    return {public_id, url}
}