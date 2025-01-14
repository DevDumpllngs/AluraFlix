import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

export const getVideos = async () => {
  const response = await api.get('/videos');
  return response.data;
};

export const createVideo = async (video) => {
  const response = await api.post('/videos', video);
  return response.data;
};

export const updateVideo = async (video) => {
  const response = await api.put(`/videos/${video.id}`, video);
  return response.data;
};

export const deleteVideo = async (id) => {
  await api.delete(`/videos/${id}`);
  return id;
};