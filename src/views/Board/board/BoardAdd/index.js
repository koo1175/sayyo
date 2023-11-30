import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BoardAdd() {
  const [postTitle, setPostTitle] = useState('');
  const [postImagePreview, setPostImagePreview] = useState(null);
  const [imageHeight, setImageHeight] = useState(null); // Track image height
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [postImage, setPostImage] = useState(null);

  const handlePostImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let selectedFile = e.target.files[0];
      setPostImage(selectedFile);

      let reader = new FileReader();
      reader.onload = (event) => {
        setPostImagePreview(event.target.result);
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          setImageHeight(img.height);
        };
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCreatePost = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('boardTitle', postTitle);
    formData.append('postImage', postImage);

    try {
      const response = await fetch('/board/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('게시글 작성이 완료되었습니다.');
        navigate('/board');
      } else {
        setErrorMessage('게시글 작성 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setErrorMessage('게시글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div align="center" style={{ width: '100vw', marginTop: '-5%', marginLeft: '-25%' }}>
      <div style={{ paddingTop: '150px' }}>
        <Container
          style={{
            maxWidth: '700px',
            height: imageHeight ? `calc(${imageHeight}px + 500px)` : '100vh',
          }}
        >
          <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h5" gutterBottom align="center">
              글 작성
            </Typography>

            {/* ... (Profile Avatar and User Information) */}

            <TextField
              fullWidth
              label="제목"
              variant="outlined"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              style={{ marginBottom: '20px' }}
            />

            <TextField
              fullWidth
              label="내용"
              variant="outlined"
              multiline
              rows={8}
              style={{ marginBottom: '10px' }}
            />

            <Box mt={2} marginBottom="40px">
              {postImagePreview && (
                <img
                  src={postImagePreview}
                  alt="Post Preview"
                  style={{ width: '100%', maxHeight: 300, marginBottom: '10px' }}
                />
              )}
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="post-icon-button-file"
                type="file"
                onChange={handlePostImageChange}
              />
              <label htmlFor="post-icon-button-file">
                <Button variant="contained" component="span">
                  사진
                </Button>
              </label>
            </Box>

            {errorMessage && (
              <Box mt={2} marginBottom="20px">
                <Typography color="error">{errorMessage}</Typography>
              </Box>
            )}

            <Box mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleCreatePost}
                disabled={isLoading}
              >
                {isLoading ? '게시 중...' : '게시'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </div>
    </div>
  );
}