import React from "react";
// import ApexCharts from "react-apexcharts";
import Chart from "react-apexcharts";  

// const initialChartOptions = {
//     options: {
//         chart: { id: "basic-bar" },
//         xaxis: { categories: [1991, 1992] }
//       },
//       series: [
//         { name: "series-1", data: [30, 40] },
//         { name: "series-1", data: [70, 91] }
//       ]
//   }

const ApexChartComponent = ( {categories, expenseTot, incomeTot} ) => {
  // const [chartData, setChartData] = useState(initialChartOptions);

//   console.log('categories=' + JSON.stringify(categories));
  // console.log('Apex expenseTot=' + JSON.stringify(expenseTot));
  // console.log('Apex incomeTot=' + JSON.stringify(incomeTot));
  
  const barChartData = {
    options: {
      chart: { id: "basic-bar" },
      xaxis: { categories: categories.categories }
    },
    series: [
      { 'name': expenseTot.name, 'data': expenseTot.data },
      { 'name': incomeTot.name,  'data': incomeTot.data  }
    ]
  };

  // useEffect( () => {
  //   setChartData(barChartData); 
  // }, [] );


  return (
    <div>

      {/* <ApexCharts  options={options}   type="donut"  height={350}  length={200}
      /> */}

      {/* <div id="#chart"></div> */}

      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart options={barChartData.options} series={barChartData.series} type="bar" width="100%" />
          </div>
        </div>
      </div>

      {/* <div className="donut">
        <Chart options={donutChartData.options} series={donutChartData.series} type="donut" width="380" />
      </div> */}

      {/* <apexchart type="donut" width="380" options="chartOptions" series="series" /> */}


    </div>
  );
};

export default ApexChartComponent;