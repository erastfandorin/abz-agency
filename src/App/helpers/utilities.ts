interface ImgResolution {
  width: number;
  height: number;
}

export const getResolutionFileImg = async (file: File): Promise<ImgResolution> => {
  return await new Promise<ImgResolution>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e: ProgressEvent<FileReader>) {
      const image = new Image();

      if (e && e.target) {
        image.src = String(e.target.result);

        image.onload = function () {
          resolve({ width: image.width, height: image.height });
        };
      }
    };
  });
};

export const verifyImageURL = async (imageUrl: string) => {
  return await new Promise((resolve) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/^(\+38)(\d{3})(\d{3})(\d{2})(\d{2})$/, "$1 ($2) $3 $4 $5");
};

export const getTextWidth = (text: string, font?: string): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context) {
    context.font = font || getComputedStyle(document.body).font;
    return context.measureText(text).width;
  }
  return 0;
};
