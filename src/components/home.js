import axios from 'axios'
import React, { Component} from 'react'
import {PieChart, Pie, Cell, ResponsiveContainer, Sector,Legend} from 'recharts';
import { Button} from 'semantic-ui-react';
import  CollegeListByState  from "./CollegeListByState";

var COLORS = [
  '#0088FE', 
  '#00C30F', 
  '#FFBB28', 
  '#FCAC42',
  '#FABCEE', 
  '#22C49F', 
  '#FFBB08',
  '#0060FF', 
  '#FF0042',
  '#3288FE', 
  '#14C49F', 
  '#F0AC28', 
  '#AAAFFF', 
  '#0000FF', 
  '#FE8042',
  '#E08899', 
  '#E0E0E0', 
  '#55C49F', 
  '#FBBE28', 
  '#FFFF42',
  '#00EE00', 
  '#FF00FF', 
];

function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

 
while (COLORS.length < 28) {

    COLORS.push(random_rgba())
    Array.from(new Set(COLORS))
}

 

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;
  
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        className="cursor-pointer"
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"  className="z-1"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" className="z-1" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dx={25} dy={25} textAnchor={textAnchor} className="z-1 text-base" fill={fill}>
        {`Colleges (${(percent * 100).toFixed(2)})%`}
      </text>
    </g>
  );
};





class Home extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      colleges: null,
      openDrawer:true,
      isActive:false,
      data:[],
      p:null,
      activeIndex:null

    };
  }

  hideCollegesList(e){
    
    this.setState({isActive:false})
    let payload =e.tooltipPayload
    this.setState({p:payload})    
  }
  displayCollegesList(e){
    
    this.setState({isActive:true})
    let payload =e.tooltipPayload
    this.setState({p:payload})    
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };
  
  componentDidMount(){

    // axios.get('http://api.example.test:3000')
    // .then(res=>{
    //   this.setState({colleges:res.data})
    //   // console.log(this.state.colleges)

    // })
    // .catch(err=>{
    //   console.log(err.response)
    // })

    axios.get('http://api.example.test:3000/collegesByStates')
    .then(res=>{
      console.log(res.data)
      this.setState({data:res.data})

    })
    .catch(err=>{
      console.log(err.response)
    })
    
  }

  render(){    
    return(
      <div className="h-full text-base block justify-center md:flex">
                
        <ResponsiveContainer height="100%" minWidth={200}>
          <PieChart> 
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={this.state.data}
              cx={'50%'}
              cy={'50%'}
              innerRadius={'50%'}
              outerRadius={'80%'}
              dataKey="value"
              onMouseEnter={this.onPieEnter.bind(this)}
              onClick={this.displayCollegesList.bind(this)}
            >
            {
              this.state.data.map((entry, index) => <Cell key={`cell-${index}`}  fill={COLORS[index % COLORS.length]} />)
            }
            </Pie>
            <Legend verticalAlign="bottom" className="flex" layout="horizontal" iconSize={12} height={-100} iconType="circle"/>                
          </PieChart>
        </ResponsiveContainer>

        {
          this.state.isActive?
          <div className="md:h-full md:flex md:flex-col justify-center">

            <div className="h-4/5 overflow-y-hidden self-center md:flex block w-full">
              <div className="bg-red-500 md:bg-transparent">
                <Button circular  color="red" onClick={this.hideCollegesList.bind(this)} icon="close"/>
              </div>
              <CollegeListByState active={this.state.isActive} payload={this.state.p} label={renderCustomizedLabel}>

              </CollegeListByState>
            </div>
          
          </div>
          :undefined
        }
        
      </div>

    )
  }
}

export default Home