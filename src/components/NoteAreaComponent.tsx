import React from 'react';
import { CSSProperties } from 'react';

const NoteAreaComponent: React.FC = () => {
    const styles: CSSProperties = {
        visibility: "visible",
        backgroundColor: "white",
        border: "solid",
        borderWidth: "1px",
        borderRadius: "5px",
        padding: "10px"
    };

    const htmlContent = "<p>I'm a tooltip written in HTML</p><img src='https://github.com/holtzy/D3-graph-gallery/blob/master/img/section/ArcSmal.png?raw=true'></img><br>Fancy<br><span style='font-size: 40px;'>Isn't it?</span>";

    return (
        <div id="div_customContent" style={styles} dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
    );
}

export default NoteAreaComponent;