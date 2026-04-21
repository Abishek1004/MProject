const fs = require('fs');
const file = 'src/pages/HomePage.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import heroVideo')) {
  content = content.replace(
    /import \{ CATEGORIES \} from '\.\.\/data'/,
    "import { CATEGORIES } from '../data'\nimport heroVideo from '../assets/img/Home/ewaste_video - Copy.mp4'"
  );
}

const heroRegex = /<section[\s\S]*?filter: 'blur\(100px\)' }}\s+\/>\s*<div className="max-w-\[1400px\] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">/;

const replacementBlock = `<section
        className="relative overflow-hidden px-5 pt-[130px] pb-32 flex items-center min-h-[90vh]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/65 z-0 pointer-events-none backdrop-blur-[2px]"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">`;

if (heroRegex.test(content)) {
  content = content.replace(heroRegex, replacementBlock);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Video updated applied!');
} else {
  console.log('Regex did not match. File not changed.');
}
