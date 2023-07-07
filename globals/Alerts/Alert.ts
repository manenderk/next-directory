import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './Alert.scss';

const alertClass = 'toastify-alert';

export enum AlertType {
  Info = 'info',
  Error = 'error',
  Success = 'success',
}

export const ShowAlert = (alertText: string, alertType = AlertType.Info, autoClose = true, isHtml = false): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    let className = '';
    switch (alertType) {
      case 'info':
        className = alertClass + ' info';
        break;
      case 'error':
        className = alertClass + ' error';
        break;
      case 'success':
        className = alertClass + ' success';
        break;
      default:
        className = alertClass + ' info';
    }

    let params: Toastify.Options = {
      duration: autoClose ? 3000 : -1,
      close: true,
      gravity: 'top',
      position: 'center',
      className: className,
      stopOnFocus: false,
      callback: () => {
        resolve(true);
      },
    }

    if (isHtml) {
      const node: Node | null = new DOMParser().parseFromString(alertText, "text/html").body.firstElementChild;
      if (!node) {
        console.error('Invalid HTML');
        reject(false);
        return;
      }
      params.node = node;
    } else {
      params.text = alertText;
    }
    Toastify(params).showToast();
  });
};

export const ClearAllAlerts = () => {
  const alerts = document.querySelectorAll('.' + alertClass);
  alerts.forEach((alert) => {
    alert.remove();
  });
};