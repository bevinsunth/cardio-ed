type DatasetType = {
    label: string;
    data: {
      x: number;
      y: number;
    }[];
    backgroundColor: string;
    borderColor: string;
    showLine: boolean;
    fill: boolean;
    pointRadius: number;
  };
  
  type DatasetsType = {
    datasets: DatasetType[];
  };
  
  export function prepareDataset(DatasetsData: DatasetsType) {
    return {
      ...DatasetsData,
      datasets: DatasetsData.datasets.map(dataset => ({
        ...dataset,
        borderWidth: 2,
        data: dataset.data.sort((a, b) => a.x - b.x),
      })),
    };
  }