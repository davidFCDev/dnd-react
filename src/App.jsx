import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useState } from "react";
import User from "./components/user";

function App() {
  const [people, setPeople] = useState([
    { id: 1, name: "John" },
    { id: 2, name: "Sarah" },
    { id: 3, name: "Paul" },
    { id: 4, name: "George" },
    { id: 5, name: "Ringo" },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("active", active.id);
    console.log("over", over.id);

    if (active.id !== over.id) {
      setPeople((people) => {
        const oldIndex = people.findIndex((person) => person.id === active.id);
        const newIndex = people.findIndex((person) => person.id === over.id);

        console.log(arrayMove(people, oldIndex, newIndex));
        return arrayMove(people, oldIndex, newIndex);
      });
    }

    console.log("drag end");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-4/6">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <h1 className="text-2xl font-bold">Users List</h1>
          <SortableContext
            items={people.map((user) => user.id)}
            strategy={verticalListSortingStrategy}
          >
            {people.map((user) => (
              <User key={user.id} id={user.id} name={user.name} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App;

