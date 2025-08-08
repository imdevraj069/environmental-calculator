'use client';
import useCalculatorStore from '@/store/calculatorStore';
import { PlusCircle, Trash2, GripVertical, HelpCircle, ChevronDown, ChevronsRight } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const InputField = ({ input, index }) => {
  const { updateInput, removeInput, addSelectOption, updateSelectOption, removeSelectOption } = useCalculatorStore();

  return (
    <Draggable draggableId={input.id} index={index}>
      {(provided) => (
        <div 
          ref={provided.innerRef} 
          {...provided.draggableProps}
          className="grid grid-cols-12 gap-2 items-start p-3 mb-2 bg-gray-700/50 rounded-md"
        >
          <div {...provided.dragHandleProps} className="col-span-1 flex items-center justify-center h-full text-gray-500 cursor-grab">
            <GripVertical size={20} />
          </div>
          <div className="col-span-10 flex flex-col gap-2">
            <div className="grid grid-cols-10 gap-2">
              <input
                type="text"
                placeholder="Field Label"
                value={input.label}
                onChange={(e) => updateInput(input.id, 'label', e.target.value)}
                className="col-span-4 bg-gray-900 border border-gray-600 rounded-md px-2 py-1.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <select 
                value={input.type} 
                onChange={(e) => updateInput(input.id, 'type', e.target.value)}
                className="col-span-2 bg-gray-900 border border-gray-600 rounded-md px-2 py-1.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="number">Number</option>
                <option value="select">Select</option>
              </select>
              <input
                type="text"
                placeholder="Unit"
                value={input.unit}
                onChange={(e) => updateInput(input.id, 'unit', e.target.value)}
                className="col-span-2 bg-gray-900 border border-gray-600 rounded-md px-2 py-1.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <div className="col-span-2 flex items-center gap-1 text-xs text-gray-400 pl-2">
                <code className="text-blue-300 bg-blue-900/50 px-1 rounded">{input.variableName || '...'}</code>
              </div>
            </div>
            {input.type === 'select' && (
              <div className="pl-6 mt-2 space-y-2">
                {input.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-2">
                    <ChevronsRight size={16} className="text-gray-500" />
                    <input type="text" placeholder="Option Label" value={option.label} onChange={e => updateSelectOption(input.id, optIndex, 'label', e.target.value)} className="flex-1 bg-gray-800 border border-gray-600 rounded-md px-2 py-1"/>
                    <input type="number" placeholder="Value" value={option.value} onChange={e => updateSelectOption(input.id, optIndex, 'value', e.target.value)} className="w-24 bg-gray-800 border border-gray-600 rounded-md px-2 py-1"/>
                    <button onClick={() => removeSelectOption(input.id, optIndex)} className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                  </div>
                ))}
                <button onClick={() => addSelectOption(input.id)} className="text-xs flex items-center gap-1 text-green-400 hover:text-green-300 mt-1"><PlusCircle size={14}/> Add Option</button>
              </div>
            )}
          </div>
          <button onClick={() => removeInput(input.id)} className="col-span-1 flex items-center justify-center h-full text-red-400 hover:text-red-300">
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </Draggable>
  );
};


const OutputField = ({ output, index }) => {
  const { updateOutput, removeOutput } = useCalculatorStore();
  
  return (
    <Draggable draggableId={output.id} index={index}>
      {(provided) => (
        <div 
          ref={provided.innerRef} 
          {...provided.draggableProps}
          className="grid grid-cols-12 gap-2 items-center p-3 mb-2 bg-gray-700/50 rounded-md"
        >
          <div {...provided.dragHandleProps} className="col-span-1 flex justify-center text-gray-500 cursor-grab">
             <GripVertical size={20} />
          </div>
          <div className="col-span-10 grid grid-cols-10 gap-2">
            <input
              type="text"
              placeholder="Output Label"
              value={output.label}
              onChange={(e) => updateOutput(output.id, 'label', e.target.value)}
              className="col-span-3 bg-gray-900 border border-gray-600 rounded-md px-2 py-1.5"
            />
            <input
              type="text"
              placeholder="Formula"
              value={output.formula}
              onChange={(e) => updateOutput(output.id, 'formula', e.target.value)}
              className="col-span-5 bg-gray-900 border border-gray-600 rounded-md px-2 py-1.5 font-mono text-sm"
            />
             <input
              type="text"
              placeholder="Unit"
              value={output.unit}
              onChange={(e) => updateOutput(output.id, 'unit', e.target.value)}
              className="col-span-2 bg-gray-900 border border-gray-600 rounded-md px-2 py-1.5"
            />
          </div>
          <button onClick={() => removeOutput(output.id)} className="col-span-1 flex justify-center text-red-400 hover:text-red-300">
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </Draggable>
  );
};


const CalculatorBuilder = () => {
  const store = useCalculatorStore();

  return (
    <div className="p-6 bg-gray-800/60 rounded-lg h-full overflow-y-auto">
      <h2 className="text-lg font-semibold text-green-300 mb-4">Calculator Builder</h2>
      
      {/* Input Fields Section */}
      <div className="mb-8">
        <h3 className="font-bold mb-3">1. Define Input Fields</h3>
        <Droppable droppableId="inputs">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {store.inputs.map((input, index) => (
                <InputField key={input.id} input={input} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="mt-2 flex gap-2">
            <button onClick={() => store.addInput('number')} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-300 hover:text-white hover:bg-green-600 border border-dashed border-gray-600 rounded-md transition-colors">
              <PlusCircle size={16} /> Add Number Input
            </button>
            <button onClick={() => store.addInput('select')} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-300 hover:text-white hover:bg-green-600 border border-dashed border-gray-600 rounded-md transition-colors">
              <PlusCircle size={16} /> Add Select Input
            </button>
        </div>
      </div>

      {/* Output Formulas Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">2. Define Output Formulas</h3>
            <div className="text-xs text-gray-400 flex items-center gap-1"><HelpCircle size={14}/> Available Vars: {store.inputs.map(i => i.variableName).join(', ') || 'none'}</div>
        </div>
        <Droppable droppableId="outputs">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {store.outputs.map((output, index) => (
                <OutputField key={output.id} output={output} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button onClick={store.addOutput} className="flex items-center gap-2 mt-2 px-3 py-2 text-sm font-medium text-green-300 hover:text-white hover:bg-green-600 border border-dashed border-gray-600 rounded-md transition-colors">
          <PlusCircle size={16} /> Add Output Formula
        </button>
      </div>
    </div>
  );
};

export default CalculatorBuilder;