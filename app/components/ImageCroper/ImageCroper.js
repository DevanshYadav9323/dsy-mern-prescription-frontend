import { Button, DialogActions, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import React, { useRef } from "react";
import Cropper,{ ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";


export default function ImageCroper({file,setFile,open,handleClose,prevImage,setImageName,type}){
   
  const cropperRef = useRef(null);
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    setFile(cropper.getCroppedCanvas().toDataURL())
    handleClose()
  };
  const handleCloseCrop = () => {
     setFile("")
     handleClose()
  }
  
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <div>
              {/* <ReactCrop crop={crop} onChange={handleImageCrop} aspect={type=="offer" ? 16 / 9 : 1 / 1}>
                  <img src={file} alt="image"/>
                 </ReactCrop> */}
              <Cropper
                src={file}
                // Cropper.js options
                aspectRatio= {type=="banner" ? 16 / 9 : 1 / 1}
                guides={false}
                // crop={onCrop}
                ref={cropperRef}
                autoCropArea={1}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCrop}>Cancel</Button>
            <Button onClick={onCrop}>Crop</Button>
          </DialogActions>
        </Dialog>
      </div>
    );    
}