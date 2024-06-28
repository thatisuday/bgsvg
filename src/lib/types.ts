export type OutputTypeSvg = {
    type: "svg";
};

export type OutputTypePng = {
    type: "png";
};

export type OutputTypeWebp = {
    type: "webp";
};

export type OutputTypeJpeg = {
    type: "jpeg";
    quality?: number;
};

export type OutputType = OutputTypeSvg | OutputTypePng | OutputTypeWebp | OutputTypeJpeg;
