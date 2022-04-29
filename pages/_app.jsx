import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';

import { store } from '../store/store';
import Header from '../components/header/header';

import '../styles/styles.scss';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Avidity | Test - Marvel Comics</title>
				<meta
					name='description'
					content='A test project to evaluate a javascript programmer position at Avidity Brasil'
				/>
			</Head>
			<Provider store={store}>
				<NextNProgress color='#ec1d24' height={2} />
				<Header />
				<main>
					<Component {...pageProps} />
				</main>
			</Provider>
		</>
	);
};

export default MyApp;
