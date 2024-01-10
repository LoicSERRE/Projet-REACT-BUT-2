import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import Calendar from "./Calendar";
import PlanningView from "./PlanningView";
const now = require ("luxon").DateTime.local();

let isplanningview = false;
let monthtogo = 0;
let yeartogo = 0;
let selectedmonth = now.plus({months: monthtogo, years: yeartogo});

export default function App() {
	const [selectedmonth, setSelectedmonth] = useState(now.plus({months: monthtogo, years: yeartogo}));
	let [monthtogo_, setMonthtogo] = useState(0);
	let [yeartogo_, setYeartogo] = useState(0);
	let [planningview, setPlanningview] = useState(<Calendar/>, buttonmoove);
	let [planningviewdate, setPlanningviewdate] = useState(now.plus({months: monthtogo, years: yeartogo}));
	
	function previousmonth() {
		monthtogo --;
		setSelectedmonth(selectedmonth.minus({months: 1}));
		if (isplanningview == true){
			setPlanningview(<PlanningView/>);
		}
		else{
			setPlanningview(<Calendar/>);
		}
	}
	
	function nextmonth() {
		monthtogo ++;
		setSelectedmonth(selectedmonth.plus({months: 1}));
		if (isplanningview == true){
			setPlanningview(<PlanningView/>);
		}
		else{
			setPlanningview(<Calendar/>);
		}
	}

	function previousyear() {
		yeartogo --;
		setSelectedmonth(selectedmonth.minus({years: 1}));
		if (isplanningview == true){
			setPlanningview(<PlanningView/>);
		}
		else{
			setPlanningview(<Calendar/>);
		}
	}

	function nextyear() {
		yeartogo ++;
		setSelectedmonth(selectedmonth.plus({years: 1}));
		if (isplanningview == true){
			setPlanningview(<PlanningView/>);
		}
		else{
			setPlanningview(<Calendar/>);
		}
	}

	function planningview_(){
		if (isplanningview == false){
			isplanningview = true;
			setPlanningview(<PlanningView/>);
		}

		else{
			isplanningview = false;
			setPlanningview(<Calendar/>);
		}
	}

	function buttonmoove(){
		let view;
		if (isplanningview == false){
			view = <div>
			<h2 className="monthcalendar" onChange={e => setMonthtogo(e.target.value)}>
				{
					selectedmonth.monthLong[0].toUpperCase() + selectedmonth.monthLong.slice(1)
				}
			</h2>
			<button onClick={previousmonth} className="button">
				{"<"}
			</button>	
			<button onClick={nextmonth} className="button">
				{">"}
			</button>
			<h2 className = "yearscalendar" onChange={e => setYeartogo(e.target.value)}>
				{
					selectedmonth.year
				}
			</h2>
			<button onClick={previousyear} className="buttonyears">
				{"<"}
			</button>
			<button onClick={nextyear} className="buttonyears">
				{">"}
			</button>
			<button onClick={planningview_} className="buttonplanning">
				Vue planning
			</button>
		</div>
	}
	else{
		view = 
			<button onClick={planningview_} className="button">
				Vue calendrier
			</button>
	}
	return view;
}

    return (
        <div className="App">
			<Header />
			{
				buttonmoove()
			}
			{planningview}
			<Footer/>
		</div>
    );
}

export {monthtogo, yeartogo, selectedmonth};