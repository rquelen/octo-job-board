import canUseDOM from 'can-use-dom';
import authApi from '@/api/auth';

export const LOCALSTORAGE_KEY = 'access_token';

function _saveAccessTokenIntoLocalStorage(accessToken) {

	return (canUseDOM) ? window.localStorage.setItem(LOCALSTORAGE_KEY, accessToken) : false;

}

function _removeAccessTokenFromLocalStorage() {

	return (canUseDOM) ? window.localStorage.removeItem(LOCALSTORAGE_KEY) : null;

}

export default {

	accessTokenKey: LOCALSTORAGE_KEY,

	authenticate(googleIdToken) {

		return new Promise((resolve, reject) => {

			authApi.verifyIdTokenAndGetAccessToken(googleIdToken).then((response) => {

				const accessToken = response.access_token;
				_saveAccessTokenIntoLocalStorage(accessToken);

				resolve();

			}).catch((err) => {

				_removeAccessTokenFromLocalStorage();
				reject(err);

			});

		});

	},

	getToken() {

		return (canUseDOM) ? window.localStorage[LOCALSTORAGE_KEY] : null;

	},

};
