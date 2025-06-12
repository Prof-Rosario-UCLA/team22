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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: hobby.id || "",
  });

  if (!hobby.id) return null;

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
          onClick={() => hobby.id && onDelete(hobby.id)}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
          aria-label={`Delete ${hobby.name}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </HobbyCard>
    </div>
  );
}
