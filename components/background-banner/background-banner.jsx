import styles from './background-banner.module.scss';

const BackgroundBanner = ({ thumbnail }) => {
	return (
		<>
			{thumbnail && (
				<div
					className={styles.banner}
					style={{ backgroundImage: `url(${thumbnail}) ` }}
				></div>
			)}
		</>
	);
};

export default BackgroundBanner;
