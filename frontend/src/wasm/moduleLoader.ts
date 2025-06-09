let module: any;

// Load the WebAssembly module only a single time to prevent re-initialization and improve performance.

export const loadWasmModule = async () => {
  if (!module) {
    const moduleFactory = (window as any).Module;
    module = await moduleFactory();
  }
  return module;
};
