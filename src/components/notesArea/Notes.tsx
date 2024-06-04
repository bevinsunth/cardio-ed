import React, { CSSProperties } from 'react';

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
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Eo_circle_blue_number-1.svg" alt="Vetricular Filling" style={imageStyles}/>
    </div>
    <div id="notesArea">
    <p>During ventricular filling, the ventricles are relaxed and the atria contract, pushing blood into the ventricles. This phase is divided into two parts: the rapid filling phase and the diastasis phase. During the rapid filling phase, blood flows quickly from the atria into the ventricles. This phase is followed by the diastasis phase, during which blood flow slows down as the ventricles fill to capacity.</p>
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
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Eo_circle_blue_number-1.svg" alt="Vetricular Filling" style={imageStyles}/>
    </div>
    <div id="notesArea">
    <p>During isovolumetric contraction, the ventricles contract with the semilunar valves closed, increasing pressure without changing blood volume. This phase builds enough pressure to open the semilunar valves and push blood into the arteries.</p>
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
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Eo_circle_blue_number-1.svg" alt="Vetricular Filling" style={imageStyles}/>
    </div>
    <div id="notesArea">
    <p>During ventricular ejection, the ventricles contract and push blood into the arteries, starting with the rapid ejection phase, followed by the reduced ejection phase as the ventricles empty. Blood flow is fast in the rapid phase and slows in the reduced phase.</p>
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
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Eo_circle_blue_number-1.svg" alt="Vetricular Filling" style={imageStyles}/>
    </div>
    <div id="notesArea">
    <p>During isovolumetric relaxation, the ventricles relax while the semilunar valves remain closed, keeping the blood volume constant. This phase decreases pressure in the ventricles, preparing them to open the atrioventricular valves for the next filling cycle.</p>
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
    <h2>Vetricular Filling</h2>
    <div style={imageBoxStyles}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Eo_circle_blue_number-1.svg" alt="Vetricular Filling" style={imageStyles}/>
    </div>
    <div id="notesArea">
    <p>During isovolumetric contraction, the ventricles contract while the semilunar valves remain closed, causing the pressure within the ventricles to increase without a change in blood volume. This phase is essential for building up enough pressure to open the semilunar valves and push blood into the arteries.</p>
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


