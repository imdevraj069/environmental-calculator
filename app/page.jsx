'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import CalculatorBuilder from '@/components/CalculatorBuilder';
import DataInputForm from '@/components/DataInputForm';
import ResultsDashboard from '@/components/ResultsDashboard';
import { DragDropContext } from '@hello-pangea/dnd';
import useCalculatorStore from '@/store/calculatorStore';

export default function Home() {
  const { reorderInputs, reorderOutputs } = useCalculatorStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the component only renders on the client, where dnd is available.
    setIsClient(true);
  }, []);

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (destination.droppableId === 'inputs') {
      reorderInputs(source.index, destination.index);
    } else if (destination.droppableId === 'outputs') {
      reorderOutputs(source.index, destination.index);
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col">
            <CalculatorBuilder />
          </div>
          <div className="flex flex-col gap-4">
            <DataInputForm />
            <ResultsDashboard />
          </div>
        </div>
      </main>
    </DragDropContext>
  );
}