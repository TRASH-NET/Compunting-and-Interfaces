import Game from "@/components/ux/Game";
import { cookies } from "next/headers";

const GamePage = () => {

	const cookieStore = cookies();
	const authCookie = cookieStore.get('authentication');
	const sesion = authCookie ? authCookie.value : null;

	return (
		<div className="flex flex-col justify-center items-start">
			<Game
				sesion={sesion}
			/>
		</div>
	)
}

export default GamePage;