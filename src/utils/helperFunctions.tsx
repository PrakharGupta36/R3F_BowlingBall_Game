function submitValueDirection(
  value: number,
  setDirection: (value: number) => void
) {
  if (value >= -28 && value < -24) {
    setDirection(-4);
  } else if (value >= -24 && value < -20) {
    setDirection(-3.5);
  } else if (value >= -20 && value < -16) {
    setDirection(-3);
  } else if (value >= -16 && value < -12) {
    setDirection(-2.5);
  } else if (value >= -12 && value < -8) {
    setDirection(-2);
  } else if (value >= -8 && value < -4) {
    setDirection(-1.5);
  } else if (value >= -4 && value < 0) {
    setDirection(1);
  } else if (value === 0) {
    setDirection(0);
  } else if (value > 0 && value <= 4) {
    setDirection(1);
  } else if (value > 4 && value <= 8) {
    setDirection(1.5);
  } else if (value > 8 && value <= 12) {
    setDirection(2);
  } else if (value > 12 && value <= 16) {
    setDirection(2.5);
  } else if (value > 16 && value <= 20) {
    setDirection(3);
  } else if (value > 20 && value <= 24) {
    setDirection(3.5);
  } else if (value > 24 && value <= 28) {
    setDirection(4);
  }
}

function submitValueStrength(
  value: number,
  setStrength: (value: number) => void
) {
  if (value >= 0 && value <= 10) {
    setStrength(-25);
  } else if (value > 10 && value <= 20) {
    setStrength(-30);
  } else if (value > 20 && value <= 30) {
    setStrength(-35);
  } else if (value > 30 && value <= 40) {
    setStrength(-40);
  } else if (value > 40 && value <= 50) {
    setStrength(-45);
  } else if (value > 50 && value <= 60) {
    setStrength(-50);
  } else if (value > 60 && value <= 70) {
    setStrength(-55);
  } else if (value > 70 && value <= 80) {
    setStrength(-60);
  } else if (value > 80 && value <= 90) {
    setStrength(-65);
  } else {
    setStrength(-55);
  }
}

export { submitValueDirection, submitValueStrength };
