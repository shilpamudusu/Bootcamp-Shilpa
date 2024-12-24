import { onCLS, onFID, onLCP } from 'web-vitals';

// This function will log the performance metrics (CLS, FID, LCP)
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onLCP(onPerfEntry);
  }
};

export default reportWebVitals;
