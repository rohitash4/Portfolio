import '@testing-library/jest-dom';

// Mock matchMedia for GSAP ScrollTrigger tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock ResizeObserver for Lenis
window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock HTMLCanvasElement getContext for OGL/WebGL
const originalGetContext = HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext = function (type, options) {
  if (type === 'webgl' || type === 'webgl2') {
    // Return a minimal mock WebGL context
    return {
      canvas: this,
      clearColor: () => {},
      enable: () => {},
      blendFunc: () => {},
      getExtension: () => null,
      createShader: () => ({}),
      shaderSource: () => {},
      compileShader: () => {},
      getShaderParameter: () => true,
      getShaderInfoLog: () => '',
      createProgram: () => ({}),
      attachShader: () => {},
      linkProgram: () => {},
      getProgramParameter: () => true,
      getProgramInfoLog: () => '',
      useProgram: () => {},
      uniform1f: () => {},
      uniform2f: () => {},
      uniform3fv: () => {},
      createBuffer: () => ({}),
      bindBuffer: () => {},
      bufferData: () => {},
      enableVertexAttribArray: () => {},
      vertexAttribPointer: () => {},
      drawArrays: () => {},
      viewport: () => {},
      clear: () => {},
      loseContext: () => {},
      getParameter: () => 0,
    };
  }
  return originalGetContext.call(this, type, options);
};
