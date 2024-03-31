import React, { useState, useEffect } from "react";
import { Basic as Photo } from "unsplash-js/dist/methods/photos/types";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  isOpen: boolean;
  onCloseButtonClick: () => void;
  photo?: Photo;
}

const PhotoDetailsDialog: React.FC<Props> = ({
  isOpen,
  onCloseButtonClick,
  photo,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [photo]);

  const onClose = () => {
    setIsLoading(false);
    onCloseButtonClick();
  };

  if (!photo) {
    return null;
  }

  const {
    user: { username: author },
    urls: { full: fullSizeUrl },
    alt_description: description,
    created_at: uploadedOn,
  } = photo;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="lg">
      <DialogContent>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
            }}
          >
            <CircularProgress size={30} color="inherit" />
          </Box>
        )}
        <img
          src={fullSizeUrl}
          style={{ width: "100%" }}
          onLoad={() => setIsLoading(false)}
          hidden={isLoading}
        />
        <DialogContentText>
          <b>Author: </b>
          {author}
        </DialogContentText>
        {description && (
          <DialogContentText>
            <b>Description: </b>
            {description}
          </DialogContentText>
        )}
        <DialogContentText>
          <b>Uploaded on: </b>
          {new Date(uploadedOn).toLocaleString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PhotoDetailsDialog;
