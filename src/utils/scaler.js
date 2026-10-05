// Ingredient scaler and fraction converter for recipes

// Parse fractional or decimal string/number into decimal float
export function parseQuantity(qty) {
  if (qty === null || qty === undefined) return 0;
  if (typeof qty === 'number') return qty;

  const str = String(qty).trim();
  if (!str) return 0;

  // Mixed fractions like "1 1/2" or "2 3/4"
  if (str.includes(' ') && str.includes('/')) {
    const parts = str.split(' ');
    const whole = parseFloat(parts[0]) || 0;
    const frac = parseFraction(parts[1]);
    return whole + frac;
  }

  // Simple fraction like "1/2" or "3/4"
  if (str.includes('/')) {
    return parseFraction(str);
  }

  return parseFloat(str) || 0;
}

function parseFraction(fracStr) {
  const [num, den] = fracStr.split('/').map(s => parseFloat(s.trim()));
  if (!den || isNaN(num) || isNaN(den)) return 0;
  return num / den;
}

// Format decimal into culinary friendly fraction or decimal
export function formatQuantity(val) {
  if (val <= 0 || isNaN(val)) return '';

  // Round to nearest hundredth
  const rounded = Math.round(val * 100) / 100;

  // Check if integer
  if (Number.isInteger(rounded)) {
    return String(rounded);
  }

  const whole = Math.floor(rounded);
  const frac = rounded - whole;

  // Common culinary fractions
  const tolerance = 0.08;
  const fractions = [
    { value: 0.125, label: '1/8' },
    { value: 0.25, label: '1/4' },
    { value: 0.333, label: '1/3' },
    { value: 0.5, label: '1/2' },
    { value: 0.666, label: '2/3' },
    { value: 0.75, label: '3/4' },
  ];

  for (const f of fractions) {
    if (Math.abs(frac - f.value) < tolerance) {
      return whole > 0 ? `${whole} ${f.label}` : f.label;
    }
  }

  // If close to whole number after fraction comparison
  if (Math.abs(frac - 1) < tolerance) {
    return String(whole + 1);
  }

  // If decimal e.g. 1.2 or 2.5
  return rounded % 1 === 0 ? String(rounded) : rounded.toFixed(1).replace(/\.0$/, '');
}

// Scale an ingredient string or item
export function scaleIngredient(amount, originalServings, targetServings) {
  const currentVal = parseQuantity(amount);
  if (!currentVal || !originalServings || !targetServings) return amount;
  const scaled = (currentVal / originalServings) * targetServings;
  return formatQuantity(scaled);
}
