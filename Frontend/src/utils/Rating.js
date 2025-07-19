function Rating(
  cpuCores,
  cpuGHz,
  gpuScoreRaw,
  ramGB,
  screenResolution,
  screenHz,
  battery,
  weight
) {
  // CPU Score
  const totalGHz = cpuCores + cpuGHz;
  let cpuScore = 0;
  if (totalGHz <= 6) cpuScore = 4;
  else if (totalGHz <= 8) cpuScore = 6;
  else if (totalGHz <= 10) cpuScore = 8;
  else if (totalGHz <= 12) cpuScore = 9;
  else cpuScore = 10;

  // GPU Score
  let gpuScore = 0;
  if (gpuScoreRaw <= 6000) gpuScore = 4;
  else if (gpuScoreRaw <= 12000) gpuScore = 7;
  else if (gpuScoreRaw <= 20000) gpuScore = 8.5;
  else if (gpuScoreRaw <= 28000) gpuScore = 9.5;
  else gpuScore = 10;

  // RAM Score
  let ramScore = 0;
  if (ramGB <= 4) ramScore = 2;
  else if (ramGB <= 8) ramScore = 5;
  else if (ramGB <= 12) ramScore = 7;
  else if (ramGB <= 16) ramScore = 8.5;
  else if (ramGB <= 24) ramScore = 9.2;
  else if (ramGB <= 32) ramScore = 9.6;
  else ramScore = 10;

  // Screen Score
  let screenScore = 5;
  const resolution = screenResolution || "FHD";
  if (resolution.includes("4K")) screenScore = 9.5;
  else if (resolution.includes("QHD") || resolution.includes("2K")) screenScore = 8.5;
  else if (resolution.includes("FHD")) screenScore = 7;
  else screenScore = 5;

  if (screenHz >= 120) screenScore += 0.5;
  if (screenHz >= 144) screenScore += 1;
  if (screenScore > 10) screenScore = 10;

  // Battery Score
  let batteryScore;
  if (battery >= 8.0) batteryScore = 10;
  else if (battery >= 7.0) batteryScore = 9;
  else if (battery >= 6.0) batteryScore = 8;
  else if (battery >= 5.0) batteryScore = 7;
  else if (battery >= 4.0) batteryScore = 6;
  else if (battery >= 2.5) batteryScore = 4;
  else batteryScore = 2;

  // Weight Score
  let weightScore;
  if (weight <= 1.0) weightScore = 10;
  else if (weight <= 1.3) weightScore = 9;
  else if (weight <= 1.6) weightScore = 8;
  else if (weight <= 1.9) weightScore = 7;
  else if (weight <= 2.2) weightScore = 6;
  else if (weight <= 2.5) weightScore = 5;
  else if (weight <= 2.8) weightScore = 4;
  else if (weight <= 3.1) weightScore = 3;
  else if (weight <= 3.4) weightScore = 2;
  else weightScore = 1;

  const components = {
    CPU: cpuScore,
    GPU: gpuScore,
    RAM: ramScore,
    Screen: screenScore,
    Battery: batteryScore,
    Weight: weightScore,
  };

  const categoryWeights = {
    gaming:       { CPU: 0.2, GPU: 0.45, RAM: 0.2, Screen: 0.1, Battery: 0.03, Weight: 0.02 },
    programming:  { CPU: 0.4, GPU: 0.1, RAM: 0.25, Screen: 0.15, Battery: 0.05, Weight: 0.05 },
    student:      { CPU: 0.25, GPU: 0.05, RAM: 0.3, Screen: 0.15, Battery: 0.15, Weight: 0.1 },
    design:       { CPU: 0.2, GPU: 0.4, RAM: 0.2, Screen: 0.15, Battery: 0.03, Weight: 0.02 },
    editing:      { CPU: 0.3, GPU: 0.3, RAM: 0.2, Screen: 0.15, Battery: 0.03, Weight: 0.02 },
    media:        { CPU: 0.15, GPU: 0.1, RAM: 0.2, Screen: 0.4, Battery: 0.1, Weight: 0.05 },
    travel:       { CPU: 0.15, GPU: 0.05, RAM: 0.2, Screen: 0.2, Battery: 0.2, Weight: 0.2 },
    "everyday use":     { CPU: 0.25, GPU: 0.15, RAM: 0.25, Screen: 0.2, Battery: 0.1, Weight: 0.05 }
  };

  const categories = {};
  for (const key in categoryWeights) {
    const weights = categoryWeights[key];
    let total = 0;
    for (const component in weights) {
      total += components[component] * weights[component];
    }
    categories[key] = parseFloat(total.toFixed(1));                                                                                                                                                                                                                                                                                                                                                                  
  }

  return {
    categories,
    details: Object.fromEntries(
      Object.entries(components).map(([k, v]) => [k, parseFloat(v.toFixed(1))])
    )
  };
}

export default Rating;
