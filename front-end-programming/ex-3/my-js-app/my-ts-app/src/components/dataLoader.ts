export const fetchData = async (filePath: string): Promise<string> => {
    const response = await fetch(filePath);
    return response.text();
  };
  