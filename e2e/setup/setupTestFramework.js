import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

let toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 0.0025,
  failureThresholdType: 'percent',
});

const { E2E_DEBUG } = process.env;

if (E2E_DEBUG === 'true') {
  toMatchImageSnapshot = () => ({ pass: true });
}

expect.extend({ toMatchImageSnapshot });