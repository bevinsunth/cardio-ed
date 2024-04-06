import React from 'react';
import { CSSProperties, useEffect, useState } from 'react';
import notesDataJson from '../shared/data/information.json';
import * as interfaces from '@/components/Shared/types';

const styles: CSSProperties = {
    visibility: "visible",
    backgroundColor: "white",
    border: "solid",
    borderWidth: "1px",
    borderRadius: "5px",
    padding: "10px",
    width: "20vw",
    height: "95vh",
    overflow: "auto",
};

const imageBoxStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
    overflow: 'hidden', // Ensure the image doesn't overflow the container
};

const imageStyles: CSSProperties = {
    maxWidth: '100%',
    maxHeight: '100%',
};

const notesData: interfaces.Note[] = notesDataJson;

const NoteAreaComponent: React.FC<{ activeLineCode: string | null }> = ({ activeLineCode }) => {

    const [activeNote, setActiveNote] = useState<interfaces.Note | null>(null);

    const defaultNotes = notesData.find(note => note.code === "Default")

    if (defaultNotes == null) { 
    return null;
    }
    useEffect(() => {
        if (activeLineCode != null) {
            let currentNote = notesData.find(note => note.code === activeLineCode);
            setActiveNote(currentNote ?? defaultNotes);
        }
        else
        {
            setActiveNote(defaultNotes);
        }
    }, [activeLineCode]);

    return (
        <div style={styles}>
        <h2>{activeNote?.title}</h2>
        <div style={imageBoxStyles}>
            <img src={activeNote?.imageUrl} alt={activeNote?.title} style={imageStyles}/>
        </div>
        <div id="notesArea">
        <p dangerouslySetInnerHTML={{ __html: activeNote?.notesHtml || "" }}></p>
        </div>
    </div>
    );
}

export default NoteAreaComponent;