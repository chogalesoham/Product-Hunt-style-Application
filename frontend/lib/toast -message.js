import { toast } from 'react-toastify';

export const handleSuccessToast = (msg) => {
  toast.success(msg);
};
export const handleErrorToast = (msg) => {
  toast.error(msg);
};
