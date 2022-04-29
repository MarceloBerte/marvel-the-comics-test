import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { ROUTES } from '../../config/constants/routes';
import MainNav from '../nav/main-nav/main-nav';
import Search from '../search/search';
import Logo from './logo';

import styles from './header.module.scss';

const Header = () => {
	const router = useRouter();

	const [scrollY, setScrollY] = useState(0);
	const [scrollValue, setScrollValue] = useState(0);

	useEffect(() => {
		const scrollHandler = () => {
			setScrollY(window.scrollY);
		};
		scrollHandler();
		setScrollValue(window.innerWidth > 425 ? 50 : 10);

		window.addEventListener('scroll', scrollHandler);

		return () => {
			window.removeEventListener('scroll', scrollHandler);
		};
	}, []);

	const isStartPage = router.pathname === ROUTES.COMICS;
	const fillHeader = scrollY > scrollValue;
	const fillHeaderClass = fillHeader ? styles['strongest-shadow'] : undefined;

	return (
		<header className={`${styles.header} ${fillHeaderClass}`}>
			{isStartPage && <Logo />}
			{!isStartPage && (
				<Link href={ROUTES.COMICS}>
					<a>
						<Logo />
					</a>
				</Link>
			)}
			<MainNav />
			<Search />
		</header>
	);
};

export default Header;
