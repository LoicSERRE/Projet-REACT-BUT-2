import { gettodaydate } from "./Date";

export default function Header() {
    return (
        <header className="header">
            <h1>IUT Agenda</h1>
            <img src="/logoagenda.png" alt="Logo Agenda" />
            <p className="dateheader">
                {
					gettodaydate()
				}
            </p>
        </header>
    );
}
