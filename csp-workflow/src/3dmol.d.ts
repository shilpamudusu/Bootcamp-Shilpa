declare module '3Dmol' {
    export const createViewer: (
      element: HTMLElement,
      options: { width: string; height: string }
    ) => {
      removeAllModels: () => void;
      addModel: (smiles: string, format: string) => void;
      setStyle: (selector: object, style: object) => void;
      zoomTo: () => void;
      render: () => void;
    };
  }
  