import { ImageCard } from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css'

export const ImageGallery = ({ receivedImages }) => {
    console.log(receivedImages);

  return (
    <ul className={css.gallery}>
      {receivedImages.map(receivedImage => (
        <li className={css.galleryItem} key={receivedImage.id}>
          <ImageCard image={receivedImage} />
        </li>
      ))}
    </ul>
  );
};
