import { useDroppable } from "@dnd-kit/core";
import type { HobbySchema } from "../schemas/hobby.types";
import { DraggableCard } from "./DraggableCard";

export function DroppableColumn({
    id,
    title,
    hobbies,
    onDelete,
}: {
    id: string;
    title: string;
    hobbies: HobbySchema[];
    onDelete: (id: string) => void;
}) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="flex-1 bg-gray-100 rounded p-4 shadow">
            <h3 className="text-lg font-bold mb-4">{title}</h3>
            {hobbies.map((hobby) => (
                <DraggableCard key={hobby.id} hobby={hobby} onDelete={onDelete} />
            ))}
        </div>
    );
}
