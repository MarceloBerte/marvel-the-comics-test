import Link from 'next/link';
import { useRouter } from 'next/router';

import { navItems } from './nav-items';

import styles from './main-nav.module.scss';

const MainNav = () => {
	const router = useRouter();
	return (
		<nav className={styles['main-nav']}>
			<ul>
				{navItems.map((item) => {
					const addActiveCssClass = router.pathname === item.path;
					const activeCssClass = addActiveCssClass
						? styles.active
						: undefined;
					return (
						<li key={item.id} className={activeCssClass}>
							<Link href={item.path}>{item.label}</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default MainNav;
