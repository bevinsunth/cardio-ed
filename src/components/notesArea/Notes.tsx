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
    width: "95%",
    height: "95%",
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
    <h2>Ventricular Filling</h2>
    <div style={imageBoxStyles}>
    <Image src="/images/VF.png" width={100} height={100} alt="Descriptive Alt Text" style={imageStyles} />
    </div>
    <div id="notesArea">
    <p>During ventricular filling, the atrioventricular (AV) valves are open, allowing blood to flow from the atria into the ventricles down a pressure gradient from high pressure to lower pressure. This phase occurs during ventricular diastole, when the heart muscles are relaxed. Note that the majority of ventricular filling occurs passively ie down a pressure gradient.  Depolarization of the atria (P wave) results in atrial contraction which tops up the ventricular volume.</p>
    <table style={tableStyles.table}>
  <tr>
    <td style={tableStyles.td}>Ventricular state</td>
    <td style={tableStyles.td}>Relaxed: filling</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of atrioventricular valves</td>
    <td style={tableStyles.td}>open</td>
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
    <h2>Isovolumetric Contraction</h2>
    <div style={imageBoxStyles}>
    <Image src="/images/IC.png" width={100} height={100} alt="Descriptive Alt Text" style={imageStyles} />
    </div>
    <div id="notesArea">
    <p>In the isovolumetric contraction phase, both the AV valves and the semilunar valves are closed so the ventricular contracts on a fixed volume of blood.  This results in a rapid increase in ventricular pressure which is required in order to open the semilunar valve.  In this first phase of systole no blood is entering or leaving the ventricle.</p>
    <table style={tableStyles.table}>
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
    <h2>Ventricular Ejection</h2>
    <div style={imageBoxStyles}>
    <Image src="/images/VE.png" width={100} height={100} alt="Descriptive Alt Text" style={imageStyles} />
    </div>
    <div id="notesArea">
    <p>During ventricular ejection, the semilunar valves open due to pressure in the ventricles becoming greater than the pressure in the aorta as the result of the isovolumetric contraction.  Blood exists the ventricles to the aorta (left side) and pulmonary artery (right side).  This phase occurs during systole, when the ventricles are actively contracting and the pressure in the ventricle exceeds that of the pressure in the aorta (left side).  Ventricular contraction is triggered by the QRS wave in the ECG - Ventricular depolarization triggers ventricular contraction.</p>
    <table style={tableStyles.table}>
  <tr>
    <td style={tableStyles.td}>Ventricular state</td>
    <td style={tableStyles.td}>contraction: ejection</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of atrioventricular valves</td>
    <td style={tableStyles.td}>closed</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of aortic and pulmonary valves</td>
    <td style={tableStyles.td}>open</td>
  </tr>
</table>
    </div>
</div>
);


export const IR = () => (
    <div style={styles}>
    <h2>Isovolumetric Relaxation</h2>
    <div style={imageBoxStyles}>
    <Image src="/images/IR.png" width={100} height={100} alt="Descriptive Alt Text" style={imageStyles} />
    </div>
    <div id="notesArea">
    <p>In the isovolumetric relaxation phase, the ventricles relax with both AV and Semilunar valves closed, leading to a rapid drop in ventricular pressure. Once the pressure in the ventricles falls below that in the ventricles the AV valves open and ventricular filling occurs once again.</p>
    <table style={tableStyles.table}>
  <tr>
    <td style={tableStyles.td}>Ventricular state</td>
    <td style={tableStyles.td}>isovolumetric relaxation</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of atrioventricular valves</td>
    <td style={tableStyles.td}>closed</td>
  </tr>
  <tr>
    <td style={tableStyles.td}>State of aortic and pulmonary valves</td>
    <td style={tableStyles.td}>closed *2nd sound heart</td>
  </tr>
</table>
    </div>
</div>
);

export const Default = () => (
    <div style={styles}>
    <h2>Lets learn about heart cycles! Hover over the images to start.</h2>
    <div style={imageBoxStyles}>
        <Image src="/images/beating-heart.gif" alt="Beating heart" height={300} width={300} style={imageStyles}/>
    </div>
    <div id="notesArea">
    <p></p>
    </div>
</div>
);


