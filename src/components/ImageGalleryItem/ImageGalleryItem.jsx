import PropTypes from 'prop-types'
import { Image, ImageGalleryListItem } from './ImageListItem.styled';

export function ImageGalleryItem({ webformatURL, largeImageURL }) {
    return (
        <ImageGalleryListItem>
        <Image 
        small={webformatURL}
        large={largeImageURL}
        // alt={image.tags}
      />
        </ImageGalleryListItem>
    )
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired
    }