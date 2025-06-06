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
    if (!hobby.id) return null;

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: hobby.id,
    });

    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined;

    return (
        <div ref={setNodeRef} style={style}>
            <HobbyCard
                hobby={hobby}
                dragHandle={
                    <div
                        {...listeners}
                        {...attributes}
                        className="cursor-grab bg-gray-200 px-2 py-1 text-xs rounded w-fit"
                    >
                        Drag Me
                    </div>
                }
            >
                <button
                    onClick={(e) => {
                        hobby.id && onDelete(hobby.id);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Delete
                </button>
            </HobbyCard>
        </div>
    );
}