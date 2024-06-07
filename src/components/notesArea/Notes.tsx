import React, { CSSProperties } from 'react';
import Image from 'next/image';

const tableStyles: { [key: string]: CSSProperties } = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      padding: '0.5em',
      border: '1px solid #ddd',
      fontWeight: 'bold',
      backgroundColor: '#f5f5f5',
    },
    td: {
      padding: '0.5em',
      border: '1px solid #ddd',
    },
};

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

export const VF = () => (
    <div style={styles}>
    <h2>Vetricular Filling</h2>
    <div style={imageBoxStyles}>
    <Image src="/images/VF.png" width={100} height={100} alt="Descriptive Alt Text" style={imageStyles} />
    </div>
    <div id="notesArea">
    <p>During ventricular filling, the atrioventricular (AV) valves open, allowing blood to flow from the atria into the ventricles. This phase occurs during diastole, when the heart muscles are relaxed.</p>
    <table style={tableStyles.table}>
  <tr>
    <th style={tableStyles.th}> Phase </th>
    <th style={tableStyles.th}>Isovolumetric Contraction</th>
  </tr>
  <tr>
    <td style={tableStyles.td}>Atrial state</td>
    <td style={tableStyles.td}>relaxed</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>Ventricular state</td>
    <td style={tableStyles.td}>isovolumetric contraction</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of atrioventricular valves</td>
    <td style={tableStyles.td}>closed (*1st heart sound)</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of aortic and pulmonary valves</td>
    <td style={tableStyles.td}>closed</td>
  </tr>
</table>


    </div>
</div>
);

export const IC = () => (
    <div style={styles}>
    <h2>Vetricular Filling</h2>
    <div style={imageBoxStyles}>
    <Image src="/images/IC.png" width={100} height={100} alt="Descriptive Alt Text" style={imageStyles} />
    </div>
    <div id="notesArea">
    <p>In the isovolumetric contraction phase, the ventricles contract with all valves closed, causing a rapid increase in ventricular pressure. This phase prepares the ventricles for the ejection of blood but no blood is ejected yet.</p>
    <table style={tableStyles.table}>
  <tr>
    <th style={tableStyles.th}> Phase </th>
    <th style={tableStyles.th}>Isovolumetric Contraction</th>
  </tr>
  <tr>
    <td style={tableStyles.td}>Atrial state</td>
    <td style={tableStyles.td}>relaxed</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>Ventricular state</td>
    <td style={tableStyles.td}>isovolumetric contraction</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of atrioventricular valves</td>
    <td style={tableStyles.td}>closed (*1st heart sound)</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of aortic and pulmonary valves</td>
    <td style={tableStyles.td}>closed</td>
  </tr>
</table>
    </div>
</div>
);

export const VE = () => (
    <div style={styles}>
    <h2>Vetricular Filling</h2>
    <div style={imageBoxStyles}>
    <Image src="/images/VE.png" width={100} height={100} alt="Descriptive Alt Text" style={imageStyles} />
    </div>
    <div id="notesArea">
    <p>During ventricular ejection, the semilunar valves open due to high pressure in the ventricles, allowing blood to be pumped out into the aorta and pulmonary artery. This phase occurs during systole, when the ventricles are actively contracting</p>
    <table style={tableStyles.table}>
  <tr>
    <th style={tableStyles.th}> Phase </th>
    <th style={tableStyles.th}>Isovolumetric Contraction</th>
  </tr>
  <tr>
    <td style={tableStyles.td}>Atrial state</td>
    <td style={tableStyles.td}>relaxed</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>Ventricular state</td>
    <td style={tableStyles.td}>isovolumetric contraction</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of atrioventricular valves</td>
    <td style={tableStyles.td}>closed (*1st heart sound)</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of aortic and pulmonary valves</td>
    <td style={tableStyles.td}>closed</td>
  </tr>
</table>
    </div>
</div>
);


export const IR = () => (
    <div style={styles}>
    <h2>Vetricular Filling</h2>
    <div style={imageBoxStyles}>
    <Image src="/images/IR.png" width={100} height={100} alt="Descriptive Alt Text" style={imageStyles} />
    </div>
    <div id="notesArea">
    <p>In the isovolumetric relaxation phase, the ventricles relax with all valves closed, leading to a rapid drop in ventricular pressure. This phase occurs just before ventricular filling begins again, completing the cycle.</p>
    <table style={tableStyles.table}>
  <tr>
    <th style={tableStyles.th}> Phase </th>
    <th style={tableStyles.th}>Isovolumetric Contraction</th>
  </tr>
  <tr>
    <td style={tableStyles.td}>Atrial state</td>
    <td style={tableStyles.td}>relaxed</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>Ventricular state</td>
    <td style={tableStyles.td}>isovolumetric contraction</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of atrioventricular valves</td>
    <td style={tableStyles.td}>closed (*1st heart sound)</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of aortic and pulmonary valves</td>
    <td style={tableStyles.td}>closed</td>
  </tr>
</table>
    </div>
</div>
);

export const Default = () => (
    <div style={styles}>
    <h2>Lets learn about heart cycle! Hover over the images to start.</h2>
    <div style={imageBoxStyles}>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Latidos.gif/640px-Latidos.gif" alt="Introduction" height={300} width={300} style={imageStyles}/>
    </div>
    <div id="notesArea">
    <p></p>
    </div>
</div>
);


