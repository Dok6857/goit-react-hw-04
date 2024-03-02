import { ImageCard } from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ receivedImages, onImageClick }) => {
  console.log(receivedImages);

  return (
    <ul className={css.gallery}>
      {receivedImages.map(receivedImage => (
        <li
          className={css.galleryItem}
          key={receivedImage.id}
          onClick={() => onImageClick(receivedImage.urls.full)}
        >
          <ImageCard image={receivedImage} />
        </li>
      ))}
    </ul>
  );
};
