import { CSSProperties } from 'react';

export const svgContainer: CSSProperties = {
    display: "inline-block",
    position: "relative",
    verticalAlign: "top",
    border: "hidden",
    borderWidth: "1px",
    borderRadius: "5px",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    width: "100%",
    height: "100%",
    overflow: "hidden",
};

export const svgContentResponsive: CSSProperties = {
    display: "inline-block",
    position: "relative",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    margin: "auto",
    width: "100%",
    height: "100%",
    userSelect: "none", /* Standard syntax */
    WebkitUserSelect: "none", /* Safari */
    MozUserSelect: "none", /* Firefox */
    msUserSelect: "none", /* Internet Explorer/Edge */
};
