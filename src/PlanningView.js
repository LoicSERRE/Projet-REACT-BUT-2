import events from './events-arles.json';
let now = require ("luxon").DateTime.local();
import { useState } from "react";
let selecteddate = now.toISODate();
import { startevent, endevent } from "./Calendar";

function printevent(selecteddate){
	let listevent = [];
	for (let i = 0; i < events.total; i++) {
		if (startevent[i] >= selecteddate){
			listevent.push(<li className="eventtitle">{events.events[i].title.fr}</li>);
			listevent.push(<ul className="eventdescription">{events.events[i].description.fr}</ul>);
			listevent.push(<ul className="rangelist">{events.events[i].range.fr}</ul>);
			listevent.push(<ul className="eventadress" onClick = {() => printadress(events.events[i].location.address)}>{events.events[i].location.address}</ul>);
			listevent.push(<button className="event" onClick = {() => details(events.events[i])}>Plus d'informations</button>);
			listevent.push(<br/>);
		}
	}
	return listevent;
}

function printadress(adress){
	window.open("https://www.google.com/maps/search/?api=1&query=" + adress);
}

function details(event){
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
	title.textContent = event.title.fr;
	modalContent.appendChild(title);

	let image = document.createElement("img");
	image.src = event.image;
	image.classList.add("imagemodal");
	modalContent.appendChild(image);
  
	let description = document.createElement("p");
	let withouthtml = event.longDescription.fr.replace(/[<>*\/\\]/g, '');
	description.textContent = withouthtml;
	modalContent.appendChild(description);

	let link = document.createElement("a");
	link.textContent = "Lien vers l'événement";
	link.href = event.canonicalUrl;
	link.target = "_blank";
	modalContent.appendChild(link);

	let range = document.createElement("p");
	range.textContent = "Durée de l'événement : " + event.range.fr;
	range.classList.add("range");
	modalContent.appendChild(range);

	let condition = document.createElement("p");
	condition.textContent = "Conditions d'accès : " + event.conditions.fr;
	modalContent.appendChild(condition);
  
	let closeButton = document.createElement("button");
	closeButton.textContent = "Fermer";
	closeButton.classList.add("closebuttonmodal");
	closeButton.addEventListener("click", function () {
	  modal.remove();
	});
	modalContent.appendChild(closeButton);
}

function printdate(){
	let date = selecteddate;
	date = date.split("-");
	let year = date[0];
	let month = date[1];
	let day = date[2];
	let dateobj = new Date(year, month-1, day);
	let dayname = dateobj.toLocaleString('default', { weekday: 'long' });
	dayname = dayname[0].toUpperCase() + dayname.slice(1);
	let monthname = dateobj.toLocaleString('default', { month: 'long' });

	return dayname + " " + day + " " + monthname + " " + year;
}

function changedate(){
	if (document.getElementById("date") != null){
		selecteddate = document.getElementById("date").value;
	}
}

export default function PlanningView(){
	let [date, setDate] = useState(changedate());

	return (
		<div className="planning">
			<h2 className= "selecteddate" style = {{color: "white"}} onChange={e => changedate(e.target.value)}>
				{
					printdate()
				}
			</h2>
			<input type="date" id="date" name="date" className="inputdate" value = {selecteddate} onChange={e => setDate(e.target.value)}/>
			{
				printevent(selecteddate)
			}
			
		</div >		
	)
}

