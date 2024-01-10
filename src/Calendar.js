import { useState } from "react";
import { monthtogo, yeartogo } from "./App";
import events from "./events-arles.json"; 

let now = require ("luxon").DateTime.local();
let today = now.plus({months: now.month, years: now.year}).day;
let startevent = [];
let endevent = [];

function fillCalendar(monthtogo, yeartogo) {
	
	let firstdayofmonth = now.plus({months: monthtogo, years: yeartogo}).startOf('month').weekday;
	let dayinmonth = now.plus({months: monthtogo, years: yeartogo}).daysInMonth;
	let tmp = [];
	let count = 0;
	let lastmonthday = now.plus({months: monthtogo, years: yeartogo}).startOf('month').minus({days: 1}).day - firstdayofmonth + 2;
	for (let i = 0; i < firstdayofmonth-1; i++) {
		if (i < firstdayofmonth){
			tmp.push(<div className="divTableCell"><div className="lastmonth">{lastmonthday}</div></div>);
			lastmonthday++;
			count++;
		}
	}

	let day = [];
	for (let i = 1; i <= dayinmonth; i++) {
		if (i == today && monthtogo == 0 && yeartogo == 0){
			tmp.push(<div className="divTableCelltoday" onClick={e => {details(i, monthtogo, yeartogo)}}><div className="todayevent">{i}</div><div className="nbevent">{eventsday(i, now.plus({months: monthtogo, years: yeartogo}).month, now.plus({months: monthtogo, years: yeartogo}).year)}</div></div>);
			count++
			i++;
		}

		tmp.push(<div className="divTableCell" onClick={e => {details(i, monthtogo, yeartogo)}}>{i}<div className="nbevent">{eventsday(i, now.plus({months: monthtogo, years: yeartogo}).month, now.plus({months: monthtogo, years: yeartogo}).year)}</div></div>);
		count++;
		
		if (count == 7){
			day.push(<div className="divTableRow">{tmp}</div>);
			tmp = [];
			count = 0;
		}
	}

	let remaining = 7 - tmp.length;
	for (let i = 1; i < remaining+1; i++)
		tmp.push(<div className="divTableCell"><div className="nextmonth">{i}</div></div>);
	
	day.push(<div className="divTableRow">{tmp}</div>);
	return day;
}

function eventsday(day, month, year) {
	let count = 0;
	let starteventday
	let starteventmonth
	let starteventyear
	let endeventday
	let endeventmonth
	let endeventyear

	for (let i = 0; i < events.total; i++) {
		startevent[i] = events.events[i].firstDate;
		endevent[i] = events.events[i].lastDate;
		starteventday = startevent[i].slice(8, 10);
		starteventmonth = startevent[i].slice(5, 7);
		starteventyear = startevent[i].slice(0, 4);
		endeventday = endevent[i].slice(8, 10);
		endeventmonth = endevent[i].slice(5, 7);
		endeventyear = endevent[i].slice(0, 4);
		if (starteventday <= day && starteventmonth <= month && starteventyear <= year && endeventday >= day && endeventmonth >= month && endeventyear >= year)
			count++;
	}
	return count;
}

function details(day, month, year){
	let modal = document.createElement("div");
	if (modal){
		modal.style.display = "block";
	}	
	modal.classList.add("modal");
	document.body.appendChild(modal);

	let modalContent = document.createElement("div");
	modalContent.classList.add("modal-content");
	modal.appendChild(modalContent);

	let title = document.createElement("h2");
	let dayofweek = now.plus({months: month, years: year}).set({day: day}).weekdayLong;
	title.textContent = "Événements du " + dayofweek + " " + day + " " + now.plus({months: month, years: year}).monthLong + " " + now.plus({months: month, years: year}).year;
	modalContent.appendChild(title);

	for(let i = 0; i < events.total; i++){
		if (day >= startevent[i].slice(8, 10) && day <= endevent[i].slice(8, 10) && now.plus({months: month, years: year}).month >= startevent[i].slice(5, 7) && now.plus({months: month, years: year}).month <= endevent[i].slice(5, 7) && now.plus({months: month, years: year}).year >= startevent[i].slice(0, 4) && now.plus({months: month, years: year}).year <= endevent[i].slice(0, 4)){
			let title = document.createElement("h3");
			title.textContent = events.events[i].title.fr;
			modalContent.appendChild(title);
			
			let image = document.createElement("img");
			image.src = events.events[i].image;
			image.classList.add("imagemodal");
			modalContent.appendChild(image);

			let description = document.createElement("p");
			let withouthtml = events.events[i].longDescription.fr.replace(/[<>*\/\\]/g, '');
			description.textContent = withouthtml;
			modalContent.appendChild(description);

			let link = document.createElement("a");
			link.textContent = "Lien vers l'événement";
			link.href = events.events[i].canonicalUrl;
			link.target = "_blank";
			modalContent.appendChild(link);

			let range = document.createElement("p");
			range.textContent = "Durée de l'événement : " + events.events[i].range.fr;
			modalContent.appendChild(range);

			if(events.events[i].conditions != null){
				let conditions = document.createElement("p");
				conditions.textContent = "Conditions d'accès : " + events.events[i].conditions.fr;
				modalContent.appendChild(conditions);
			}
		}
	}

	let closeButton = document.createElement("button");
	closeButton.textContent = "X";
	closeButton.classList.add("closebuttonmodal2");
	closeButton.addEventListener("click", function(){
		modal.remove();
	}
	);
	modalContent.appendChild(closeButton);
}

function dayofweek(){
	return(
		<div className="divTableRow">
			<div className="divTableCellday">Lun.</div>
			<div className="divTableCellday">Mar.</div>
			<div className="divTableCellday">Mer.</div>
			<div className="divTableCellday">Jeu.</div>
			<div className="divTableCellday">Ven.</div>
			<div className="divTableCellday">Sam.</div>
			<div className="divTableCellday">Dim.</div>
		</div>
	)
}

export default function Calendar() {
	let [monthtogo_, setMonthtogo] = useState(0);
	return (
		<div className = "divTable" onChange={e => setMonthtogo(e.target.value)}>
			<div className = "divTableBody">
				{
					dayofweek()
				}
				{
					fillCalendar(monthtogo, yeartogo)
				}
			</div>
		</div>
	);
}

export {startevent, endevent};