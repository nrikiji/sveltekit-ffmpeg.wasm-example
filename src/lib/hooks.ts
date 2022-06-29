import { videoTo1FpsImages, videoTo10FpsImages, load, unlink } from './ffmpeg';
import { writable } from 'svelte/store';

const { subscribe: subImages, update: updImages } = writable<string[]>([]);

export const useHome = () => {
  const { subscribe: subLoading, update: updLoading } = writable(false);
  const loadVideo = async (file: File) => {
    updLoading(() => true);
    load(file);
    const images = await videoTo1FpsImages();
    updImages((_) => images);
    updLoading((_) => false);
  };
  const clearVideo = () => {
    unlink();
    updImages((_) => []);
  };
  return { images: { subscribe: subImages }, loading: { subscribe: subLoading }, loadVideo, clearVideo };
};

export const useDetail = () => {
  const { subscribe: subImages, update: updImages } = writable<string[]>([]);
  const { subscribe: subLoading, update: updLoading } = writable(false);
  const create = async (second: number) => {
    updLoading(() => true);
    const images = await videoTo10FpsImages(second);
    updImages((_) => images);
    updLoading((_) => false);
  };
  return { images: { subscribe: subImages }, loading: { subscribe: subLoading }, create };
};