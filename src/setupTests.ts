import '@testing-library/jest-dom';

// Polyfill ResizeObserver for react-window v2 (not available in jsdom)
class ResizeObserverStub {
  observe() { /* noop */ }
  unobserve() { /* noop */ }
  disconnect() { /* noop */ }
}

globalThis.ResizeObserver ??= ResizeObserverStub;
