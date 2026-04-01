const RAM_MULTIPLIERS = {
  '2GB': 0.70, '3GB': 0.80, '4GB': 0.90, '6GB': 1.00,
  '8GB': 1.10, '12GB': 1.20, '16GB': 1.35, '18GB': 1.40,
  '32GB': 1.50, '36GB': 1.55, '48GB': 1.65, '64GB': 1.70,
}

const STORAGE_MULTIPLIERS = {
  '32GB': 0.75, '64GB': 0.85, '128GB': 1.00, '256GB': 1.15,
  '512GB': 1.30, '1TB': 1.50,
  '256GB SSD': 1.00, '512GB SSD': 1.20, '1TB SSD': 1.45,
}

const BATTERY_MULTIPLIERS = { Good: 1.00, Average: 0.88, Poor: 0.72 }
const PHYSICAL_MULTIPLIERS = { Good: 1.00, 'Slight Damage': 0.80, 'Heavy Damage': 0.55 }

export function calcPrice(base, details) {
  let price = base
  price *= RAM_MULTIPLIERS[details.ram] || 1
  price *= STORAGE_MULTIPLIERS[details.storage] || 1
  price *= BATTERY_MULTIPLIERS[details.batteryCondition] || 1
  price *= PHYSICAL_MULTIPLIERS[details.physicalCondition] || 1
  if (details.isWorking === 'No') price *= 0.35
  return Math.round(price / 100) * 100
}

export function getConditionLabel(details) {
  if (details.physicalCondition === 'Heavy Damage' || details.isWorking === 'No') {
    return { l: 'Poor', c: '#dc2626', bg: '#fef2f2', bd: '#fecaca' }
  }
  if (details.physicalCondition === 'Slight Damage' || details.batteryCondition === 'Poor') {
    return { l: 'Fair', c: '#d97706', bg: '#fffbeb', bd: '#fde68a' }
  }
  if (details.batteryCondition === 'Average') {
    return { l: 'Good', c: '#2563eb', bg: '#eff6ff', bd: '#bfdbfe' }
  }
  return { l: 'Excellent', c: '#059569', bg: '#ecfdf5', bd: '#a7f3d0' }
}
