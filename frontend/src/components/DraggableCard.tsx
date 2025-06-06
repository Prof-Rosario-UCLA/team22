import { useDraggable } from "@dnd-kit/core";
import HobbyCard from "./HobbyCard";
import type { HobbySchema } from "../schemas/hobby.types";

export function DraggableCard({
    hobby,
    onDelete,
}: {
    hobby: HobbySchema;
    onDelete: (id: string) => void;
}) {

    if (!hobby.id) return null; // TODO add better fall back
    
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: hobby.id 
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            }
        : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <HobbyCard hobby={hobby}>
            <button
                onClick={() => hobby.id && onDelete(hobby.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Delete
            </button>
            </HobbyCard>
        </div>
    );
}
