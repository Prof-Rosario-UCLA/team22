let module: any;
let modulePromise: Promise<any> | null = null;

export const loadWasmModule = (): Promise<any> => {
  if (module) {
    return Promise.resolve(module);
  }

  if (modulePromise) {
    return modulePromise;
  }

  modulePromise = new Promise((resolve, reject) => {
    // Check if the Emscripten script has ALREADY loaded and initialized.
    // A fully loaded module will exist but will no longer have the onRuntimeInitialized property.
    if (
      (window as any).Module &&
      typeof ((window as any).Module as any).onRuntimeInitialized ===
        "undefined"
    ) {
      // It's already loaded. Use it directly.
      console.log("WASM module was already initialized.");
      module = (window as any).Module;
      resolve(module);
      return;
    }

    console.log("Setting up WASM module listener...");
    (window as any).Module = {
      onRuntimeInitialized: () => {
        console.log("WASM runtime has initialized.");
        module = (window as any).Module;
        resolve(module);
      },
      onAbort: (reason: any) => {
        console.error("WASM module loading aborted.", reason);
        reject(new Error(`WASM module aborted: ${reason}`));
      },
    };
  });

  return modulePromise;
};
