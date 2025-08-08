'use client';
import useCalculatorStore from '@/store/calculatorStore';

const DataInputForm = () => {
  const { inputs, data, setDataValue } = useCalculatorStore();

  if (inputs.length === 0) {
    return (
      <div className="p-6 bg-gray-800/60 rounded-lg flex items-center justify-center h-full">
        <p className="text-gray-400">Add input fields in the builder to see the form.</p>
      </div>
    )
  }

  const renderInput = (input) => {
    switch (input.type) {
      case 'select':
        return (
          <select
            id={input.id}
            value={data[input.variableName] || ''}
            onChange={(e) => setDataValue(input.variableName, e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" disabled>Select {input.label}...</option>
            {input.options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        );
      case 'number':
      default:
        return (
          <input
            type="number"
            id={input.id}
            value={data[input.variableName] || ''}
            onChange={(e) => setDataValue(input.variableName, e.target.value)}
            placeholder={`Enter value...`}
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        );
    }
  }

  return (
    <div className="p-6 bg-gray-800/60 rounded-lg">
      <h2 className="text-lg font-semibold text-blue-300 mb-4">Data Input</h2>
      <div className="space-y-4">
        {inputs.map(input => (
          <div key={input.id}>
            <label htmlFor={input.id} className="block text-sm font-medium text-gray-300 mb-1">
              {input.label || 'New Input'} {input.unit && `(${input.unit})`}
            </label>
            {renderInput(input)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataInputForm;