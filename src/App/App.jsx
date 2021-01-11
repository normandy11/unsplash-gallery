import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import './App.scss';
import Image from '../components/Image';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const App = () => {
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState('');

	const [photoIndex, setPhotoIndex] = useState(0);
	const [imageModal, setImageModal] = useState(false);

	useEffect(() => {
		getPhotos();

		// eslint-disable-next-line
	}, [page]);

	const getPhotos = async () => {
		let apiUrl = `https://api.unsplash.com/photos?`;
		if (query) apiUrl = `https://api.unsplash.com/search/photos?query=${query}`;
		apiUrl += `&page=${page}`;
		apiUrl += `&client_id=${accessKey}`;

		const { data } = await axios.get(apiUrl);
		const imagesFromApi = data.results ?? data;

		// if page is 1, then we need a whole new array of images
		if (page === 1) {
			setImages(imagesFromApi);
			return;
		}

		// if page > 1, then we are adding for our infinite scroll
		setImages(images => [...images, ...imagesFromApi]);
	};

	const searchPhotos = e => {
		e.preventDefault();

		setPage(1);
		getPhotos();
	};

	if (!accessKey) {
		return (
			<a href='https://unsplash.com/developers' className='error'>
				Required: Get Your Unsplash API Key First
			</a>
		);
	}

	return (
		<div className='app'>
			<h1 className='title'>Unsplash Image Gallery</h1>

			<form onSubmit={searchPhotos} className='form'>
				<input
					type='text'
					placeholder='Search Unsplash...'
					value={query}
					onChange={e => setQuery(e.target.value)}
				/>

				<button>Search</button>
			</form>

			<InfiniteScroll
				dataLength={images.length}
				next={() => setPage(page => page + 1)}
				hasMore={true}
				loader={<h4>Loading...</h4>}
			>
				<div className='image-grid'>
					{images.map((image, index) => (
						<Image
							src={image.urls.regular}
							alt={image.alt_description}
							key={index}
							onClick={() => {
								setPhotoIndex(index);
								setImageModal(true);
							}}
						/>
					))}
				</div>
			</InfiniteScroll>

			{imageModal && (
				<Lightbox
					mainSrc={images[photoIndex].urls.regular}
					nextSrc={images[(photoIndex + 1) % images.length].urls.regular}
					prevSrc={images[(photoIndex + images.length - 1) % images.length].urls.regular}
					onCloseRequest={() => setImageModal(false)}
					onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
					onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
				/>
			)}
		</div>
	);
};

export default App;
