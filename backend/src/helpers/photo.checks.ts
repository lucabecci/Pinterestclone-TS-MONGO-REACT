export const createCheckCamps = (
  title: string,
  description: string,
  imagePath: string
): boolean => {
  if (title == null || description == null || imagePath == null) {
    return true;
  }
  return false;
};

export const IDCheck = (id: string): boolean => {
  if (id.length <= 20) {
    return true;
  }
  return false;
};

export const bodyCheck = (title: string, description: string): boolean => {
  if (title == null || description == null) {
    return true;
  }
  return false;
};
