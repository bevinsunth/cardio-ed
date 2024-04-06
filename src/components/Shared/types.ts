import { html } from "d3";
import { title } from "process";

export interface Coordinate {
    x: number;
    y: number;
}

export interface BaseLineData  {
    code: string;
    label: string;
    coordinates: Coordinate[];
    color: string;
};

export interface  AdditionalLineData extends BaseLineData {
    lableYOffset?: number;
    lineSize?: number;
    circleSize?: number;
}

export interface Section {
    code: string;
    name: string;
    startXCoordinates: number;
    endXCoordinates: number;
    color: string;
}

export interface WiggersGraphData {
    lines: AdditionalLineData[];
    sections: Section[];
}

export interface PressureVolumeActivePointerData {
    activeLineCode: string;
    activeLineLength: number;
    pointOnActiveLine: number;
    activePointer: Pointer;
}

export interface WiggersActivePointerData {
    activeSectionCode: string;
    activePointer: Pointer;
}

export type Pointer = [number, number];

export type LineCache = {
    code: string;
    coordinates: Coordinate[];
  };

export interface Note {
    code: string;
    title: string;
    notesHtml: string;
    imageUrl: string;
}

