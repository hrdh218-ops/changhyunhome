const fs = require('fs');

const file = 'src/store/SiteContext.tsx';
let data = fs.readFileSync(file, 'utf8');

data = data.replace(
  /name:\s*'ROLAND ER-642 WATERBASE',[\s\S]*?specs:\s*\[[\s\S]*?\]\n    \},/g,
  (match) => {
    if (match.includes('notes:')) return match;
    return match.replace(/\]\n    \},$/, "],\n      notes: [\n        '출력 환경에 따라 인쇄 속도는 변경될 수 있습니다.'\n      ]\n    },");
  }
);

data = data.replace(
  /name:\s*'ROLAND ER-642 SOLVENT',[\s\S]*?specs:\s*\[[\s\S]*?\]\n    \},/g,
  (match) => {
    if (match.includes('notes:')) return match;
    return match.replace(/\]\n    \},$/, "],\n      notes: [\n        '무상 A/S 기간은 1년입니다. (헤드포함)',\n        '출력 환경에 따라 인쇄 속도는 변경될 수 있습니다.'\n      ]\n    },");
  }
);

data = data.replace(
  /name:\s*'ROLAND UG-642 UV',[\s\S]*?specs:\s*\[[\s\S]*?\]\n    \},/g,
  (match) => {
    if (match.includes('notes:')) return match;
    return match.replace(/\]\n    \},$/, "],\n      notes: [\n        '무상 A/S 기간은 1년입니다. (헤드포함)',\n        '출력 환경에 따라 인쇄 속도는 변경될 수 있습니다.'\n      ]\n    },");
  }
);

data = data.replace(
  /name:\s*'ROLAND LG-640 UV',[\s\S]*?specs:\s*\[[\s\S]*?\]\n    \},/g,
  (match) => {
    if (match.includes('notes:')) return match;
    return match.replace(/\]\n    \},$/, "],\n      notes: [\n        '무상 A/S 기간은 1년입니다. (헤드포함)',\n        '출력 환경에 따라 인쇄 속도는 변경될 수 있습니다.'\n      ]\n    },");
  }
);

fs.writeFileSync(file, data, 'utf8');
