const cloudinary = require("cloudinary").v2;
const { CLOUDNAME, CLOUDAPIKEY, CLOUDAPISECRET } = require("./config");

const fs = require("fs");
cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: CLOUDAPIKEY,
  api_secret: CLOUDAPISECRET,
});

const fileUpload = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response= await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const fileDestroy = async (localFilePath) => {
  return await cloudinary.uploader.destroy(localFilePath);
};

const profilePicDeleteOnCloudinary = (imagepath)=>{
  const public_id = imagepath.split('/').pop().split('.')[0];
  return fileDestroy(public_id)
}

module.exports = { fileUpload, fileDestroy,profilePicDeleteOnCloudinary};