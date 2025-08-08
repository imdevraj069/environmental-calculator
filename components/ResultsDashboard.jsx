'use client';
import useCalculatorStore from '@/store/calculatorStore';
import { evaluate } from 'mathjs';
import { AlertTriangle, TrendingUp } from 'lucide-react';

const ResultsDashboard = () => {
  const { outputs, data, inputs } = useCalculatorStore();

  const calculateResults = () => {
    // Create a scope for the formula evaluation
    const scope = { ...data };
    inputs.forEach(input => {
        if (input.type === 'select' && data[input.variableName]) {
            // For select, the value might be a string from the option.
            // We parse it to a number for calculation.
            scope[input.variableName] = parseFloat(data[input.variableName]);
        }
    });

    return outputs.map(output => {
      if (!output.formula) {
        return { ...output, result: '0.00', error: null };
      }
      try {
        const result = evaluate(output.formula, scope);
        if (isNaN(result) || !isFinite(result)) {
           return { ...output, result: '...', error: 'Waiting for input...' };
        }
        return { ...output, result: result.toFixed(2), error: null };
      } catch (e) {
        // A more user-friendly error for undefined variables
        if (e.message.includes('Undefined symbol')) {
            return { ...output, result: 'Error', error: 'A variable in the formula is undefined.' };
        }
        return { ...output, result: 'Error', error: 'Invalid formula' };
      }
    });
  };
  
  const results = calculateResults();

  if (outputs.length === 0) {
     return (
      <div className="p-6 bg-gray-800/60 rounded-lg flex items-center justify-center h-full">
        <p className="text-gray-400">Define output formulas to see the dashboard.</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-800/60 rounded-lg">
      <h2 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2"><TrendingUp size={20}/> Live Dashboard</h2>
      <div className="space-y-3">
        {results.map(res => (
          <div key={res.id} className="flex justify-between items-center bg-gray-900/70 p-4 rounded-lg">
            <div>
              <p className="font-medium text-gray-300">{res.label || 'New Output'}</p>
              {res.error && (
                <div className="flex items-center gap-1 text-xs text-yellow-400 mt-1">
                  <AlertTriangle size={14} />
                  <span>{res.error}</span>
                </div>
              )}
            </div>
            <p className={`text-2xl font-bold ${res.error ? 'text-yellow-400' : 'text-purple-300'}`}>
              {res.result}
              {res.unit && !res.error && <span className="text-lg font-medium text-gray-400 ml-2">{res.unit}</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDashboard;