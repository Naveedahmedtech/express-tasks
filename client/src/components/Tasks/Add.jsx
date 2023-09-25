import { Box, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { post } from "../../services/services";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Add = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const { res, err } = await post("/tasks/create", formData);
      if (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  return (
    <>
      <Box sx={{ m: 5 }}>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
          <Box>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Add;
