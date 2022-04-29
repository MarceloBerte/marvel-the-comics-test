import Image from 'next/image';

const SearchIcon = ({ src, alt, onClick }) => {
	return (
		<Image
			src={src}
			alt={alt}
			width={20}
			height={20}
			className='svg-filtered-to-white'
			onClick={onClick}
		/>
	);
};

export default SearchIcon;
