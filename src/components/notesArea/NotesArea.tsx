import React from 'react';
import { CSSProperties, useEffect, useState } from 'react';
import notesDataJson from '@/components/shared/data/information.json';
import {Default, IC, IR, VE, VF} from '@/components/notesArea/Notes';
import * as interfaces from '@/components/shared/types';



const notesData: interfaces.Note[] = notesDataJson;

const NoteAreaComponent: React.FC<{ activeLineCode: string | null }> = ({ activeLineCode }) => {

if(activeLineCode == 'VF')
    return (
        <VF />
    )
if(activeLineCode == 'VE')
    return (
        <VE />
    )
if(activeLineCode == 'IR')
    return (
        <IR />
    )
if(activeLineCode == 'IC')
    return (
        <IC />
    )
else
    return (
        <Default />
    )
}
export default NoteAreaComponent;