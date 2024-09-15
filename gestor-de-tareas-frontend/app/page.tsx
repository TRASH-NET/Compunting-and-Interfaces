import TasksSection from "@/components/ux/TasksSection";
import { ITaskRecieved } from "@/interfaces";
import { getAllTasks } from "@/models/task";


export default async function Home() {

	const allTasks: ITaskRecieved[] = await getAllTasks();

	return (
		<main className="flex flex-col h-full bg-[#eff1f1] overflow-hidden">
			<nav className="w-full px-4 py-8 text-center bg-[#1b232e] text-white">
				<h1 className="text-2xl font-bold uppercase">Gestor de tareas</h1>
			</nav>
			<TasksSection allTasks={allTasks} />
		</main>
	);
}
