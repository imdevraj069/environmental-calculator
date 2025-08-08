import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { slugify } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

const useCalculatorStore = create(
  persist(
    (set, get) => ({
      inputs: [],
      outputs: [],
      data: {},
      
      // --- INPUT ACTIONS ---
      addInput: (type = 'number') => set(state => {
        const newInput = { 
          id: `input_${uuidv4()}`, 
          type, 
          label: '', 
          unit: '', 
          variableName: '',
          options: type === 'select' ? [{label: 'Option 1', value: 1}] : []
        };
        return { inputs: [...state.inputs, newInput] };
      }),

      updateInput: (id, field, value) => set(state => {
        const newInputs = state.inputs.map(input => {
          if (input.id === id) {
            const updatedInput = { ...input, [field]: value };
            if (field === 'label') {
              updatedInput.variableName = slugify(value) || `var_${input.id.slice(0, 4)}`;
            }
            return updatedInput;
          }
          return input;
        });
        return { inputs: newInputs };
      }),
      
      removeInput: (id) => set(state => ({
        inputs: state.inputs.filter(input => input.id !== id)
      })),
      
      reorderInputs: (startIndex, endIndex) => set(state => {
        const result = Array.from(state.inputs);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { inputs: result };
      }),

      // --- SELECT OPTIONS ACTIONS ---
      addSelectOption: (inputId) => set(state => {
          const newInputs = state.inputs.map(input => {
              if (input.id === inputId && input.type === 'select') {
                  const newOption = { label: `Option ${input.options.length + 1}`, value: '' };
                  return { ...input, options: [...input.options, newOption] };
              }
              return input;
          });
          return { inputs: newInputs };
      }),

      updateSelectOption: (inputId, optionIndex, field, value) => set(state => {
          const newInputs = state.inputs.map(input => {
              if (input.id === inputId) {
                  const newOptions = [...input.options];
                  newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: value };
                  return { ...input, options: newOptions };
              }
              return input;
          });
          return { inputs: newInputs };
      }),

      removeSelectOption: (inputId, optionIndex) => set(state => {
          const newInputs = state.inputs.map(input => {
              if (input.id === inputId) {
                  const newOptions = input.options.filter((_, index) => index !== optionIndex);
                  return { ...input, options: newOptions };
              }
              return input;
          });
          return { inputs: newInputs };
      }),


      // --- OUTPUT ACTIONS ---
      addOutput: () => set(state => ({
        outputs: [...state.outputs, { id: `output_${uuidv4()}`, label: '', formula: '', unit: '' }]
      })),
      
      updateOutput: (id, field, value) => set(state => ({
        outputs: state.outputs.map(output => 
          output.id === id ? { ...output, [field]: value } : output
        )
      })),
      
      removeOutput: (id) => set(state => ({
        outputs: state.outputs.filter(output => output.id !== id)
      })),

      reorderOutputs: (startIndex, endIndex) => set(state => {
        const result = Array.from(state.outputs);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { outputs: result };
      }),

      // --- DATA ACTIONS ---
      setDataValue: (variableName, value) => set(state => {
        const parsedValue = variableName.endsWith('_factor') ? value : parseFloat(value);
        return {
          data: { ...state.data, [variableName]: isNaN(parsedValue) ? value : parsedValue }
        }
      }),

      // --- PERSISTENCE ---
      clearTemplate: () => {
          set({ inputs: [], outputs: [], data: {} });
      }
    }),
    {
      name: 'impact-calculator-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useCalculatorStore;