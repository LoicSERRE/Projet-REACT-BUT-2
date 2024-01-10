function loadevent() {
    fetch("/events-arles-small.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

export default loadevent;