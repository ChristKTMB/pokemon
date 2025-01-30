import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Vérifie si `localStorage` est disponible et fonctionnel.
 * 
 * @returns {boolean} `true` si disponible, `false` sinon.
 */
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  let requestToSend = req;

  if (isLocalStorageAvailable()) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = req.headers.set('Authorization', `Token ${token}`);
      requestToSend = req.clone({ headers: headers });
    }
  }

  return next(requestToSend);
};
