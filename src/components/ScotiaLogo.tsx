import { Image } from 'react-native';

// Official Scotiabank wordmark, rasterized from the public brand SVG.
const LOGO = require('../../assets/reference/scotia-logo.png');
const ASPECT = 1019 / 145;

export function ScotiaWordmark({ height = 22 }: { height?: number }) {
  return (
    <Image
      source={LOGO}
      style={{ height, width: height * ASPECT }}
      resizeMode="contain"
    />
  );
}
